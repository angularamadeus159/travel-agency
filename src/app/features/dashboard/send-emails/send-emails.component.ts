import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-send-emails',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './send-emails.component.html',
  styleUrl: './send-emails.component.scss'
})
export class SendEmailsComponent {
  selectedAgency = signal<string>('');
  emailSubject = signal<string>('');
  emailBody = signal<string>('');
  isLoading = signal<boolean>(false);

  agencies = signal([
    { name: 'Viajes Paraíso', email: 'contacto@viajesparaiso.com' },
    { name: 'Tours Aventura', email: 'info@toursaventura.com' },
    { name: 'Destinos Soñados', email: 'reservas@destinossonados.com' }
  ]);

  sendEmail(): void {
    if (!this.selectedAgency() || !this.emailSubject() || !this.emailBody()) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.isLoading.set(true);

    // Simulación de envío
    setTimeout(() => {
      alert('Email enviado correctamente');
      this.resetForm();
      this.isLoading.set(false);
    }, 1500);
  }

  private resetForm(): void {
    this.selectedAgency.set('');
    this.emailSubject.set('');
    this.emailBody.set('');
  }
}
