# CRUD Firebase con Next.js y Docker

Aplicación fullstack para gestionar usuarios utilizando Firebase, Next.js y Docker.

## 🔧 Configuración

### 1. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Crea una base de datos Firestore
4. Obtén las credenciales del cliente:
   - Ve a Configuración del proyecto > General
   - En "Tus aplicaciones", agrega una aplicación web
   - Copia la configuración de Firebase

5. Obtén las credenciales del Admin SDK:
   - Ve a Configuración del proyecto > Cuentas de servicio
   - Genera una nueva clave privada
   - Guarda el archivo JSON

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` y agrega tus credenciales de Firebase.

### Ejecutar proyecto con Docker

```bash
npm install
docker-compose up --build
docker-compose up
```

## 👤 Autor

Tu nombre - Proyecto educativo PYLP
