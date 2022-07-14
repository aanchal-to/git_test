const Sequelize = require("sequelize");
const sequelize=new Sequelize("store","root","", {
    dialect: "mysql",
    // host: "locathost"
});
module.exports = sequelize
