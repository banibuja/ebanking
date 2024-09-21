const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Rrugën e saktë për konfigurimin e bazës së të dhënave

class CurrentAccount extends Model {}

CurrentAccount.init({
    CurrentAccount: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // Shtoni fushat e tjera që janë të nevojshme për llogaritë aktuale
}, {
    sequelize,
    modelName: 'CurrentAccount',
    tableName: 'currentaccounts',
    timestamps: true, // Shtoni këtë nëse dëshironi të menaxhoni createdAt dhe updatedAt
});

module.exports = CurrentAccount;