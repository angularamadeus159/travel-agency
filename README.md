# On Vacation Dashboard

Dashboard para gestionar información de reservas de viajes a partir de archivos Excel almacenados en Google Drive.

## 🎯 Características

- ✅ Autenticación con Supabase
- 📤 Carga y procesamiento de archivos Excel
- 🔍 Filtrado de reservas por agencia
- ✉️ Envío de correos automatizados con plantillas HTML
- 📊 Visualización de reservas en tabla interactiva
- 🎨 Interfaz moderna y responsiva

## 🛠️ Stack Tecnológico

### Frontend
- **Angular 21** - Framework principal
- **TypeScript** - Lenguaje de programación
- **SCSS** - Estilos
- **Signals** - Gestión de estado reactiva
- **Standalone Components** - Arquitectura moderna sin NgModules
- **Lazy Loading** - Carga diferida de módulos

### Backend (Por implementar)
- **NestJS** - Framework backend
- **Supabase** - Autenticación y base de datos
- **NodeMailer** - Envío de correos

## 📁 Estructura del Proyecto

```
src/app/
├── core/                      # Funcionalidades core (singleton)
│   ├── guards/               # Guards de autenticación
│   ├── interceptors/         # HTTP interceptors
│   ├── models/              # Interfaces y tipos
│   └── services/            # Servicios singleton
├── features/                 # Módulos de funcionalidades
│   ├── auth/                # Autenticación
│   │   └── login/          # Componente de login
│   └── dashboard/           # Dashboard principal
│       ├── dashboard-layout/
│       ├── reservations/    # Gestión de reservas
│       └── upload-excel/    # Carga de Excel
├── shared/                   # Componentes compartidos
│   ├── components/          # Componentes reutilizables
│   ├── directives/          # Directivas
│   └── pipes/              # Pipes
└── environments/            # Configuración de entornos
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js >= 18
- npm >= 10

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Edita `src/environments/environment.ts` y `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  supabaseUrl: 'TU_SUPABASE_URL',
  supabaseKey: 'TU_SUPABASE_ANON_KEY'
};
```

### 3. Ejecutar en Desarrollo

```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
