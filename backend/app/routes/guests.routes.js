const express = require("express");
const router = express.Router();
const db = require("../models");
const Invitado = db.invitado;
const Evento = db.evento;

// Agregar un invitado a un evento
router.post("/:eventoId/guests", async (req, res) => {
    const { eventoId } = req.params;
    const { nombreInvitado, cedulaInvitado } = req.body;

    try {
        // Verificar si el evento existe
        const evento = await Evento.findByPk(eventoId);
        if (!evento) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }

        const nuevoInvitado = await Invitado.create({
            nombreInvitado,
            cedulaInvitado,
            eventoId
        });

        res.status(201).json(nuevoInvitado);
    } catch (error) {
        console.error("Error al agregar invitado:", error);
        res.status(500).json({ error: "Error al agregar invitado" });
    }
});

module.exports = router;
