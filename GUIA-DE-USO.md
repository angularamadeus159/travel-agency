# Guía de Uso - On Vacation Dashboard

## 🎯 Flujo de Trabajo Completo

### 1. Inicio de Sesión

**Pantalla**: `/auth/login`

```
┌─────────────────────────────────────────┐
│     On Vacation Dashboard               │
│     Gestión de Reservas                 │
│                                         │
│  ┌───────────────────────────────┐     │
│  │ Correo Electrónico            │     │
│  │ [correo@ejemplo.com         ] │     │
│  └───────────────────────────────┘     │
│                                         │
│  ┌───────────────────────────────┐     │
│  │ Contraseña                    │     │
│  │ [••••••••                  👁] │     │
│  └───────────────────────────────┘     │
│                                         │
│  ┌───────────────────────────────┐     │
│  │    Iniciar Sesión             │     │
│  └───────────────────────────────┘     │
│                                         │
└─────────────────────────────────────────┘
```

**Datos de prueba** (cuando implementes el backend):
- Email: `admin@onvacation.com`
- Password: `admin123`

---

### 2. Dashboard Principal

**Pantalla**: `/dashboard/reservations`

```
┌──────────┬──────────────────────────────────────────┐
│          │                                          │
│ 📋       │  Gestión de Reservas                     │
│ Reservas │  ───────────────────────                 │
│          │                                          │
│ 📤       │  ┌──────────────────────────────┐        │
│ Cargar   │  │ Seleccionar Agencia:         │        │
│ Excel    │  │ [Todas las agencias      ▼]  │        │
│          │  └──────────────────────────────┘        │
│ ✉️       │                                          │
│ Enviar   │  ┌────────────────────────────────────┐  │
│ Correos  │  │ ✉️ Enviar Correo a [Agencia]      │  │
│          │  └────────────────────────────────────┘  │
│          │                                          │
│ ────────│  ┌──────────────────────────────────────┐│
│          │  │ N° Reserva │ Agencia │ Cliente │... ││
│ 👤 Admin │  ├────────────┼─────────┼─────────┼────││
│ admin@   │  │ 2254964    │ NUMERAL │ Juan P. │... ││
│          │  │ 2259927    │ NUMERAL │ María G.│... ││
│ 🚪       │  └──────────────────────────────────────┘│
│ Cerrar   │                                          │
│ Sesión   │  Total de reservas: 2                    │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

---

### 3. Cargar Archivo Excel

**Pantalla**: `/dashboard/upload`

```
┌──────────┬──────────────────────────────────────────┐
│          │                                          │
│ 📋       │  Cargar Archivo Excel                    │
│ Reservas │  ─────────────────────                   │
│          │                                          │
│ 📤       │  📋 Instrucciones                        │
│ Cargar   │  ────────────────────                    │
│ Excel    │  • El archivo debe estar en formato      │
│ (activo) │    Excel (.xlsx o .xls)                  │
│          │  • Debe contener las siguientes          │
│ ✉️       │    columnas:                             │
│ Enviar   │    - RESERVA                             │
│ Correos  │    - CLIENTE                             │
│          │    - FECHA VIAJE                         │
│          │    - CUOTA OCTUBRE                       │
│ ────────│    - FECHA PAGO DEL MES                  │
│          │    - OBSERVACIÓN                         │
│ 👤 Admin │                                          │
│ admin@   │  ┌────────────────────────────────┐      │
│          │  │        📁                      │      │
│ 🚪       │  │  Haz clic para seleccionar     │      │
│ Cerrar   │  │    un archivo Excel            │      │
│ Sesión   │  │  o arrastra y suelta aquí      │      │
│          │  └────────────────────────────────┘      │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

**Después de seleccionar archivo**:

```
┌──────────┬──────────────────────────────────────────┐
│          │  ┌────────────────────────────────────┐  │
│          │  │ 📄 reservas-enero-2025.xlsx        │  │
│          │  │    1.2 MB                       ✕  │  │
│          │  └────────────────────────────────────┘  │
│          │                                          │
│          │  ┌────────────────────────────────────┐  │
│          │  │     📤 Cargar Archivo              │  │
│          │  └────────────────────────────────────┘  │
└──────────┴──────────────────────────────────────────┘
```

---

### 4. Filtrar y Enviar Correo

**Paso 1**: Seleccionar Agencia

```
┌──────────────────────────────────────┐
│ Seleccionar Agencia:                 │
│ ┌──────────────────────────────────┐ │
│ │ Todas las agencias            ▼  │ │
│ ├──────────────────────────────────┤ │
│ │ NUMERAL TU AGENCIA MAYORISTA    │ │ ← Click aquí
│ │ VIAJES DEL SUR SAS               │ │
│ │ TOURS COLOMBIA SAS               │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

**Paso 2**: La tabla se filtra automáticamente

```
┌────────────────────────────────────────────────┐
│ Solo mostrando reservas de:                    │
│ NUMERAL TU AGENCIA MAYORISTA                   │
├────────────────────────────────────────────────┤
│ N° Reserva │ Cliente     │ Fecha Viaje │ ...   │
├────────────┼─────────────┼─────────────┼───────┤
│ 2254964    │ Juan Pérez  │ 28/11/2025  │ ...   │
│ 2259927    │ María García│ 15/09/2026  │ ...   │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────┐
│ ✉️ Enviar Correo a NUMERAL TU AGENCIA │ ← Click aquí
└────────────────────────────────────────┘
```

**Paso 3**: Confirmación de envío

```
┌────────────────────────────────────────┐
│ ✅ Correo enviado exitosamente         │
└────────────────────────────────────────┘
```

---

## 📧 Correo Recibido por la Agencia

```
De: On Vacation <recaudoagencias@onvacation.com>
Para: agencia@ejemplo.com
Asunto: Estado de Cuenta - NUMERAL TU AGENCIA MAYORISTA

╔════════════════════════════════════════════╗
║        On Vacation                         ║
║     Estado de Cuenta de Reservas           ║
╚════════════════════════════════════════════╝

Buen día,

Agencia: NUMERAL TU AGENCIA MAYORISTA DE VIAJES SAS

Eres un aliado muy importante para nosotros. Juntos hemos 
asumido el compromiso de brindarles a nuestros viajeros 
experiencias memorables en sus vacaciones.

Ten presente tu compromiso. Te enviamos la relación de las 
reservas que actualmente tienes con On Vacation, en la cual 
podrás encontrar:

• Número de reserva
• Fecha de pago
• Valor a abonar

⚠️ RECUERDE GENERAR LOS PAGOS DE ACUERDO A FECHA DE ESTADO 
   DE CUENTA PARA EVITAR SUPLEMENTO POR INCUMPLIMIENTO, 
   EL CUAL SERÍA $100.000 POR PERSONA

╔════════════════════════════════════════════════════════╗
║ N° Reserva │ Cliente      │ Fecha Viaje │ Cuota Oct  ║
╠════════════╪══════════════╪═════════════╪════════════╣
║ 2254964    │ Juan Pérez   │ 28/11/2025  │ $7.033.000 ║
║ 2259927    │ María García │ 15/09/2026  │ $1.296.227 ║
╚════════════════════════════════════════════════════════╝

[Continúa con información de pago...]

────────────────────────────────────────────────────────
On Vacation - Experiencias Memorables
Email: recaudoagencias@onvacation.com
© 2025 On Vacation. Todos los derechos reservados.
────────────────────────────────────────────────────────
```

---

## 🎨 Características de UI en Acción

### Animaciones y Estados

#### 1. **Botón de Carga**
```
Estado Normal:     ┌──────────────────┐
                   │  📤 Cargar       │
                   └──────────────────┘

Estado Hover:      ┌──────────────────┐
(sombra + lift)    │  📤 Cargar       │ ↑
                   └──────────────────┘

Estado Loading:    ┌──────────────────┐
                   │  ⏳ Cargando...  │
                   └──────────────────┘
```

#### 2. **Sidebar Colapsable**
```
Expandido:              Colapsado:
┌─────────────┐        ┌───┐
│ On Vacation │        │ O │
│             │        │   │
│ 📋 Reservas │        │ 📋│
│ 📤 Cargar   │        │ 📤│
│ ✉️ Correos  │        │ ✉️│
│             │        │   │
│ 👤 Admin    │        │ 👤│
│ 🚪 Cerrar   │        │ 🚪│
└─────────────┘        └───┘
```

#### 3. **Estados de Tabla**
```
Cargando:
┌────────────────────────┐
│       ⏳               │
│   Cargando reservas... │
└────────────────────────┘

Vacío:
┌────────────────────────┐
│                        │
│  No se encontraron     │
│  reservas              │
└────────────────────────┘

Con Datos:
┌────────────────────────┐
│ N° │ Cliente │ ...     │
├────┼─────────┼─────────┤
│ 123│ Juan    │ ...     │ ← Hover: fondo gris claro
└────────────────────────┘
```

---

## 🔒 Seguridad y Validaciones

### Formulario de Login

```
✓ Email válido
  ✓ Formato de email correcto
  ✓ Campo requerido
  
✓ Contraseña
  ✓ Mínimo 6 caracteres
  ✓ Campo requerido
  ✓ Toggle para mostrar/ocultar
```

**Mensajes de Error**:
```
┌─────────────────────────────────┐
│ Correo Electrónico              │
│ [correo-invalido              ] │
│ ❌ Ingrese un correo válido     │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Contraseña                      │
│ [12345                        ] │
│ ❌ La contraseña debe tener     │
│    al menos 6 caracteres        │
└─────────────────────────────────┘
```

### Validación de Archivos

```
Archivo válido:
┌─────────────────────────────────┐
│ 📄 reservas.xlsx                │
│    1.2 MB                       │
└─────────────────────────────────┘

Archivo inválido:
┌─────────────────────────────────┐
│ ❌ Por favor selecciona un      │
│    archivo Excel válido         │
│    (.xlsx o .xls)               │
└─────────────────────────────────┘
```

---

## 📊 Formato de Datos

### Moneda (Peso Colombiano)
```
Input:  7033000
Output: $7.033.000
```

### Fechas (Formato Colombiano)
```
Input:  2025-11-28T00:00:00.000Z
Output: 28/11/2025
```

### Estados de Reserva
```
PENDING        → 🟡 Pendiente
PAID_FULL      → 🟢 Pagado
PAID_PARTIAL   → 🟠 Pago Parcial
OVERDUE        → 🔴 Vencido
```

---

## 🎯 Casos de Uso Principales

### Caso 1: Nuevo Usuario (Primera Vez)

1. Accede a `/auth/login`
2. Ingresa credenciales
3. Es redirigido a `/dashboard/reservations`
4. Ve el sidebar y las opciones disponibles
5. Explora el dashboard

### Caso 2: Cargar Nuevas Reservas

1. Click en "📤 Cargar Excel" en el sidebar
2. Arrastra archivo .xlsx o hace click para seleccionar
3. Verifica el nombre y tamaño del archivo
4. Click en "📤 Cargar Archivo"
5. Ve mensaje de confirmación con cantidad de reservas cargadas
6. Automáticamente puede ver las reservas en "📋 Reservas"

### Caso 3: Enviar Estado de Cuenta a Agencia

1. Va a "📋 Reservas"
2. Selecciona una agencia del dropdown
3. La tabla se filtra automáticamente
4. Revisa los datos mostrados
5. Click en "✉️ Enviar Correo a [Agencia]"
6. Ve confirmación de envío exitoso
7. La agencia recibe el correo con tabla HTML

### Caso 4: Consultar Información Específica

1. Va a "📋 Reservas"
2. Puede filtrar por:
   - Agencia
   - Rango de fechas
   - Estado de pago
3. Ve resultados en tiempo real
4. Exporta datos si es necesario

---

## 🎨 Paleta de Colores Usada

```
Primario:     #667eea → #764ba2 (gradiente púrpura)
Secundario:   #48bb78 (verde éxito)
Error:        #e53e3e (rojo)
Warning:      #ed8936 (naranja)
Info:         #4299e1 (azul)

Background:   #f7fafc (gris muy claro)
Surface:      #ffffff (blanco)
Text:         #2d3748 (gris oscuro)
Text Muted:   #718096 (gris medio)
Border:       #e2e8f0 (gris claro)

Hover BG:     #edf2f7 (gris extra claro)
Focus Ring:   rgba(102, 126, 234, 0.1)
```

---

## ⌨️ Atajos de Teclado

```
/ o Ctrl+F  → Buscar en tabla
Esc         → Cerrar modal
Tab         → Navegar entre campos
Enter       → Submit en formularios
```

---

## 📱 Responsive Design

### Mobile (< 768px)
- Sidebar colapsado por defecto
- Tabla con scroll horizontal
- Botones apilados verticalmente
- Formularios a ancho completo

### Tablet (768px - 1024px)
- Sidebar visible pero puede colapsarse
- Tabla con columnas reducidas
- Layout flexible

### Desktop (> 1024px)
- Vista completa
- Sidebar expandido
- Todas las columnas visibles
- Hover effects activos

---

## 🚀 Performance

### Lazy Loading
```
Initial Bundle:  ~150 KB
Login Route:     ~20 KB (cargado bajo demanda)
Dashboard Route: ~18 KB (cargado bajo demanda)
Reservas Route:  ~26 KB (cargado bajo demanda)
Upload Route:    ~23 KB (cargado bajo demanda)
```

### Optimizaciones
- ✅ Componentes standalone (menor bundle)
- ✅ Lazy loading de rutas
- ✅ Signals para reactividad eficiente
- ✅ Imágenes optimizadas (cuando se agreguen)
- ✅ Minificación en producción
- ✅ Tree shaking automático

---

¡Disfruta usando el dashboard! 🎉
