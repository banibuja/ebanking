
module.exports =(sequelize,DataTypes)=>{
    const Logs = sequelize.define('Logs',{

logId:{

},
	userId:{

    },	action:{

    },
    	details:{

        },
        	timestamp:{

            },
            
  },{
    tableName:'logs',
    timestamps: false
});
     return Logs;
};   