# Configuración de Ejemplo para el Backend

## Variables de Entorno del Frontend

Cuando tengas el backend listo, actualiza estos archivos:

### `src/environments/environment.ts` (Producción)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend-production.com/api',
  supabaseUrl: 'https://tu-proyecto.supabase.co',
  supabaseKey: 'tu-supabase-anon-key-aqui'
};
```

### `src/environments/environment.development.ts` (Desarrollo)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  supabaseUrl: 'https://tu-proyecto.supabase.co',
  supabaseKey: 'tu-supabase-anon-key-aqui'
};
```

---

## Endpoints que el Frontend Espera

El frontend está configurado para hacer peticiones a los siguientes endpoints:

### Autenticación
```
POST /api/auth/login
Body: { email: string, password: string }
Response: { user: User, token: string, refreshToken: string }
```

### Reservas
```
GET /api/reservations
Query Params: ?agencyName=string&agencyEmail=string&dateFrom=ISO8601&dateTo=ISO8601&status=string
Response: Reservation[]

GET /api/reservations/:id
Response: Reservation

POST /api/reservations/upload
Body: FormData with 'file' field
Response: { message: string, count: number }

GET /api/reservations/agencies
Response: [{ name: string, email: string }]

POST /api/reservations/send-email
Body: { to: string, agencyName: string, reservations: Reservation[] }
Response: { message: string }
```

---

## Interfaces TypeScript para el Backend

Si usas NestJS, estas son las interfaces que deberías usar:

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'OPERATOR' | 'VIEWER';
  createdAt?: Date;
}
```

### Reservation
```typescript
interface Reservation {
  id: string;
  reservationNumber: string;
  agencyName: string;
  agencyEmail: string;
  clientName: string;
  travelDate: Date;
  octoberQuota: number;
  currentMonthBalance: number;
  paymentDate: Date;
  balanceToDate: number;
  observations: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### Login Credentials
```typescript
interface LoginCredentials {
  email: string;
  password: string;
}
```

### Auth Response
```typescript
interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}
```

---

## Estructura del Excel Esperada

El archivo Excel debe contener las siguientes columnas (en este orden):

| Columna | Tipo | Descripción |
|---------|------|-------------|
| RESERVA | string | Número de reserva |
| CLIENTE | string | Nombre del agencia mayorista |
| CLIENTE (nombre) | string | Nombre del cliente final |
| FECHA VIAJE | date | Fecha del viaje en formato DD/MM/YYYY |
| CUOTA OCTUBRE | number | Monto de la cuota de octubre |
| FECHA PAGO DEL MES | date | Fecha límite de pago |
| OBSERVACIÓN | string | Observaciones sobre la reserva |

### Ejemplo de Datos del Excel

```csv
RESERVA,CLIENTE,CLIENTE (nombre),FECHA VIAJE,CUOTA OCTUBRE,FECHA PAGO DEL MES,OBSERVACIÓN
2254964,NUMERAL TU AGENCIA MAYORISTA DE VIAJES SAS,Juan Pérez,28/11/2025,7033000,28/10/2025,PAGO TOTAL 28 DE OCTUBRE
2259927,NUMERAL TU AGENCIA MAYORISTA DE VIAJES SAS,María García,15/09/2026,1296227,15/10/2025,CUOTA VENCIDA PAGO PENDIENTE
```

---

## Configuración de CORS en el Backend

Para NestJS, configura CORS así:

```typescript
// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',  // Desarrollo
      'https://tu-frontend-production.com'  // Producción
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  
  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api');
  
  await app.listen(3000);
}
bootstrap();
```

---

## Ejemplo de Controller en NestJS

```typescript
// reservations.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Query, 
  Param,
  UploadedFile,
  UseInterceptors 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  async findAll(@Query() filters: any) {
    return this.reservationsService.findAll(filters);
  }

  @Get('agencies')
  async getAgencies() {
    return this.reservationsService.getAgencies();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    return this.reservationsService.processExcel(file);
  }

  @Post('send-email')
  async sendEmail(@Body() emailPayload: EmailPayload) {
    return this.reservationsService.sendEmail(emailPayload);
  }
}
```

---

## Testing del Frontend con Mock Data

Mientras el backend no esté listo, puedes crear un mock service:

```typescript
// src/app/core/services/reservation-mock.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Reservation } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ReservationMockService {
  private mockReservations: Reservation[] = [
    {
      id: '1',
      reservationNumber: '2254964',
      agencyName: 'NUMERAL TU AGENCIA MAYORISTA DE VIAJES SAS',
      agencyEmail: 'agencia@ejemplo.com',
      clientName: 'Juan Pérez',
      travelDate: new Date('2025-11-28'),
      octoberQuota: 7033000,
      currentMonthBalance: 0,
      paymentDate: new Date('2025-10-28'),
      balanceToDate: 0,
      observations: 'PAGO TOTAL 28 DE OCTUBRE'
    }
  ];

  getReservations(): Observable<Reservation[]> {
    return of(this.mockReservations).pipe(delay(500));
  }

  getAgencies(): Observable<{ name: string; email: string }[]> {
    return of([
      { 
        name: 'NUMERAL TU AGENCIA MAYORISTA DE VIAJES SAS', 
        email: 'agencia@ejemplo.com' 
      }
    ]).pipe(delay(500));
  }
}
```

---

## Deployment

### Frontend (Angular)

#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Netlify
```bash
npm run build
# Sube la carpeta dist/ a Netlify
```

#### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

### Backend (NestJS)

#### Railway
```bash
# Conecta tu repo de GitHub con Railway
# Railway detectará automáticamente que es NestJS
```

#### Render
```bash
# Crea un nuevo Web Service en Render
# Build Command: npm install && npm run build
# Start Command: npm run start:prod
```

#### Heroku
```bash
heroku create tu-app-backend
git push heroku main
```

---

## Checklist de Configuración

- [ ] Crear proyecto en Supabase
- [ ] Copiar URL y Anon Key de Supabase
- [ ] Actualizar `environment.ts` con credenciales
- [ ] Configurar SMTP para envío de correos
- [ ] Crear tablas en Supabase (users, reservations)
- [ ] Implementar endpoints del backend
- [ ] Configurar CORS en el backend
- [ ] Probar conexión frontend-backend
- [ ] Implementar procesamiento de Excel
- [ ] Implementar envío de correos
- [ ] Deploy del backend
- [ ] Actualizar `environment.ts` con URL de producción
- [ ] Deploy del frontend

---

## Troubleshooting

### Error de CORS
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solución**: Configura CORS en el backend (ver sección de CORS arriba)

### Error 401 (Unauthorized)
```
Error Code: 401
```
**Solución**: Verifica que el token JWT esté siendo enviado correctamente en el interceptor

### Error al cargar Excel
```
Error al procesar el archivo
```
**Solución**: Verifica que las columnas del Excel coincidan con las esperadas

---

## Contacto y Soporte

Para implementar el backend o resolver dudas:

1. Revisa **BACKEND-EMAIL-TEMPLATE.md** para la plantilla de correo
2. Revisa **PROYECTO-COMPLETADO.md** para el estado del proyecto
3. Revisa este archivo para configuración y deployment

---

¡Éxito con tu proyecto! 🚀
