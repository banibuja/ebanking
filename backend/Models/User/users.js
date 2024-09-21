
module.exports =(sequelize,DataTypes)=>{
    const User= sequelize.define('User',{
        

     userId:{

},
username:{

},
name:{

},
lastname:{

},
email:{

},
password:{

},
gender:{

},
birthday:{

},
CurrencyCode:{

},
profilePicture:{

},
lastLogin:{

},
Status:{

},
},{
    tableName:'users',
    timestamps: false
});
     return User;
};     

