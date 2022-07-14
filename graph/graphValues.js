const Sequelize=require('sequelize');
const sequelize=require('./database');
const graphValues=sequelize.define("graphvalues", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        require: true
    },
    graphData: {
        type: Sequelize.INTEGER,
        allowNull: false,
        require: true
    },
});

module.exports=graphValues