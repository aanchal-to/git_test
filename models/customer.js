const Sequelize=require('sequelize')
const sequelize=require('../util/database')
const  order=require('./order')
const bcrypt=require('bcrypt');
const { models } = require('../../database/db');
const customer=sequelize.define("customer", {
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
        // validate:{
        //     isAlpha: true, 
        // }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        require: true,
        validate:{
            isEmail: true, 
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        // validate:{
        //     isAlphanumeric: true, 
        // }
    }
});


    customer.hasMany(order, {
        foreignKey: "customerId",
        as: 'order'
    })
    order.belongsTo(customer, { 
        foreignKey: 'customerId',
            as: 'customer'        
    })

module.exports=customer