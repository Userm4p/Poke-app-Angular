# Pokémon Application

Una aplicación web moderna desarrollada con Angular que permite explorar y gestionar información de Pokémon. La aplicación incluye un sistema completo de autenticación, búsqueda de Pokémon, y una interfaz intuitiva para navegar por la Pokédex.

## ✨ Características

- 🔐 **Sistema de Autenticación** - Login con roles de usuario y administrador
- 🎯 **Exploración de Pokémon** - Búsqueda y visualización de información detallada
- 📱 **Diseño Responsivo** - Interfaz adaptativa para todos los dispositivos
- 🌙 **Modo Oscuro/Claro** - Tema personalizable
- 🧪 **Testing Completo** - Cobertura de pruebas unitarias e integración
- 🚀 **Docker Ready** - Contenedorización completa para despliegue

## 🛠️ Tecnologías

- **Frontend**: Angular 20, TypeScript, RxJS
- **Testing**: Jest, Angular Testing Utilities
- **Styling**: CSS3, Responsive Design
- **Containerización**: Docker, Nginx
- **CI/CD**: GitHub Actions

## 📋 Prerrequisitos

- Node.js 18+ 
- npm 9+
- Docker (opcional)
- Docker Compose (opcional)

## 🚀 Instalación y Ejecución

### Opción 1: Desarrollo Local

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd task_manager
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

### Opción 2: Con Docker

1. **Construir la imagen**
   ```bash
   docker build -t task-manager .
   ```

2. **Ejecutar el contenedor**
   ```bash
   docker run -p 80:80 task-manager
   ```

3. **Abrir en el navegador**
   ```
   http://localhost
   ```

### Opción 3: Con Docker Compose

1. **Ejecutar con Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Abrir en el navegador**
   ```
   http://localhost
   ```

## 🐳 Docker

### Dockerfile

El proyecto incluye un `Dockerfile` optimizado para producción:

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/task_manager/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Configuración de Nginx optimizada para aplicaciones Angular:

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

## 🧪 Testing

### Ejecutar Pruebas

```bash
# Todas las pruebas
npm run test:jest

# Con cobertura
npm run test:jest:coverage

# Modo watch (desarrollo)
npm run test:jest:watch

# Pruebas de integración
npm run test:integration

# Todas las pruebas (unitarias + integración)
npm run test:all
```

### Cobertura de Código

El proyecto mantiene una cobertura de código del 80%+ en archivos críticos:

- ✅ **AuthService**: 96.66% statements, 100% branches
- ✅ **PokemonService**: 100% statements, 100% branches
- ✅ **LoginComponent**: 100% statements, 100% branches
- ✅ **PokedexComponent**: 100% statements, 100% branches

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── layout/         # Layout principal
│   │   ├── navbar/         # Barra de navegación
│   │   ├── sidebar/        # Barra lateral
│   │   └── theme-toggle/   # Toggle de tema
│   ├── guards/             # Guards de autenticación
│   │   ├── auth.guard.ts
│   │   ├── guest.guard.ts
│   │   └── admin.guard.ts
│   ├── services/           # Servicios
│   │   ├── auth.service.ts
│   │   └── pokemon.service.ts
│   ├── types/              # Tipos TypeScript
│   │   ├── auth.types.ts
│   │   └── pokemon.types.ts
│   ├── views/              # Vistas principales
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── pokedex/
│   │   ├── moves/
│   │   ├── regions/
│   │   └── types/
│   └── integration/        # Pruebas de integración
├── setup-jest.ts           # Configuración de Jest
└── types/                   # Tipos globales
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm start              # Servidor de desarrollo
npm run build          # Build de producción
npm run watch          # Build en modo watch

# Testing
npm run test:jest      # Pruebas unitarias
npm run test:integration # Pruebas de integración
npm run test:all       # Todas las pruebas
npm run test:ci        # Pruebas para CI/CD

# Utilidades
npm run fmt            # Formatear código
```

## 👥 Usuarios de Prueba

### Usuario Regular
- **Usuario**: `user`
- **Contraseña**: `user`
- **Rol**: Usuario

### Administrador
- **Usuario**: `admin`
- **Contraseña**: `admin`
- **Rol**: Administrador

## 🌐 API Externa

La aplicación utiliza la [PokéAPI](https://pokeapi.co/) para obtener información de Pokémon:

- **Endpoint**: `https://pokeapi.co/api/v2/`
- **Documentación**: [PokéAPI Docs](https://pokeapi.co/docs/v2)
- **Rate Limiting**: Sin límites para uso personal
