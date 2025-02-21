const express = require("express");
const router = express.Router();
const db = require("../models");
const Evento = db.evento;
const Invitado = db.invitado;

// Obtener todos los eventos con sus invitados
router.get("/", async (req, res) => {
    try {
        const eventos = await Evento.findAll({ include: Invitado });
        res.json(eventos);
    } catch (error) {
        console.error("Error al obtener eventos:", error);
        res.status(500).json({ error: "Error al obtener eventos" });
    }
});

// Crear un nuevo evento
router.post("/", async (req, res) => {
    const { nombrePadre, numeroCelularPadre, grupo, mesa, nombreEstudiante, totalInvitadosPermitidos } = req.body;

    try {
        const nuevoEvento = await Evento.create({
            nombrePadre,
            numeroCelularPadre,
            grupo,
            mesa,
            nombreEstudiante,
            totalInvitadosPermitidos
        });
        res.status(201).json(nuevoEvento);
    } catch (error) {
        console.error("Error al crear evento:", error);
        res.status(500).json({ error: "Error al crear evento" });
    }
});

// Actualizar un evento por ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { mesa } = req.body; // Asegurar que solo actualizamos la mesa

        const evento = await Evento.findByPk(id);
        if (!evento) {
            return res.status(404).json({ error: "Evento no encontrado" });
        }

        evento.mesa = mesa; // Actualizar el campo mesa
        await evento.save();

        res.json({ message: "Mesa actualizada correctamente", evento });
    } catch (error) {
        console.error("Error al actualizar la mesa:", error);
        res.status(500).json({ error: "Error al actualizar la mesa" });
    }
});


module.exports = router;
