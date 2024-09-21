const http = require('http');

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Holberton School!');
});

// The server listens on port 1245
app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

// Export the app for potential testing or further use
module.exports = app;
