# �� Simulacro 6 - Sistema de Gestión de Bebederos

Solución completa del Simulacro 6 del examen parcial de Programación Full Stack.

## ��� Prompt Original

```
Resolver mostrando el código explicado de forma detallada. De ser posible generar el código 
de tal forma que se pueda ejecutar en vite con datos de prueba usando como MONGODB la url 
en .env test1234/test1234 mongodb+srv://<db_username>:<db_password>@cluster0.sus7b8h.mongodb.net/
Deberá publicarse en github y validarse apropiadamente.
Agregar este prompt al README.md
Se adjunta pdf con la letra.
```

## ��� Estructura del Proyecto

```
simulacro6/
├── backend/                    # API REST con Node.js + Express
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js     # Conexión a MongoDB
│   │   ├── controllers/
│   │   │   └── bebederoController.js  # Controladores (Punto 4)
│   │   ├── models/
│   │   │   └── Bebedero.js     # Modelo Mongoose (Punto 2)
│   │   ├── routes/
│   │   │   └── bebederoRoutes.js  # Rutas Express (Punto 4)
│   │   ├── services/
│   │   │   └── bebederoService.js  # Capa de consultas BD (Punto 3)
│   │   ├── validators/
│   │   │   └── bebederoValidator.js  # Validador Joi (Punto 1)
│   │   ├── index.js            # Servidor principal
│   │   └── seed.js             # Script de datos de prueba
│   ├── .env                    # Variables de entorno
│   └── package.json
│
├── frontend/                   # Aplicación React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── ListaBebederos.jsx     # Componente lista (Punto 6)
│   │   │   └── BebederosContainer.jsx # Contenedor + filtro (Punto 7)
│   │   ├── store/
│   │   │   ├── bebederoSlice.js  # Redux Slice (Punto 5)
│   │   │   └── index.js          # Configuración del store
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

## ��� Instalación y Ejecución

### Requisitos Previos
- Node.js (v18 o superior)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd simulacro6
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```

### 3. Configurar variables de entorno
El archivo `.env` ya está configurado con:
```env
MONGODB_URI=mongodb+srv://test1234:test1234@cluster0.sus7b8h.mongodb.net/bebederos
PORT=3001
```

### 4. Insertar datos de prueba
```bash
npm run seed
```

### 5. Iniciar el Backend
```bash
npm start
```
El servidor estará disponible en `http://localhost:3001`

### 6. Configurar y ejecutar el Frontend
```bash
cd ../frontend
npm install
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

## ��� Documentación de los Puntos

---

## Punto 1: Validador con Joi (5 pts.)

**Archivo:** `backend/src/validators/bebederoValidator.js`

Implementa un esquema de validación con Joi para el modelo Bebederos:

```javascript
const bebederoSchema = Joi.object({
    // nombre: string, requerido, entre 3 y 50 caracteres
    nombre: Joi.string().min(3).max(50).required(),
    
    // ubicacion: string, requerido, entre 10 y 100 caracteres
    ubicacion: Joi.string().min(10).max(100).required(),
    
    // estado: valores permitidos
    estado: Joi.string().valid('operativo', 'mantenimiento', 'fuera de servicio').required(),
    
    // caudal: número entre 0.5 y 50
    caudal: Joi.number().min(0.5).max(50).required(),
    
    // fechaRegistro: fecha con valor por defecto
    fechaRegistro: Joi.date().default(() => new Date())
});
```

También incluye un validador solo para el estado, usado en el PATCH.

---

## Punto 2: Modelo de Mongoose (5 pts.)

**Archivo:** `backend/src/models/Bebedero.js`

Modelo de Mongoose correspondiente al esquema validado por Joi:

```javascript
const bebederoSchema = new mongoose.Schema({
    nombre: { type: String },
    ubicacion: { type: String },
    estado: { type: String },
    caudal: { type: Number },
    fechaRegistro: { type: Date, default: Date.now }
}, {
    collection: 'bebederos',  // Nombre de la colección
    versionKey: false
});
```

**Nota:** No incluye validaciones ya que se asume validado en Joi.

---

## Punto 3: Capa de Consultas a Base de Datos (6 pts.)

**Archivo:** `backend/src/services/bebederoService.js`

Implementa tres funciones principales:

### getAllBebederos()
```javascript
const getAllBebederos = async () => {
    const bebederos = await Bebedero.find({}).lean();
    return bebederos;
};
```

### createBebedero(data)
```javascript
const createBebedero = async (data) => {
    const nuevoBebedero = new Bebedero(data);
    return await nuevoBebedero.save();
};
```

### updateEstado(id, nuevoEstado)
```javascript
const updateEstado = async (id, nuevoEstado) => {
    return await Bebedero.findByIdAndUpdate(
        id,
        { $set: { estado: nuevoEstado } },
        { new: true, runValidators: true }
    );
};
```

---

## Punto 4: Controller y Routes (11 pts.)

### Controllers (`backend/src/controllers/bebederoController.js`)

**GET /bebederos** - Lista todos los bebederos
```javascript
const getBebederos = async (req, res) => {
    const bebederos = await bebederoService.getAllBebederos();
    res.status(200).json({ success: true, data: bebederos, count: bebederos.length });
};
```

**POST /bebederos** - Crea un bebedero (con validación Joi)
```javascript
const postBebedero = async (req, res) => {
    const { error, value } = validateBebedero(req.body);
    if (error) {
        return res.status(400).json({ success: false, errors: error.details });
    }
    const nuevoBebedero = await bebederoService.createBebedero(value);
    res.status(201).json({ success: true, data: nuevoBebedero });
};
```

**PATCH /bebederos/:id/estado** - Actualiza estado
```javascript
const patchEstado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    const { error } = validateEstado({ estado });
    // ... validación y actualización
};
```

### Routes (`backend/src/routes/bebederoRoutes.js`)

```javascript
router.get('/', bebederoController.getBebederos);
router.post('/', bebederoController.postBebedero);
router.patch('/:id/estado', bebederoController.patchEstado);
```

---

## Punto 5: Redux Slice (8 pts.)

**Archivo:** `frontend/src/store/bebederoSlice.js`

Slice de Redux Toolkit con estado inicial y acciones:

```javascript
const initialState = { items: [] };

const bebederoSlice = createSlice({
    name: 'bebederos',
    initialState,
    reducers: {
        // Guarda la lista completa
        setItems: (state, action) => {
            state.items = action.payload;
        },
        
        // Agrega un nuevo bebedero
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        
        // Actualiza el estado de un bebedero por ID
        updateEstado: (state, action) => {
            const { id, estado } = action.payload;
            const index = state.items.findIndex(item => item._id === id);
            if (index !== -1) {
                state.items[index].estado = estado;
            }
        }
    }
});
```

---

## Punto 6: Componente ListaBebederos (9 pts.)

**Archivo:** `frontend/src/components/ListaBebederos.jsx`

Componente que:
- Usa `useEffect` para hacer petición GET a `/bebederos`
- Dispara `setItems` cuando recibe los datos
- Renderiza bebederos mostrando: Nombre, Ubicación, Estado, Caudal
- Acepta lista por parámetro o usa el store

```javascript
const ListaBebederos = ({ bebederos: bebederosProp }) => {
    const dispatch = useDispatch();
    const bebederosStore = useSelector(state => state.bebederos.items);
    
    // Usa prop si está definida, sino usa store
    const bebederosAMostrar = bebederosProp !== undefined ? bebederosProp : bebederosStore;
    
    useEffect(() => {
        const fetchBebederos = async () => {
            const response = await axios.get(`${API_URL}/bebederos`);
            dispatch(setItems(response.data.data));
        };
        fetchBebederos();
    }, [dispatch]);
    
    return (
        <div>
            {bebederosAMostrar.map(bebedero => (
                <article key={bebedero._id}>
                    <h3>{bebedero.nombre}</h3>
                    <p>Ubicación: {bebedero.ubicacion}</p>
                    <p>Estado: {bebedero.estado}</p>
                    <p>Caudal: {bebedero.caudal} L/min</p>
                </article>
            ))}
        </div>
    );
};
```

---

## Punto 7: BotonFiltrarOperativos (6 pts.)

**Archivo:** `frontend/src/components/BebederosContainer.jsx`

Componente contenedor que agrega botón de filtro toggle:

```javascript
const BebederosContainer = () => {
    const [filtroOperativos, setFiltroOperativos] = useState(false);
    const bebederosStore = useSelector(state => state.bebederos.items);
    
    // Filtra solo operativos si el toggle está activo
    const bebederosFiltrados = filtroOperativos
        ? bebederosStore.filter(b => b.estado === 'operativo')
        : bebederosStore;
    
    // Toggle: clic impar = filtrar, clic par = mostrar todos
    const handleToggleFiltro = () => {
        setFiltroOperativos(!filtroOperativos);
    };
    
    return (
        <div>
            <button onClick={handleToggleFiltro}>
                {filtroOperativos ? 'Ver todos' : 'Filtrar operativos'}
            </button>
            <ListaBebederos bebederos={bebederosFiltrados} />
        </div>
    );
};
```

---

## ��� API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/bebederos` | Lista todos los bebederos |
| POST | `/bebederos` | Crea un nuevo bebedero |
| PATCH | `/bebederos/:id/estado` | Actualiza el estado de un bebedero |

### Ejemplo de creación (POST /bebederos)
```json
{
    "nombre": "Bebedero Test",
    "ubicacion": "Ubicación de prueba para el bebedero",
    "estado": "operativo",
    "caudal": 2.5
}
```

## ��� Datos de Prueba

El script `seed.js` inserta 8 bebederos de ejemplo:
- 5 operativos
- 2 en mantenimiento
- 1 fuera de servicio

## ���️ Tecnologías Utilizadas

### Backend
- Node.js
- Express
- Mongoose (MongoDB)
- Joi (Validación)
- CORS
- dotenv

### Frontend
- React 18
- Vite
- Redux Toolkit
- React-Redux
- Axios

## ��� Autor

Solución generada para el Simulacro 6 del parcial de Programación Full Stack.
