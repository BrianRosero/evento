const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const Reserva = require('./app/models/reserva');
const app = express();

const corsOptions = {
    origin: "*", // Permite cualquier origen
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
};

app.use(bodyParser.json());

app.get('/api/reservas', async (req, res) => {
    try {
        const reservas = await Reserva.getAll();
        res.json(reservas);
    } catch (error) {
        console.error('Error al obtener las reservas:', error);
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
});

app.post('/api/reservas', async (req, res) => {
    const { mesa, silla, usuarioId } = req.body;

    try {
        const nuevaReserva = await Reserva.create(mesa, silla, usuarioId);
        res.status(201).json(nuevaReserva);
    } catch (error) {
        console.error('Error al crear la reserva:', error);
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido esta es la aplicación de Eventos." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El Servidor se está ejecutando en el puerto ${PORT}.`);
});

function initial() {
  // Verificar si los roles ya existen en la base de datos
  Role.findAll()
      .then(roles => {
        if (roles.length === 0) {
          // Si no hay roles, crear los roles
          Role.create({
            id: 1,
            name: "user"
          });

          Role.create({
            id: 2,
            name: "moderator"
          });

          Role.create({
            id: 3,
            name: "admin"
          });
        } else {
          console.log('No se han creado algunos roles porque ya existen');
        }
      })
      .catch(err => {
        console.error('Error revisando los roles:', err);
      });
}

module.exports = app;