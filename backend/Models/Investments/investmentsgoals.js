module.exports = (sequelize, DataTypes) => {
    const InvestmentGoals = sequelize.define('InvestmentGoals', {
        InvestmentGoalID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        GoalName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        GoalAmount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        Deadline: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Impact: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'investmentsgoals',
        timestamps: false
    });

    return InvestmentGoals;
};
