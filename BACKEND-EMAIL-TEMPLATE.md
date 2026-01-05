# Documentación del Backend - Plantilla de Correo

## Endpoint de Envío de Correos

### POST `/api/reservations/send-email`

**Descripción**: Envía un correo electrónico a una agencia con el estado de cuenta de sus reservas.

**Request Body**:
```json
{
  "to": "agencia@ejemplo.com",
  "agencyName": "NUMERAL TU AGENCIA MAYORISTA DE VIAJES SAS",
  "reservations": [
    {
      "reservationNumber": "2254964",
      "clientName": "Cliente Ejemplo",
      "travelDate": "2025-11-28T00:00:00.000Z",
      "octoberQuota": 7033000,
      "currentMonthBalance": 0,
      "paymentDate": "2025-10-28T00:00:00.000Z",
      "balanceToDate": 0,
      "observations": "PAGO TOTAL 28 DE OCTUBRE"
    }
  ]
}
```

## Plantilla HTML del Correo

El correo debe enviarse desde: **recaudoagencias@onvacation.com**

### Estructura del Correo

**Asunto**: `Estado de Cuenta - [Nombre de la Agencia]`

**Cuerpo HTML**:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Estado de Cuenta - On Vacation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background: #f7fafc;
      padding: 30px;
    }
    .greeting {
      margin-bottom: 20px;
    }
    .agency-name {
      font-size: 18px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 15px;
    }
    .message {
      margin-bottom: 20px;
      text-align: justify;
    }
    .warning {
      background: #fff5f5;
      border-left: 4px solid #e53e3e;
      padding: 15px;
      margin: 20px 0;
      color: #c53030;
      font-weight: bold;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    th {
      background: #667eea;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #e2e8f0;
    }
    tr:nth-child(even) {
      background-color: #f7fafc;
    }
    tr:hover {
      background-color: #edf2f7;
    }
    .footer {
      background: #2d3748;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 0 0 8px 8px;
      font-size: 14px;
    }
    .reminder {
      background: #f0fff4;
      border-left: 4px solid #38a169;
      padding: 15px;
      margin: 20px 0;
      color: #22543d;
    }
    .reminder ul {
      margin: 10px 0;
      padding-left: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>On Vacation</h1>
    <p>Estado de Cuenta de Reservas</p>
  </div>

  <div class="content">
    <p class="greeting">Buen día,</p>

    <p class="agency-name">Agencia: {{agencyName}}</p>

    <p class="message">
      Eres un aliado muy importante para nosotros. Juntos hemos asumido el compromiso de brindarles a nuestros viajeros experiencias memorables en sus vacaciones.
    </p>

    <p class="message">
      Ten presente tu compromiso. Te enviamos la relación de las reservas que actualmente tienes con On Vacation, en la cual podrás encontrar:
    </p>

    <ul>
      <li><strong>Número de reserva</strong></li>
      <li><strong>Fecha de pago</strong></li>
      <li><strong>Valor a abonar</strong></li>
    </ul>

    <div class="warning">
      RECUERDE GENERAR LOS PAGOS DE ACUERDO A FECHA DE ESTADO DE CUENTA PARA EVITAR SUPLEMENTO POR INCUMPLIMIENTO, EL CUAL SERÍA $100.000 POR PERSONA
    </div>

    <table>
      <thead>
        <tr>
          <th>N° Reserva</th>
          <th>Nombre del Cliente</th>
          <th>Fecha de Viaje</th>
          <th>Cuota de Octubre</th>
          <th>Saldo Mes Actual</th>
          <th>Fecha de Pago</th>
          <th>Saldo a la Fecha</th>
          <th>Observaciones</th>
        </tr>
      </thead>
      <tbody>
        {{#each reservations}}
        <tr>
          <td>{{this.reservationNumber}}</td>
          <td>{{this.clientName}}</td>
          <td>{{formatDate this.travelDate}}</td>
          <td>{{formatCurrency this.octoberQuota}}</td>
          <td>{{formatCurrency this.currentMonthBalance}}</td>
          <td>{{formatDate this.paymentDate}}</td>
          <td>{{formatCurrency this.balanceToDate}}</td>
          <td>{{this.observations}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>

    <div class="reminder">
      <strong>Recuerda la importancia de realizar tus abonos mes a mes a las vacaciones de acuerdo a tu estado de cuenta relacionado para mantener activa tu reserva ya que de no generarse estos abonos tu reserva quedará inactiva, sujeta a disponibilidad y tarifas vigentes.</strong>

      <p style="margin-top: 15px;">Recuerda que para el pago de tus reservas hemos habilitado diferentes alternativas y medios para que puedas realizar tus abonos:</p>

      <ol>
        <li><strong>Pagos Online:</strong> <a href="http://pagosonline.onvacation.com/" style="color: #667eea;">http://pagosonline.onvacation.com/</a> a través de nuestra página, ingresa con el número de reserva o cédula del titular y podrás realizar el pago en línea.</li>
        
        <li><strong>Consignación bancaria DAVIVIENDA:</strong> Cuenta de ahorros: 485100000994; Convenio 1150092 A nombre: Finantodo Referencia de Pago: Número de cédula del titular</li>
        
        <li><strong>Consignación bancaria BANCOLOMBIA:</strong> Cuenta corriente: 30471143381 Convenio: 40288 A nombre: Finantodo Referencia de Pago: Número de cédula del titular.</li>
      </ol>
    </div>
  </div>

  <div class="footer">
    <p>On Vacation - Experiencias Memorables</p>
    <p>Email: recaudoagencias@onvacation.com</p>
    <p>&copy; 2025 On Vacation. Todos los derechos reservados.</p>
  </div>
</body>
</html>
```

## Implementación en NestJS

### 1. Instalar Dependencias

```bash
npm install @nestjs-modules/mailer nodemailer handlebars
npm install -D @types/nodemailer
```

### 2. Configurar el Módulo de Email

**src/email/email.module.ts**:
```typescript
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailService } from './email.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      },
      defaults: {
        from: '"On Vacation" <recaudoagencias@onvacation.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
```

### 3. Servicio de Email

**src/email/email.service.ts**:
```typescript
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendReservationEmail(
    to: string,
    agencyName: string,
    reservations: any[],
  ) {
    await this.mailerService.sendMail({
      to,
      subject: `Estado de Cuenta - ${agencyName}`,
      template: 'reservation-email',
      context: {
        agencyName,
        reservations: reservations.map((r) => ({
          ...r,
          travelDate: this.formatDate(r.travelDate),
          paymentDate: this.formatDate(r.paymentDate),
          octoberQuota: this.formatCurrency(r.octoberQuota),
          currentMonthBalance: this.formatCurrency(r.currentMonthBalance),
          balanceToDate: this.formatCurrency(r.balanceToDate),
        })),
      },
    });
  }

  private formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }
}
```

### 4. Variables de Entorno

Agregar al `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=recaudoagencias@onvacation.com
SMTP_PASS=tu_password_de_aplicacion
```

## Notas Importantes

1. **Gmail/Google Workspace**: Si usas Gmail, necesitas crear una "contraseña de aplicación" en la configuración de seguridad de Google.

2. **Formato de Moneda**: Usar formato colombiano (COP) sin decimales.

3. **Formato de Fecha**: Usar formato dd/mm/yyyy para Colombia.

4. **Testing**: Probar primero con correos de prueba antes de enviar a clientes reales.

5. **Rate Limiting**: Implementar límite de envíos para evitar spam.

6. **Logs**: Registrar todos los envíos de correos para auditoría.

7. **Errores**: Manejar errores de SMTP y notificar al admin.

## Helpers de Handlebars

Para usar en las plantillas:

```javascript
Handlebars.registerHelper('formatDate', function(date) {
  return new Date(date).toLocaleDateString('es-CO');
});

Handlebars.registerHelper('formatCurrency', function(value) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(value);
});
```
