const Sequelize = require("sequelize");
const sequelize=new Sequelize("graph","root","", {
    dialect: "mysql",
    // host: "locathost"
    define: {
        timestamps: false
    }
});
module.exports = sequelize