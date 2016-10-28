// Local data mocking with status codes by Rui
var jsonServer = require('json-server')

const server = jsonServer.create()
const router = jsonServer.router('mock-api/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(function (req, res, next) {

  //append the status code to whatever URL to produce said error
  if (req.url.match(/\/500?$/)) {
    res.sendStatus(500)
  } else if(req.url.match(/\/404?$/)) {
    res.sendStatus(404)
  }
  else if(req.url.match(/\/401?$/)){
    res.sendStatus(401)
  }
  else{
    next()
  }
})

server.use(router)
server.listen(3000, function () {
  console.log('JSON Server is running')
})