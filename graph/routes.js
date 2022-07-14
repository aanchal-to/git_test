const express=require('express')
const {createData, findData}=require('./controller')
const graphValues=require('./graphValues')
var router=express.Router();

router.post('/create-data',createData)
router.get('/get-data',findData)
module.exports = router