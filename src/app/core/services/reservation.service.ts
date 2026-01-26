import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailPayload, Reservation, ReservationFilters, ResponseDTO } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private readonly apiService = inject(ApiService);

  getReservations(filters?: ReservationFilters): Observable<Reservation[]> {
    const params = this.buildFilterParams(filters);
    return this.apiService.get<Reservation[]>('/reservations', params);
  }

  getReservationById(id: string): Observable<Reservation> {
    return this.apiService.get<Reservation>(`/reservations/${id}`);
  }

  uploadExcelFile(file: File): Observable<ResponseDTO<Reservation[]>> {
    return this.apiService.upload<ResponseDTO<Reservation[]>>(
      '/reservations/upload',
      file
    );
  }

  sendEmailToAgency(payload: EmailPayload): Observable<{ message: string }> {
    return this.apiService.post<{ message: string }>('/reservations/send-email', payload);
  }
  
  sendEmailToClient(payload: { clientName: string; reservations: Reservation[] }): Observable<any> {
    return this.apiService.post('/reservations/send-email-client', payload);
  }

  getAgencies(): Observable<{ name: string; email: string }[]> {
    return this.apiService.get<{ name: string; email: string }[]>('/reservations/agencies');
  }

  private buildFilterParams(filters?: ReservationFilters): any {
    if (!filters) return undefined;

    const params: any = {};
    if (filters.agencyName) params['agencyName'] = filters.agencyName;
    if (filters.agencyEmail) params['agencyEmail'] = filters.agencyEmail;
    if (filters.dateFrom) params['dateFrom'] = filters.dateFrom.toISOString();
    if (filters.dateTo) params['dateTo'] = filters.dateTo.toISOString();
    if (filters.status) params['status'] = filters.status;

    return params;
  }
}
