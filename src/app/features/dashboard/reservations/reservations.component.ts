import { Component, inject, OnInit, signal, Input, computed, Signal, WritableSignal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../core/services';
import { Reservation } from '../../../core/models';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent implements OnInit {
  private readonly reservationService = inject(ReservationService);
  
  // Exponer Math para usar en el template
  protected readonly Math = Math;

  // Inputs como signals para comunicación reactiva con el componente padre
  @Input() externalReservations?: Signal<Reservation[]>;
  @Input() showLoadExcelButton?: Signal<boolean>;
  @Input() onLoadExcelClick?: () => void;

  protected readonly reservations = signal<Reservation[]>([]);
  protected readonly filteredReservations = signal<Reservation[]>([]);
  protected readonly selectedClient = signal<string>('');
  protected readonly isLoading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);
  protected readonly currentMonth = signal(
  new Date().toLocaleString('es-ES', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase()));
  
  
  // Computed signal para obtener lista única de clientes
  protected readonly clients = computed(() => {
    const allClients = this.reservations().map(r => r.clientName);
    return [...new Set(allClients)].sort();
  });
  
  // Paginación
  protected readonly currentPage = signal(1);
  protected readonly pageSize = signal(10);
  
  // Computed signal para las reservas de la página actual
  protected readonly paginatedReservations = computed(() => {
    const filtered = this.filteredReservations();
    const page = this.currentPage();
    const size = this.pageSize();
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return filtered.slice(startIndex, endIndex);
  });
  
  // Computed signal para el número total de páginas
  protected readonly totalPages = computed(() => {
    return Math.ceil(this.filteredReservations().length / this.pageSize());
  });
  
  constructor() {
    // Effect para sincronizar reservas externas cuando cambian
    effect(() => {
      const external = this.externalReservations?.();
      if (external !== undefined) {
        // ✅ SIEMPRE reemplazar, incluso si está vacío (para limpiar)
        this.reservations.set(external);
        this.filteredReservations.set(external);
        this.currentPage.set(1); // Reset paginación
        this.selectedClient.set(''); // Reset filtros
      }
    });
  }

  ngOnInit(): void {
    // Solo cargar reservas si NO hay reservas externas
    // (cuando se usa sin cargar Excel, carga desde el endpoint)
    if (!this.externalReservations) {
      this.loadReservations();
    }
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
        // No mostrar error si hay reservas externas
        if (!this.externalReservations) {
          this.errorMessage.set('Error al cargar las reservas');
        }
        this.isLoading.set(false);
        console.error(error);
      }
    });
  }

  onClientChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedClient.set(select.value);
    this.applyFilters();
  }
  
  private applyFilters(): void {
    let filtered = this.reservations();
    
    // Filtrar por cliente si está seleccionado
    const selectedClient = this.selectedClient();
    if (selectedClient) {
      filtered = filtered.filter(r => r.clientName === selectedClient);
    }
    
    this.filteredReservations.set(filtered);
    // Resetear a la primera página cuando se filtra
    this.currentPage.set(1);
  }

  formatCurrency(value: string | null): string {
    if (!value) return '-';
    return '$ ' + value;
  }

  /**
   * Convierte string MM/dd/yyyy a Date para usar con pipe date de Angular
   * El backend envía fechas en formato americano: MM/dd/yyyy
   */
  formatDate(dateStr: string | null): Date | null {
    if (!dateStr) return null;
    
    // Parsear string MM/dd/yyyy a Date (formato americano)
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const month = parseInt(parts[0], 10);  // Primer valor es el mes
      const day = parseInt(parts[1], 10);    // Segundo valor es el día
      const year = parseInt(parts[2], 10);   // Tercer valor es el año
      
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        // Crear Date (mes es 0-indexed en JavaScript)
        return new Date(year, month - 1, day);
      }
    }
    
    return null;
  }
  
  sendEmail(): void {
    const client = this.selectedClient();
    if (!client) {
      alert('Por favor selecciona un cliente');
      return;
    }
    
    const reservationsToSend = this.filteredReservations();
    if (reservationsToSend.length === 0) {
      alert('No hay reservas para enviar');
      return;
    }
    
    this.isLoading.set(true);
    
    this.reservationService.sendEmailToClient({
      clientName: client,
      reservations: reservationsToSend
    }).subscribe({
      next: () => {
        this.isLoading.set(false);
        alert('Correo enviado exitosamente a ' + client);
      },
      error: (error) => {
        this.isLoading.set(false);
        alert('Error al enviar el correo: ' + (error.error?.message || 'Error desconocido'));
        console.error(error);
      }
    });
  }
  
  // Métodos de paginación
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(page => page + 1);
    }
  }
  
  previousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(page => page - 1);
    }
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
  
  getPageNumbers(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    
    // Mostrar máximo 5 números de página
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);
    
    // Ajustar si estamos cerca del final
    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}
