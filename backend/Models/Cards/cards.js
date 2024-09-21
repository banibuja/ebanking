module.exports = (sequelize, DataTypes) => {
    const Cards = sequelize.define('Cards', {
        CardID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Tabela që referon
                key: 'userId'
            },
            onDelete: 'CASCADE'
        },
        CurrentAccount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'currentaccounts', 
                key: 'CurrentAccount'
            },
            onDelete: 'CASCADE'
        },
        CardNumber: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true
        },
        ValidFrom: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ExpiryDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        CardHolderName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CardType: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        CardStatus: {
            type: DataTypes.STRING(20),
            defaultValue: 'ACTIVE',
            allowNull: false
        },
        AvailableBalance: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        }
    }, {
        tableName: 'cards',
        timestamps: false 
    });

    return Cards;
};
