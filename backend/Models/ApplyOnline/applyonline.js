module.exports =(sequelize,DataTypes)=>{
    const ApplyOnline = sequelize.define('ApplyOnline',{
        	
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
package:{

},
gender:{

},
birthday:{

},
Country:{

},
City:{

},
Street:{

},
backPhoto:{

},
frontPhoto:{

},
Status:{

},

},{
    tableName:'applyonline',
    timestamps: false
});
     return ApplyOnline;
};     
