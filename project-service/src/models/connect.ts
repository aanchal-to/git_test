import { Sequelize } from 'sequelize';
const env = process.env.ENVIROMENT;
const config = require(__dirname + '/../config/config.json')[env];
const sequelizeConn = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  logging:false,
  dialect: 'mysql',
  dialectOptions: {
    dateStrings: true,
    typeCast: function (field:any, next:any) { // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
        return next()
      },
    },
    timezone: '+05:30'
});


sequelizeConn.authenticate().then(function (success:any) {
  console.log("Project Service successfully we are connected with the database");
}).catch(function (error: any) {
  console.log(error);
});

export {sequelizeConn};














//var mysql = require('mysql');
// const mysqlConnection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.DBUSER,
//   password: "",
//   database : 'ss_crm'
// })
// try {
//   mysqlConnection.connect((err) => {
//     if (err) throw err;
//     console.log("Connected!");
//   });
// } catch (err) {
//   console.log(`Not Connected ${err}`);
// }
//
//module.exports = mysqlConnection;




