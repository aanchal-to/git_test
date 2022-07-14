const express = require('express')
const app = express()
const file=require('express-fileUpload')
const path=require('path')
const port =3001
const bodyparser=require ('body-parser')
const sequelize = require("../database/db");
const routes = require('./routes/routes');
const cors=require('cors')
app.use(express.json())
app.use(bodyparser.urlencoded({extended: false}))
app.use(cors());

app.use(file({
  createParentPath: true
}));

app.use(routes);

app.get('/form', (req, res) => 
{
  res.send("hello")
})

app.listen(port, async() => { 
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
console.log(`Example app listening on port ${port}!`)
})

module.exports=app;