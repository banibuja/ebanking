module.exports = (sequelize, DataTypes) => {
    const AccessPermissions = sequelize.define('AccessPermissions', {
        PermissionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UserID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        AccessLevel: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'accesspermissions',
        timestamps: false
    });

    return AccessPermissions;
};
