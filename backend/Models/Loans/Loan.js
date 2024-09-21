
module.exports =(sequelize,DataTypes)=>{
const Loan = sequelize.define('Loan',{
    LoanID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    AccountID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    loanType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employmentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    annualIncome: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    loanAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    loanPurpose: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Status: {
        type: DataTypes.STRING,
        defaultValue: 'Pending',
    },

  },{
      tableName:'loans',
      timestamps: false
  });
       return Loan;
};     



