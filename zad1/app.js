const http = require('http');
const { getCars, getCarInformation, getCarAge } = require('./cars');
const { getHTMLDocumentStart, getHTMLDocumentEnd } = require('./htmlGenerator');

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log("Server is running on " + PORT + ".");

  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.write(getHTMLDocumentStart());
  res.write("<body>");

  // Example usage of getCarInformation and getCarAge for car with id 1
  res.write("<p>" + getCarInformation(4) + "</p>");
  res.write("<p>" + getCarAge(4) + "</p>");

  res.write("</body>");
  res.write(getHTMLDocumentEnd());

  res.end();
});

server.listen(PORT);