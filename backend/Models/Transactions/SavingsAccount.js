const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const SavingsAccount = sequelize.define('SavingsAccount', {
    SavingAccount: {
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
    tableName: 'savingsaccounts',
    timestamps: false,
});

module.exports = SavingsAccount;