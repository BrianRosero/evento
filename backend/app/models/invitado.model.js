module.exports = (sequelize, Sequelize) => {
    const Invitado = sequelize.define("invitado", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombreInvitado: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cedulaInvitado: {
            type: Sequelize.STRING,
            allowNull: false
        },
        asignado: {  // Nuevo campo
            type: Sequelize.BOOLEAN,
            defaultValue: false, // Por defecto, no está asignado
            allowNull: false
        }
    });

    return Invitado;
};
