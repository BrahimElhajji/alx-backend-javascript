const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer((req, res) => {
  const url = req.url;
  
  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    // Get the database file name from the command line arguments
    const dbFilePath = process.argv[2];

    countStudents(dbFilePath)
      .then(() => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is the list of our students');
      })
      .catch((error) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`${error.message}`);
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// The server listens on port 1245
const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Export the app for potential testing or further use
module.exports = app;
