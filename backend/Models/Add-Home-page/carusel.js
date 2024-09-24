module.exports = (sequelize, DataTypes) => {
    const Carusel = sequelize.define('Carusel', {
        CaruselId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        Titulli: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        Teksti: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Photo: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        }
    }, {
        tableName: 'carusel',
        timestamps: false
    });

    return Carusel;
};
