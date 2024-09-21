
module.exports =(sequelize,DataTypes)=>{
    const AboutUs = sequelize.define('AboutUs',{
         AboutUsId:{

        },
        Tittle:{
            
        },
        Info:{

        },
    },{
       tableName:'aboutus',
       timestamps: false
    });
       return AboutUs;
};     
