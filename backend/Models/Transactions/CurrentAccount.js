const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const CurrentAccount = sequelize.define('CurrentAccount', {
    CurrentAccount: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    // shto kolona të tjera sipas strukturës së tabelës
}, {
    tableName: 'currentaccounts',
    timestamps: false,
});

module.exports = CurrentAccount;