const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const customer= require('./customer')
const order=sequelize.define("order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate:{
            isNumeric: true,
        }
    }
});


    

module.exports=order