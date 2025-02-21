module.exports = (sequelize, Sequelize) => {
    const Evento = sequelize.define("evento", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombrePadre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        numeroCelularPadre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        grupo: {
            type: Sequelize.ENUM("A", "B", "C", "D", "E", "F"),
            allowNull: true
        },
        mesa: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        nombreEstudiante: {
            type: Sequelize.STRING,
            allowNull: false
        },
        totalInvitadosPermitidos: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    return Evento;
};
