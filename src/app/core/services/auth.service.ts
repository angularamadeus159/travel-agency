import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { AuthResponse, LoginCredentials, User } from '../models';
import { StorageService } from './storage.service';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly supabaseService = inject(SupabaseService);
  private readonly storageService = inject(StorageService);
  private readonly router = inject(Router);

  private readonly currentUserSignal = signal<User | null>(null);
  readonly currentUser = this.currentUserSignal.asReadonly();

  constructor() {
    this.loadUserFromStorage();
    this.initSupabaseAuthListener();
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return from(this.loginWithSupabase(credentials));
  }

  private async loginWithSupabase(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data, error } = await this.supabaseService.signIn(
      credentials.email,
      credentials.password
    );

    if (error) {
      throw new Error(error.message);
    }

    if (!data.session || !data.user) {
      throw new Error('Error al iniciar sesión');
    }

    const authResponse: AuthResponse = {
      token: data.session.access_token,
      refreshToken: data.session.refresh_token || '',
      user: {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.['name'] || data.user.email?.split('@')[0] || 'Usuario',
        role: data.user.user_metadata?.['role'] || 'user'
      }
    };

    this.setSession(authResponse);
    this.currentUserSignal.set(authResponse.user);

    return authResponse;
  }

  logout(): void {
    this.supabaseService.signOut();
    this.storageService.removeItem('token');
    this.storageService.removeItem('refreshToken');
    this.storageService.removeItem('user');
    this.currentUserSignal.set(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    const token = this.storageService.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return this.storageService.getItem('token');
  }

  private setSession(authResult: AuthResponse): void {
    this.storageService.setItem('token', authResult.token);
    this.storageService.setItem('refreshToken', authResult.refreshToken);
    this.storageService.setItem('user', JSON.stringify(authResult.user));
  }

  private loadUserFromStorage(): void {
    const userStr = this.storageService.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        this.currentUserSignal.set(user);
      } catch (error) {
        console.error('Error parsing user from storage', error);
      }
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  private initSupabaseAuthListener(): void {

    this.supabaseService.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        this.currentUserSignal.set(null);
      } else if (event === 'SIGNED_IN' && session) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.['name'] || session.user.email?.split('@')[0] || 'Usuario',
          role: session.user.user_metadata?.['role'] || 'user'
        };
        this.currentUserSignal.set(user);
      }
    });
  }
}
