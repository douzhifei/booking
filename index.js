var express = require('express')
var config = require('./config/index')
const booking = require('./json/booking')
const app = express()  
const router = express.Router()
app.get("/booking", function (req,res) {
  res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
  res.end(JSON.stringify(booking))
})
app.use(router)
var port = process.env.PORT || config.build.port

app.use(express.static('./dist'))
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
})