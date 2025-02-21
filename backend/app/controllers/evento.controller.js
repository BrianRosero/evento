const db = require("../models");
const Evento = db.evento;

exports.create = async (req, res) => {
    try {
        const evento = await Evento.create(req.body);
        res.status(201).json(evento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const eventos = await Evento.findAll({ include: db.invitado });
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const evento = await Evento.findByPk(req.params.id, { include: db.invitado });
        if (evento) res.json(evento);
        else res.status(404).json({ message: "Evento no encontrado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Evento.update(req.body, { where: { id: req.params.id } });
        if (updated) res.json({ message: "Evento actualizado correctamente" });
        else res.status(404).json({ message: "Evento no encontrado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Evento.destroy({ where: { id: req.params.id } });
        if (deleted) res.json({ message: "Evento eliminado correctamente" });
        else res.status(404).json({ message: "Evento no encontrado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
