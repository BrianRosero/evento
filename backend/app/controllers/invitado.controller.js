const db = require("../models");
const Invitado = db.invitado;

exports.create = async (req, res) => {
    try {
        const invitado = await Invitado.create(req.body);
        res.status(201).json(invitado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findAll = async (req, res) => {
    try {
        const invitados = await Invitado.findAll();
        res.json(invitados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findOne = async (req, res) => {
    try {
        const invitado = await Invitado.findByPk(req.params.id);
        if (invitado) res.json(invitado);
        else res.status(404).json({ message: "Invitado no encontrado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Invitado.update(req.body, { where: { id: req.params.id } });
        if (updated) res.json({ message: "Invitado actualizado correctamente" });
        else res.status(404).json({ message: "Invitado no encontrado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const deleted = await Invitado.destroy({ where: { id: req.params.id } });
        if (deleted) res.json({ message: "Invitado eliminado correctamente" });
        else res.status(404).json({ message: "Invitado no encontrado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Invitado.update(req.body, { where: { id: req.params.id } });
        if (updated) res.json({ message: "Invitado actualizado correctamente" });
        else res.status(404).json({ message: "Invitado no encontrado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
