# 🎯 Modo de Prueba Activado

## ✅ El dashboard ahora funciona con datos simulados

### 🔐 Credenciales de Acceso

Para acceder al dashboard, usa estas credenciales:

```
Email:      admin@onvacation.com
Contraseña: 123456
```

---

## 📊 Datos de Prueba Incluidos

### **Reservas** (8 reservas de ejemplo)

Se han incluido reservas para **3 agencias diferentes**:

1. **NUMERAL TU AGENCIA MAYORISTA DE VIAJES SAS**
   - 4 reservas
   - Email: numeral@agencia.com

2. **VIAJES DEL SUR SAS**
   - 2 reservas
   - Email: viajesdelsur@ejemplo.com

3. **TOURS COLOMBIA SAS**
   - 2 reservas
   - Email: tourscolombia@ejemplo.com

---

## 🎮 Cómo Probar

### 1. **Login**
```
1. Ve a: http://localhost:4200/auth/login
2. Ingresa: admin@onvacation.com
3. Contraseña: 123456
4. Click en "Iniciar Sesión"
```

### 2. **Ver Reservas**
```
1. Serás redirigido automáticamente al dashboard
2. Verás todas las 8 reservas
3. Prueba filtrar por agencia usando el dropdown
```

### 3. **Filtrar por Agencia**
```
1. En el dropdown "Seleccionar Agencia"
2. Elige una agencia (ej: NUMERAL TU AGENCIA MAYORISTA)
3. La tabla se filtrará automáticamente
4. Aparecerá el botón "Enviar Correo"
```

### 4. **Enviar Correo (Simulado)**
```
1. Filtra por una agencia
2. Click en "✉️ Enviar Correo a [Agencia]"
3. Verás un mensaje de confirmación (simulado)
```

### 5. **Cargar Excel (Simulado)**
```
1. Click en "📤 Cargar Excel" en el sidebar
2. Selecciona cualquier archivo .xlsx o .xls
3. Click en "Cargar Archivo"
4. Verás mensaje: "15 reservas cargadas exitosamente"
```

---

## 🔧 Cambiar a Modo Producción

Cuando implementes el backend real, cambia estos archivos:

### **1. auth.service.ts**
Línea 8:
```typescript
const USE_MOCK = false; // Cambiar a false
```

### **2. reservation.service.ts**
Línea 7:
```typescript
const USE_MOCK = false; // Cambiar a false
```

---

## 📋 Datos de Ejemplo Incluidos

### Reserva 1
- **N° Reserva:** 2254964
- **Agencia:** NUMERAL TU AGENCIA MAYORISTA
- **Cliente:** Juan Pérez González
- **Fecha Viaje:** 28/11/2025
- **Cuota Octubre:** $7.033.000
- **Observación:** PAGO TOTAL 28 DE OCTUBRE

### Reserva 2
- **N° Reserva:** 2259927
- **Agencia:** NUMERAL TU AGENCIA MAYORISTA
- **Cliente:** María García López
- **Fecha Viaje:** 15/09/2026
- **Cuota Octubre:** $1.296.227
- **Observación:** CUOTA VENCIDA PAGO PENDIENTE

### Reserva 3
- **N° Reserva:** 2260573
- **Agencia:** NUMERAL TU AGENCIA MAYORISTA
- **Cliente:** Carlos Rodríguez Martínez
- **Fecha Viaje:** 15/05/2026
- **Cuota Octubre:** $1.101.433
- **Observación:** CUOTA VENCIDA PAGO PENDIENTE

### Reserva 4
- **N° Reserva:** 2261845
- **Agencia:** VIAJES DEL SUR SAS
- **Cliente:** Ana Martínez Silva
- **Fecha Viaje:** 20/12/2025
- **Cuota Octubre:** $5.500.000
- **Observación:** PAGO AL DÍA

### Reserva 5
- **N° Reserva:** 2262156
- **Agencia:** VIAJES DEL SUR SAS
- **Cliente:** Luis Fernando Torres
- **Fecha Viaje:** 10/01/2026
- **Cuota Octubre:** $3.200.000
- **Observación:** PAGO PARCIAL RECIBIDO

### Reserva 6
- **N° Reserva:** 2263489
- **Agencia:** TOURS COLOMBIA SAS
- **Cliente:** Patricia Gómez Ruiz
- **Fecha Viaje:** 14/02/2026
- **Cuota Octubre:** $8.500.000
- **Observación:** PAGO TOTAL ANTICIPADO

### Reserva 7
- **N° Reserva:** 2264721
- **Agencia:** TOURS COLOMBIA SAS
- **Cliente:** Roberto Sánchez Díaz
- **Fecha Viaje:** 08/03/2026
- **Cuota Octubre:** $4.750.000
- **Observación:** PENDIENTE SALDO

### Reserva 8
- **N° Reserva:** 2265892
- **Agencia:** NUMERAL TU AGENCIA MAYORISTA
- **Cliente:** Sandra Morales Castro
- **Fecha Viaje:** 15/12/2025
- **Cuota Octubre:** $6.200.000
- **Observación:** PAGO COMPLETO

---

## ✨ Características que Puedes Probar

### ✅ Funcionando con Mock
- [x] Login con validación
- [x] Dashboard completo
- [x] Sidebar colapsable
- [x] Tabla de reservas
- [x] Filtrado por agencia
- [x] Formato de moneda colombiana
- [x] Formato de fechas
- [x] Envío de correo (simulado)
- [x] Carga de Excel (simulado)
- [x] Logout
- [x] Redirecciones automáticas
- [x] Estados de carga
- [x] Mensajes de error/éxito

### ⏳ Requieren Backend Real
- [ ] Procesamiento real de Excel
- [ ] Envío real de correos
- [ ] Persistencia en base de datos
- [ ] Autenticación con Supabase

---

## 🎨 Experiencia de Usuario

Todo está funcionando como si tuvieras el backend real:

1. **Delays realistas** - Los mocks incluyen delays de red (600-2000ms)
2. **Validación de credenciales** - Solo funciona con las credenciales correctas
3. **Mensajes de error** - Si ingresas mal usuario/contraseña verás errores
4. **Datos coherentes** - Las reservas están relacionadas correctamente con sus agencias
5. **Formato profesional** - Todos los datos tienen formato colombiano

---

## 🚀 ¡Listo para Probar!

**El servidor ya está corriendo en:** http://localhost:4200

**Accede con:**
- Email: `admin@onvacation.com`
- Contraseña: `123456`

---

## 💡 Notas Importantes

1. Los datos son **temporales** y se resetean al recargar
2. No se guarda nada en base de datos (es simulación)
3. Los correos no se envían realmente
4. Los archivos Excel no se procesan (solo se simula)
5. Cuando implementes el backend, solo cambia `USE_MOCK = false`

---

¡Disfruta probando el dashboard! 🎉
