module.exports = (sequelize, DataTypes) => {
   const AboutUs = sequelize.define('AboutUs', {
       AboutUsId: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false
       },
       Tittle: {
           type: DataTypes.TEXT,
           allowNull: true
       },
       Info: {
           type: DataTypes.TEXT,
           allowNull: true
       }
   }, {
       tableName: 'aboutus',
       timestamps: false
   });

   return AboutUs;
};
