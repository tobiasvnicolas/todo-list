# 🔧 Comandos Útiles - Todo List Project

Este documento contiene todos los comandos útiles para trabajar con el proyecto.

## 📋 Tabla de Contenidos

- [Instalación Inicial](#instalación-inicial)
- [Desarrollo](#desarrollo)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Base de Datos](#base-de-datos)
- [Docker](#docker)
- [Git](#git)
- [Troubleshooting](#troubleshooting)

## 🚀 Instalación Inicial

### Verificar requisitos

```powershell
# Verificar versiones instaladas
node --version        # Debe ser v18.x o superior
npm --version         # Debe ser v8.x o superior
mysql --version       # Debe ser v8.0.x

# Ejecutar script de verificación
.\verify-setup.ps1
```

### Instalar dependencias

```powershell
# Backend
cd backend
npm install

# Frontend
cd ..\frontend
npm install
```

### Configurar variables de entorno

```powershell
# Backend
cd backend
cp .env.example .env
notepad .env          # Editar con tus credenciales

# Frontend
cd ..\frontend
cp .env.example .env
```

## 💻 Desarrollo

### Iniciar el proyecto

**Opción 1: Dos terminales separadas**

```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

**Opción 2: Una terminal con comandos en paralelo**

```powershell
# Iniciar backend en segundo plano
cd backend
Start-Process npm -ArgumentList "run dev"

# Esperar y luego iniciar frontend
Start-Sleep -Seconds 3
cd ..\frontend
npm start
```

**Opción 3: Usando Docker Compose**

```powershell
docker-compose up
```

### Detener el proyecto

```powershell
# Ctrl+C en cada terminal

# O si usaste Docker
docker-compose down
```

### Reiniciar el proyecto

```powershell
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

## 🧪 Testing

### Tests Unitarios

```powershell
# Backend - Ejecutar todos los tests
cd backend
npm test

# Backend - Modo watch
npm run test:watch

# Frontend - Ejecutar todos los tests
cd frontend
npm test

# Frontend - Modo watch
npm run test:watch
```

### Tests E2E con Cypress

```powershell
cd frontend

# Modo interactivo (recomendado para desarrollo)
npx cypress open

# Modo headless (para CI/CD)
npx cypress run

# Ejecutar un test específico
npx cypress run --spec "cypress/e2e/todo.cy.js"
```

### Ver reportes de coverage

```powershell
# Backend
cd backend
npm test
start coverage\lcov-report\index.html

# Frontend
cd frontend
npm test
start coverage\lcov-report\index.html
```

## 🎨 Code Quality

### ESLint

```powershell
# Backend - Verificar
cd backend
npm run lint

# Backend - Auto-fix
npm run lint:fix

# Frontend - Verificar
cd frontend
npm run lint

# Frontend - Auto-fix
npm run lint:fix
```

### Prettier

```powershell
# Backend - Formatear
cd backend
npm run format

# Backend - Verificar formato
npx prettier --check "src/**/*.js"

# Frontend - Formatear
cd frontend
npm run format

# Frontend - Verificar formato
npx prettier --check "src/**/*.{js,jsx,json,css}"
```

### Ejecutar todas las verificaciones

```powershell
# Backend
cd backend
npm run lint
npm run format
npm test

# Frontend
cd frontend
npm run lint
npm run format
npm test
```

## 🗄️ Base de Datos

### Inicializar la base de datos

```powershell
# Opción 1: Desde línea de comandos
mysql -u root -p < database\init.sql

# Opción 2: Desde MySQL Workbench o cliente
# 1. Abrir database/init.sql
# 2. Ejecutar el script
```

### Conectarse a MySQL

```powershell
mysql -u root -p
```

### Comandos útiles de MySQL

```sql
-- Ver bases de datos
SHOW DATABASES;

-- Usar la base de datos del proyecto
USE todo_db;

-- Ver tablas
SHOW TABLES;

-- Ver estructura de la tabla
DESCRIBE tareas;

-- Ver todas las tareas
SELECT * FROM tareas;

-- Limpiar todas las tareas
DELETE FROM tareas;

-- Insertar tarea de prueba
INSERT INTO tareas (descripcion, completada)
VALUES ('Tarea de prueba', 0);

-- Ver tareas completadas
SELECT * FROM tareas WHERE completada = 1;

-- Ver tareas pendientes
SELECT * FROM tareas WHERE completada = 0;
```

### Resetear la base de datos

```powershell
# Eliminar y recrear
mysql -u root -p -e "DROP DATABASE IF EXISTS todo_db;"
mysql -u root -p < database\init.sql
```

## 🐳 Docker

### Construir imágenes

```powershell
# Backend
cd backend
docker build -t todo-backend .

# Frontend
cd ..\frontend
docker build -t todo-frontend .
```

### Ejecutar con Docker Compose

```powershell
# Iniciar todos los servicios
docker-compose up

# Iniciar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v
```

### Comandos útiles de Docker

```powershell
# Ver contenedores corriendo
docker ps

# Ver todos los contenedores
docker ps -a

# Ver logs de un contenedor
docker logs todo-backend
docker logs todo-frontend
docker logs todo-mysql

# Entrar a un contenedor
docker exec -it todo-backend sh
docker exec -it todo-mysql mysql -u root -p

# Reiniciar un contenedor
docker restart todo-backend

# Eliminar todos los contenedores detenidos
docker container prune
```

## 📦 Git

### Comandos básicos

```powershell
# Ver estado
git status

# Agregar archivos
git add .

# Commit
git commit -m "Descripción del cambio"

# Push
git push origin main

# Pull
git pull origin main

# Ver branches
git branch

# Crear nueva branch
git checkout -b feature/nueva-funcionalidad

# Cambiar de branch
git checkout main
```

### Workflows comunes

```powershell
# Crear una nueva feature
git checkout -b feature/nombre-feature
# ... hacer cambios ...
git add .
git commit -m "feat: descripción"
git push origin feature/nombre-feature
# Crear Pull Request en GitHub

# Actualizar tu branch con main
git checkout main
git pull origin main
git checkout feature/nombre-feature
git merge main

# Deshacer cambios no commiteados
git checkout -- .

# Ver diferencias
git diff
```

## 🔧 Troubleshooting

### Puerto ya en uso

```powershell
# Encontrar proceso usando puerto 3000
netstat -ano | findstr :3000

# Matar proceso (reemplazar <PID>)
taskkill /PID <PID> /F

# Para puerto 3001
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Limpiar node_modules y reinstalar

```powershell
# Backend
cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Frontend
cd ..\frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Limpiar caché de npm

```powershell
npm cache clean --force
```

### MySQL no inicia

```powershell
# Verificar servicio
Get-Service MySQL*

# Iniciar servicio
Start-Service MySQL80

# Reiniciar servicio
Restart-Service MySQL80
```

### Tests fallan

```powershell
# Limpiar cache de Jest
cd backend
npx jest --clearCache

cd ..\frontend
npx jest --clearCache

# Reinstalar dependencias
npm ci
```

### Error de ESLint

```powershell
# Limpiar cache de ESLint
cd backend
Remove-Item .eslintcache -ErrorAction SilentlyContinue

cd ..\frontend
Remove-Item .eslintcache -ErrorAction SilentlyContinue
```

## 📊 Monitoring y Logs

### Ver logs del backend

```powershell
# Si usas npm run dev, los logs aparecen en consola
# Para guardar logs:
cd backend
npm run dev > logs.txt 2>&1
```

### Ver logs de MySQL

```powershell
# Ubicación típica en Windows
Get-Content "C:\ProgramData\MySQL\MySQL Server 8.0\Data\*.err"
```

## 🚀 Build para Producción

### Backend

```powershell
cd backend

# Instalar solo dependencias de producción
npm ci --only=production

# Ejecutar
npm start
```

### Frontend

```powershell
cd frontend

# Crear build optimizado
npm run build

# La carpeta build/ contiene los archivos estáticos
# Servir con cualquier servidor web
```

## 📈 Performance

### Analizar bundle del frontend

```powershell
cd frontend

# Crear build con análisis
npm run build

# Ver tamaño de archivos
Get-ChildItem build\static -Recurse | Measure-Object -Property Length -Sum
```

### Verificar uso de memoria

```powershell
# Ver procesos de Node
Get-Process -Name node

# Detalle de uso de recursos
Get-Process -Name node | Format-List *
```

## 🎯 Comandos Rápidos Frecuentes

```powershell
# Setup inicial completo
.\verify-setup.ps1
cd backend && npm install && cd ..\frontend && npm install

# Desarrollo diario
cd backend && npm run dev     # Terminal 1
cd frontend && npm start      # Terminal 2

# Testing completo
cd backend && npm test && cd ..\frontend && npm test

# Quality check antes de commit
cd backend && npm run lint && npm run format && npm test
cd ..\frontend && npm run lint && npm run format && npm test

# Resetear todo
docker-compose down -v
Remove-Item backend\node_modules -Recurse -Force
Remove-Item frontend\node_modules -Recurse -Force
npm install --prefix backend
npm install --prefix frontend
```

---

**💡 Tip:** Guarda este archivo en favoritos para referencia rápida durante el desarrollo.
