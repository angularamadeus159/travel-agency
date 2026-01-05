import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../../core/services';
import { Reservation } from '../../../core/models';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit {
  private readonly reservationService = inject(ReservationService);

  protected readonly reservations = signal<Reservation[]>([]);
  protected readonly filteredReservations = signal<Reservation[]>([]);
  protected readonly agencies = signal<{ name: string; email: string }[]>([]);
  protected readonly selectedAgency = signal<string>('');
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.loadReservations();
    this.loadAgencies();
  }

  private loadReservations(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.reservationService.getReservations().subscribe({
      next: (data) => {
        this.reservations.set(data);
        this.filteredReservations.set(data);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Error al cargar las reservas');
        this.isLoading.set(false);
        console.error(error);
      }
    });
  }

  private loadAgencies(): void {
    this.reservationService.getAgencies().subscribe({
      next: (data) => {
        this.agencies.set(data);
      },
      error: (error) => {
        console.error('Error al cargar agencias', error);
      }
    });
  }

  onAgencyChange(): void {
    const selected = this.selectedAgency();
    if (!selected) {
      this.filteredReservations.set(this.reservations());
      return;
    }

    const filtered = this.reservations().filter(
      (reservation) => reservation.agencyName === selected
    );
    this.filteredReservations.set(filtered);
  }

  sendEmail(): void {
    const selected = this.selectedAgency();
    if (!selected) {
      alert('Por favor selecciona una agencia');
      return;
    }

    const agency = this.agencies().find((a) => a.name === selected);
    if (!agency) {
      alert('Agencia no encontrada');
      return;
    }

    const reservationsToSend = this.filteredReservations();
    if (reservationsToSend.length === 0) {
      alert('No hay reservas para enviar');
      return;
    }

    this.isLoading.set(true);

    this.reservationService
      .sendEmailToAgency({
        to: agency.email,
        agencyName: agency.name,
        reservations: reservationsToSend
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          alert('Correo enviado exitosamente');
        },
        error: (error) => {
          this.isLoading.set(false);
          alert('Error al enviar el correo');
          console.error(error);
        }
      });
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-CO');
  }
}
