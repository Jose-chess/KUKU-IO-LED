<div align="center">

# 🔴 KUKU_IO LED ⚡

**Plataforma de Control y Gestión de Dispositivos LED**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![.NET Core](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![Windows](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)](https://www.microsoft.com/windows)
[![Build](https://img.shields.io/badge/Build-Passing-00C853?style=for-the-badge&logo=githubactions&logoColor=white)]()

</div>

---

## 🎯 Descripción

**KUKU_IO LED** es una plataforma de control visual ultra rápida diseñada para gestionar matrices LED de forma centralizada. Construida con una arquitectura moderna que prioriza la experiencia de usuario y el rendimiento en tiempo real.

> "*El control luminoso, al alcance de un clic*" 💡

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                         KUKU_IO LED                             │
│                    Plataforma de Control LED                    │
└─────────────────────────────────────────────────────────────────┘

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Frontend   │ ──────▶ │    Backend   │ ──────▶ │   Hardware   │
│   React 18   │  HTTPS  │  .NET Core   │  TCP/IP │  LED Matrix  │
│  + Tailwind  │         │    8.0       │         │  Controllers │
└──────────────┘         └──────────────┘         └──────────────┘
       │                        │
       ▼                        ▼
┌──────────────┐         ┌──────────────┐
│  State Mgmt  │         │   Database   │
│   React      │         │  PostgreSQL  │
│   Hooks      │         │   + SQLite   │
└──────────────┘         └──────────────┘
```

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología | Propósito |
|------|------------|-----------|
| **Frontend** | React 18 + Vite | UI interactiva y reactiva |
| **Estilos** | Tailwind CSS 3.4 | Diseño utility-first épico |
| **Backend** | .NET Core 8.0 | API robusta y escalable |
| **ORM** | Entity Framework | Acceso a datos optimizado |
| **DB** | Supabase PostgreSQL + SQLite | Persistencia transaccional y local |
| **Desktop** | Tauri | Empaquetado nativo Windows |
| **IDE** | VS Code (Sidebar →) | Developer Experience premium |

---

## 📊 Problemática vs Solución

| ❌ Antes | ✅ Después (KUKU_IO) |
|----------|----------------------|
| Interfaces de control obsoletas y complejas | UI moderna con Tailwind, intuitiva y rápida |
| Gestión manual de cada dispositivo LED | Control centralizado en tiempo real |
| Falta de feedback visual inmediato | Animaciones fluidas y estados reactivos |
| Código legacy difícil de mantener | Arquitectura Clean Architecture + DDD |
| Dependencias de software propietario | Stack open source y escalable |

---

## 🚀 Instrucciones de Instalación (Windows)

### ⚠️ IMPORTANTE - Configuración de Credenciales

**Antes de comenzar**, debes configurar las credenciales sensibles. Los archivos con credenciales reales están en `.gitignore` y no se suben a GitHub.

1. **Backend**: Copia `backend/appsettings.example.json` a `backend/appsettings.json` y rellena tus credenciales de Supabase
2. **Frontend**: Copia `frontend/.env.example` a `frontend/.env` y configura las variables necesarias
3. **Variables de entorno** (alternativa): También puedes usar variables de entorno: `SUPABASE_URL`, `SUPABASE_KEY`, `JWT_SECRET`

### Prerrequisitos
- Windows 10/11 (x64)
- Node.js 18+ 
- .NET SDK 8.0
- Supabase account (PostgreSQL)
- SQLite (local development)
- VS Code (recomendado con sidebar derecha)

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/Jose-chess/KUKU-IO-LED.git
cd KUKU-IO-LED

# 2. Configurar credenciales
# Backend: copiar y editar appsettings.json
copy backend\appsettings.example.json backend\appsettings.json
# (Editar backend/appsettings.json con tus credenciales de Supabase)

# Frontend: copiar y editar .env
copy frontend\.env.example frontend\.env
# (Editar frontend/.env si es necesario)

# 3. Instalar dependencias frontend
cd frontend
npm install

# 4. Ejecutar migraciones (si usas Entity Framework)
cd ../backend
# Para PostgreSQL:
dotnet ef database update
# O para SQLite (desarrollo local):
# (Ya incluido en el proyecto)

# 5. Iniciar backend
dotnet run

# 6. En otra terminal, iniciar frontend
cd ../../frontend
npm run dev
```

### Modo Desktop (Tauri)
```bash
cd frontend
npm run tauri:dev    # Desarrollo
npm run tauri:build  # Producción .exe
```

---

## 🎨 Developer Experience

### Configuración VS Code Recomendada

```json
{
  "workbench.tree.indent": 20,
  "workbench.colorTheme": "Dark+ (default dark)",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "typescript": "typescript"
  }
}
```



---

## 🧩 Arquitectura de Carpetas (Clean Architecture)

```
KUKU-IO-LED/
├── 📁 frontend/                    # React + Tailwind
│   ├── src/
│   │   ├── Components/            # Componentes reutilizables
│   │   ├── Hooks/                 # Custom hooks
│   │   ├── Context/               # State management
│   │   ├── Assets/                # SVGs, imágenes
│   │   └── Styles/                # CSS modules
│   └── public/
│
├── 📁 backend/                     # .NET Core API
│   └── KUKU-IO-LED.API/
│       ├── Controllers/           # API endpoints
│       ├── Models/                # Entidades
│       ├── Services/              # Business logic
│       ├── Data/                  # EF Core DbContext + Migrations
│       ├── Migrations/            # PostgreSQL & SQLite migrations
│       └── appsettings.json       # Configuración
│
└── 📁 docs/                        # Documentación
```

---

## 🎭 Características Visuales Épicas

- ⚡ **Transiciones suaves**: Animaciones CSS con cubic-bezier
- 🎨 **Sistema de diseño consistente**: Paleta Dark/Red (#FACC15, #FF0000)
- 🎯 **Micro-interacciones**: Hover states y feedback táctil
- 📱 **Responsive**: Adaptable a múltiples viewports
- ♿ **Accesibilidad**: ARIA labels y navegación por teclado

---

<div align="center">

*KUKU_IO LED © 2026*

</div>
