const express = require('express')

const app = express()

app.disable('x-powered-by')
app.use(express.json())

app.use(express.urlencoded({ extended: false }))
app.use(function(req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  next()
})

require('./utils/routes')(app)

if (process.env.NODE_ENV === 'production') {
  // express serve up production asset
  // exp: main.js or main.css
  app.use(express.static('client/build'))

  //express serve up index.html
  // if it doesnt recognize route
  const path = require('path')
  app.get('*', (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 525
app.listen(PORT)
