/**
 * Primary file for the API
 */

// Depedencies
const http = require('http')
const url = require('url')
const {StringDecoder} = require('string_decoder')
const config = require('./config')

// Define the handlers
const handlers = {}

handlers.sample = (data, callback) => {
  callback(406, {name: 'sample handler'})
}
handlers.notFound = (data, callback) => {
  callback(404)
}

// Define a request router
const router = {
  sample: handlers.sample
}

// The server should respond to all requests with a string
const server = http.createServer((req, res) => {
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true)

  const path = parsedUrl.pathname

  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  // Get the HTTP method
  const method = req.method.toLowerCase()

  // Get the headers as an object
  const headers = req.headers

  // Get query string as an object
  const queryStringObject = parsedUrl.query

  // Get the payload if any
  const decoder = new StringDecoder('utf-8')
  let buffer = ''
  req.on('data', data => {
    buffer += decoder.write(data)
  })
  req.on('end', () => {
    buffer += decoder.end()

    // Choose the handler this request should go to

    const chosenHandler =
      Object.keys(handlers).indexOf(trimmedPath) !== -1
        ? handlers[trimmedPath]
        : handlers.notFound

    // Construct data to send to the handler
    data = {
      trimmedPath,
      queryStringObject,
      method,
      headers,
      payload: buffer
    }

    chosenHandler(data, (statusCode = 200, payload = {}) => {
      const payloadString = JSON.stringify(payload)

      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)
    })
  })
})

// Start the server
server.listen(config.port, () => {
  console.log(
    `The server is listening on port ${config.port} now with environment ${
      config.envName
    }`
  )
})
