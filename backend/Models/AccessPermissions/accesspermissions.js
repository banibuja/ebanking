
module.exports =(sequelize,DataTypes)=>{
    const AccessPermissions = sequelize.define('AccessPermissions',{
        PermissionID:{

        },
       UserID:{

       },
       AccessLevel:{

       },

    },{
        tableName:'accesspermissions',
        timestamps: false
  });
       return AccessPermissions;
};   
