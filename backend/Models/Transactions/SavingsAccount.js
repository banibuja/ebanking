// SavingsAccount Model
module.exports = (sequelize, DataTypes) => {
    const SavingsAccount = sequelize.define('SavingsAccount', {
        SavingAccount: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users', // Name of the table you're referencing
                key: 'userId'
            },
            onDelete: 'CASCADE'
        },
        CurrencyCode: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        Balance: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false
        },
        AccountStatus: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'savingsaccounts',
        timestamps: false // Disable timestamps if not needed
    });

    return SavingsAccount;
};
