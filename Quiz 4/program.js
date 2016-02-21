//1. console.log("HELLO WORLD");

/*2. console.log(process.argv);
var result = 0;
var counter = 0;
process.argv.forEach(function(element){
	if(counter >= 2)
	{
		result = result + parseInt(element);
	}
	counter = counter + 1;

});
console.log(result);
*/

/*3.
///opt/bitnami/apache2/htdocs/201html/Quiz 4/text.txt
//like #include
var fs = require('fs')
var contents = fs.readFileSync(process.argv[2])
//now turn the Buffer into a useable piece of data. get the number of \n s
var lines = contents.toString().split('\n').length - 1
console.log(lines)
*/

/*4.
//like the previous one, but use redLine and error checking
var fs = require('fs')
var file = process.argv[2]

fs.readFile(file, function (err, contents) {
  // fs.readFile(file, 'utf8', callback) if you wanna convert the arg into a string first
  var lines = contents.toString().split('\n').length - 1
  console.log(lines)
})
*/

/*5.
//Goes through the files in a directory. For each thing, if it's a text file, list it
var fs = require('fs')
var path = require('path')

fs.readdir(process.argv[2], function (err, list) {
  list.forEach(function (file) {
    if (path.extname(file) === '.' + process.argv[3])
      console.log(file)
  })
})
*/

/*6. make it module
//We use a filter to make this module
var filterFn = require('./filter.js')
var dir = process.argv[2]
var filterStr = process.argv[3]

filterFn(dir, filterStr, function (err, list) {
  if (err)
    return console.error('There was an error:', err)

  list.forEach(function (file) {
    console.log(file)
  })
})
*/

/*7.Makes a HTTP GET request
var http = require('http')

http.get(process.argv[2], function (response) {
  response.setEncoding('utf8')
  //show all the info we got
  response.on('data', console.log)
  response.on('error', console.error)
})
*/

/*8. Makes a HTTP GET request, but this time it will get all the information from
the server.
var http = require('http')
var bl = require('bl')

http.get(process.argv[2], function (response) {
  response.pipe(bl(function (err, data) {
    if (err)
      return console.error(err)
    data = data.toString()
    console.log(data.length)
    console.log(data)
  }))  
})
*/

/*9. Makes 3 HTTP requests and saves the data from each
var http = require('http')
var bl = require('bl')
var results = []
var count = 0

function printResults () {
  for (var i = 0; i < 3; i++)
    console.log(results[i])
}

function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
    response.pipe(bl(function (err, data) {
      if (err)
        return console.error(err)

      results[index] = data.toString()
      count++

      if (count == 3)
        printResults()
    }))
  })
}

for (var i = 0; i < 3; i++)
  httpGet(i)
  */

 /* 10. Creates a new server and then gets the date and time 
var net = require('net')

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i
}

function now () {
  var d = new Date()
  return d.getFullYear() + '-'
    + zeroFill(d.getMonth() + 1) + '-'
    + zeroFill(d.getDate()) + ' '
    + zeroFill(d.getHours()) + ':'
    + zeroFill(d.getMinutes())
}

//creates a new server that quickly!!!! COOL!
var server = net.createServer(function (socket) {
  socket.end(now() + '\n')
})

server.listen(Number(process.argv[2]))//They put in the port number like 8080
*/

/*11. HTTP server that serve the same text file for each request it recieves
var http = require('http')
var fs = require('fs')

var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'content-type': 'text/plain' })

  fs.createReadStream(process.argv[3]).pipe(res)
})

server.listen(Number(process.argv[2]))
*/

/*12. Server that only recieves POST data and turns it into UPPERCASE
var http = require('http')
var map = require('through2-map')//transforms stream data as it's passed through.

var server = http.createServer(function (req, res) {
  if (req.method != 'POST')
    return res.end('send me a POST\n')

  req.pipe(map(function (chunk) {
    return chunk.toString().toUpperCase()
  })).pipe(res)
})

server.listen(Number(process.argv[2]))
*/


var http = require('http')
var url = require('url')

function parsetime (time) {
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}

function unixtime (time) {
  return { unixtime : time.getTime() }
}

var server = http.createServer(function (req, res) {
  var parsedUrl = url.parse(req.url, true)
  var time = new Date(parsedUrl.query.iso)
  var result

  if (/^\/api\/parsetime/.test(req.url))
    result = parsetime(time)
  else if (/^\/api\/unixtime/.test(req.url))
    result = unixtime(time)

  if (result) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))//get the info and turn it into a JSON object server can use.
  } else {
    res.writeHead(404)
    res.end()
  }
})
server.listen(Number(process.argv[2]))