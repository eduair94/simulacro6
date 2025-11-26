# 🚀 Guía de Despliegue en Vercel - Simulacro 6

Esta guía explica cómo desplegar el proyecto completo (Backend + Frontend) en Vercel.

## 📋 Prerrequisitos

1. Cuenta en [Vercel](https://vercel.com) (puedes registrarte con GitHub)
2. Repositorio subido a GitHub: `eduair94/simulacro6`
3. Base de datos MongoDB Atlas configurada

---

## 🔧 Paso 1: Desplegar el Backend

### 1.1 Crear nuevo proyecto en Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Haz clic en **"Import Git Repository"**
3. Selecciona el repositorio `simulacro6`
4. Haz clic en **"Import"**

### 1.2 Configurar el proyecto Backend

En la pantalla de configuración:

| Campo | Valor |
|-------|-------|
| **Project Name** | `simulacro6-backend` (o el nombre que prefieras) |
| **Framework Preset** | `Other` |
| **Root Directory** | Haz clic en **"Edit"** → escribe `backend` → **"Continue"** |

### 1.3 Configurar Variables de Entorno

Expande la sección **"Environment Variables"** y agrega:

| Name | Value |
|------|-------|
| `MONGODB_URI` | `mongodb+srv://test1234:test1234@cluster0.sus7b8h.mongodb.net/bebederos?retryWrites=true&w=majority&appName=Cluster0` |

### 1.4 Desplegar

1. Haz clic en **"Deploy"**
2. Espera a que termine el despliegue (1-2 minutos)
3. **¡IMPORTANTE!** Copia la URL del backend, será algo como:
   ```
   https://simulacro6-backend.vercel.app
   ```

### 1.5 Verificar el Backend

Abre en el navegador:
```
https://tu-backend.vercel.app/bebederos
```

Deberías ver el JSON con los bebederos.

---

## 🎨 Paso 2: Desplegar el Frontend

### 2.1 Crear otro proyecto en Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Selecciona el **mismo repositorio** `simulacro6`
3. Haz clic en **"Import"**

### 2.2 Configurar el proyecto Frontend

| Campo | Valor |
|-------|-------|
| **Project Name** | `simulacro6-frontend` (o el nombre que prefieras) |
| **Framework Preset** | `Vite` (debería detectarlo automáticamente) |
| **Root Directory** | Haz clic en **"Edit"** → escribe `frontend` → **"Continue"** |

### 2.3 Configurar Variables de Entorno

Expande la sección **"Environment Variables"** y agrega:

| Name | Value |
|------|-------|
| `VITE_API_URL` | La URL de tu backend (ej: `https://simulacro6-backend.vercel.app`) |

> ⚠️ **IMPORTANTE**: No incluyas `/` al final de la URL

### 2.4 Desplegar

1. Haz clic en **"Deploy"**
2. Espera a que termine (1-2 minutos)
3. Tu frontend estará disponible en algo como:
   ```
   https://simulacro6-frontend.vercel.app
   ```

---

## ✅ Paso 3: Verificar el Despliegue

1. Abre la URL del frontend en el navegador
2. Deberías ver la lista de bebederos
3. El botón de filtrar debería funcionar correctamente

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas `git push` al repositorio, Vercel automáticamente:
- Detectará los cambios
- Reconstruirá los proyectos
- Desplegará la nueva versión

---

## 🐛 Solución de Problemas

### Error: "Cannot connect to API"

1. Verifica que el backend esté desplegado correctamente
2. Comprueba que `VITE_API_URL` tenga la URL correcta del backend
3. Asegúrate de que el backend tenga CORS habilitado (ya está configurado)

### Error: "MongoDB connection failed"

1. Verifica que `MONGODB_URI` esté correctamente configurada en las variables de entorno del backend
2. Asegúrate de que MongoDB Atlas permita conexiones desde cualquier IP (0.0.0.0/0)

### Los cambios no se reflejan

1. Ve al dashboard de Vercel
2. Selecciona el proyecto
3. Haz clic en **"Redeploy"** → **"Redeploy"**

---

## 📁 Estructura del Proyecto en Vercel

```
GitHub: eduair94/simulacro6
├── backend/          → Proyecto Vercel: simulacro6-backend
│   ├── src/
│   ├── package.json
│   └── vercel.json
└── frontend/         → Proyecto Vercel: simulacro6-frontend
    ├── src/
    ├── package.json
    └── vite.config.js
```

---

## 🔗 URLs de Ejemplo

| Servicio | URL |
|----------|-----|
| Backend API | `https://simulacro6-backend.vercel.app` |
| Frontend App | `https://simulacro6-frontend.vercel.app` |
| API Bebederos | `https://simulacro6-backend.vercel.app/bebederos` |

---

## 📝 Notas Adicionales

- El plan gratuito de Vercel es suficiente para este proyecto
- Los despliegues son automáticos con cada push a `master`
- Puedes ver los logs en el dashboard de Vercel si hay errores
