const express = require('express')
var fs = require("fs");

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.set('data', []); 

app.use(express.urlencoded({ extended: false }))
app.use(function(req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

require('./utils/routes')(app)

const PORT = process.env.PORT || 525
app.listen(PORT)
