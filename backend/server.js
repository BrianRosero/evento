const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs"); // Para hashear la contraseña
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Reserva = require("./app/models/reserva");

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sincronización de la base de datos en el orden correcto
db.sequelize.sync({ force: true }) // Cambia a `force: true` si quieres borrar y crear de nuevo las tablas
    .then(() => {
        console.log("Base de datos sincronizada correctamente.");
        initial(); // Llamamos a la función para inicializar roles y usuario admin
    })
    .catch((err) => {
        console.error("Error al sincronizar la base de datos:", err);
    });

// Rutas de autenticación y usuarios
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// Rutas de eventos e invitados
require("./app/routes/evento.routes")(app);
require("./app/routes/invitado.routes")(app);

// Agregar las nuevas rutas de eventos e invitados
const eventRoutes = require("./app/routes/events.routes");
const guestRoutes = require("./app/routes/guests.routes");

app.use("/api/events", eventRoutes);
app.use("/api/events", guestRoutes);

// Rutas de reservas
app.get("/api/reservas", async (req, res) => {
    try {
        const reservas = await Reserva.getAll();
        res.json(reservas);
    } catch (error) {
        console.error("Error al obtener las reservas:", error);
        res.status(500).json({ error: "Error al obtener las reservas" });
    }
});

app.post("/api/reservas", async (req, res) => {
    const { mesa, silla, usuarioId } = req.body;

    try {
        const nuevaReserva = await Reserva.create(mesa, silla, usuarioId);
        res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error("Error al crear la reserva:", error);
        res.status(500).json({ error: "Error al crear la reserva" });
    }
});

app.get("/api/events", async (req, res) => {
    const eventos = await db.evento.findAll({ include: db.invitado });
    res.json(eventos);
});

app.post("/api/events", async (req, res) => {
    const { nombrePadre, numeroCelularPadre, grupo, mesa, nombreEstudiante, totalInvitadosPermitidos } = req.body;

    try {
        const nuevoEvento = await db.evento.create({
            nombrePadre,
            numeroCelularPadre,
            grupo,
            mesa,
            nombreEstudiante,
            totalInvitadosPermitidos
        });
        res.status(201).json(nuevoEvento);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el evento" });
    }
});


// Ruta de prueba
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido, esta es la aplicación de Eventos." });
});

// Configuración del puerto
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`El Servidor se está ejecutando en el puerto ${PORT}.`);
});

// Función para inicializar roles y usuario admin
async function initial() {
    try {
        // Verificar si los roles ya existen en la base de datos
        const rolesExistentes = await Role.findAll();
        if (rolesExistentes.length === 0) {
            console.log("Creando roles...");
            await Role.bulkCreate([
                { id: 1, name: "user" },
                { id: 2, name: "moderator" },
                { id: 3, name: "admin" }
            ]);
            console.log("Roles creados correctamente.");
        } else {
            console.log("Roles ya existen.");
        }

        // Verificar si el usuario administrador existe
        const adminExistente = await User.findOne({ where: { email: "admin@admin.co" } });
        if (!adminExistente) {
            console.log("Creando usuario administrador...");
            const hashedPassword = await bcrypt.hash("admin1", 10); // Hashea la contraseña
            await User.create({
                username: "Administrador",
                email: "admin@admin.co",
                password: hashedPassword
            });
            console.log("Usuario administrador creado correctamente.");
        } else {
            console.log("El usuario administrador ya existe.");
        }
    } catch (error) {
        console.error("Error inicializando roles y usuario administrador:", error);
    }
}

module.exports = app;
