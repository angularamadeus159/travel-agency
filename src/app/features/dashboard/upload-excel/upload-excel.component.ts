import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../../../core/services';

@Component({
  selector: 'app-upload-excel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-excel.component.html',
  styleUrl: './upload-excel.component.scss'
})
export class UploadExcelComponent {
  private readonly reservationService = inject(ReservationService);

  protected readonly selectedFile = signal<File | null>(null);
  protected readonly isUploading = signal(false);
  protected readonly uploadSuccess = signal(false);
  protected readonly uploadMessage = signal<string | null>(null);
  protected readonly errorMessage = signal<string | null>(null);

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

    this.isUploading.set(true);
    this.errorMessage.set(null);
    this.uploadSuccess.set(false);

    this.reservationService.uploadExcelFile(file).subscribe({
      next: (response) => {
        this.isUploading.set(false);
        this.uploadSuccess.set(true);
        this.uploadMessage.set(`${response.count} reservas cargadas exitosamente`);
        this.selectedFile.set(null);
        // Reset file input
        const input = document.getElementById('file-input') as HTMLInputElement;
        if (input) input.value = '';
      },
      error: (error) => {
        this.isUploading.set(false);
        this.errorMessage.set(error.error?.message || 'Error al cargar el archivo');
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
}
