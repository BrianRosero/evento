const pool = require('../config/db.config.js');

class Reserva {
    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM reservas');
        return rows;
    }

    static async create(mesa, silla, usuarioId) {
        const { rows } = await pool.query(
            'INSERT INTO reservas (mesa, silla, usuario_id) VALUES ($1, $2, $3) RETURNING *',
            [mesa, silla, usuarioId]
        );
        return rows[0];
    }
}

module.exports = Reserva;