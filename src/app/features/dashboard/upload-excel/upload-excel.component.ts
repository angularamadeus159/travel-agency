import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../core/services';
import { Reservation } from '../../../core/models';
import { ReservationsComponent } from '../reservations/reservations.component';

@Component({
  selector: 'app-upload-excel',
  standalone: true,
  imports: [CommonModule, ReservationsComponent],
  templateUrl: './upload-excel.component.html',
  styleUrl: './upload-excel.component.scss'
})
export class UploadExcelComponent implements OnInit {
  private readonly reservationService = inject(ReservationService);

  protected readonly selectedFile = signal<File | null>(null);
  protected readonly isUploading = signal(false); // REVISAR SI ES NECESARIO JUNTO CON uploadSuccess
  protected readonly uploadSuccess = signal(false);
  protected readonly uploadMessage = signal<string | null>(null);
  protected readonly errorMessage = signal<string | null>(null);
  
  // Signals para la tabla de reservas
  protected readonly reservations = signal<Reservation[]>([]);
  protected readonly isLoadingReservations = signal(false);
  
  // Signal para controlar qué vista mostrar
  protected readonly showTableView = signal(false);
  
  // Signal para el botón de cargar Excel (siempre true en este contexto)
  protected readonly showExcelButton = signal(true);

  ngOnInit(): void {
    // No cargamos reservas automáticamente, solo después de subir Excel
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.isExcelFile(file)) {
        this.selectedFile.set(file);
        this.uploadSuccess.set(false);
        this.errorMessage.set(null);
      } else {
        this.errorMessage.set('Por favor selecciona un archivo Excel válido (.xlsx o .xls)');
        this.selectedFile.set(null);
      }
    }
  }

  uploadFile(): void {
    const file = this.selectedFile();
    if (!file) {
      this.errorMessage.set('Por favor selecciona un archivo');
      return;
    }

    
    // ✅ LIMPIAR ESTADO ANTERIOR ANTES DE CARGAR
    this.reservations.set([]);
    this.showTableView.set(false);
    this.uploadSuccess.set(false);
    this.uploadMessage.set(null);
    this.errorMessage.set(null);
    
    this.isUploading.set(true);

    this.reservationService.uploadExcelFile(file).subscribe({ // Se debe mejorar este componente solo debe tener una unica responsabilidad CARGAR EXCEL 
      next: (response) => {        

        this.isUploading.set(false);
        this.uploadSuccess.set(true);
        // response.message contiene: "Excel procesado correctamente. Se encontraron X reservas."
        // response.data contiene el array de reservas
        this.uploadMessage.set(response.message);
        
        // ✅ REEMPLAZAR COMPLETAMENTE LOS DATOS
        this.reservations.set(response.data || []);
          
        // ✅ LIMPIAR ARCHIVO SELECCIONADO
        this.selectedFile.set(null);
        
        // Cambiar a vista de tabla
        this.showTableView.set(true);
        
        // Reset file input
        const input = document.getElementById('file-input') as HTMLInputElement;
        if (input) input.value = '';
      },
      error: (error) => {
        console.error('❌ Error al cargar Excel:', error);
        this.isUploading.set(false);
        this.errorMessage.set(error.error?.message || 'Error al cargar el archivo');
        
        // ✅ ASEGURAR LIMPIEZA EN CASO DE ERROR
        this.reservations.set([]);
        this.showTableView.set(false);
      }
    });
  }

  removeFile(): void {
    this.selectedFile.set(null);
    this.uploadSuccess.set(false);
    this.errorMessage.set(null);
    const input = document.getElementById('file-input') as HTMLInputElement;
    if (input) input.value = '';
  }

  private isExcelFile(file: File): boolean {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    return validTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
  
  showUploadArea(): void {
    // ✅ LIMPIAR TODO EL ESTADO AL VOLVER A CARGAR
    this.showTableView.set(false);
    this.uploadSuccess.set(false);
    this.uploadMessage.set(null);
    this.errorMessage.set(null);
    this.reservations.set([]);
    this.selectedFile.set(null);
    
    // Reset file input
    const input = document.getElementById('file-input') as HTMLInputElement;
    if (input) input.value = '';

  }
}
