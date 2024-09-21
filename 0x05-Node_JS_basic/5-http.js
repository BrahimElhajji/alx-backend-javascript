const http = require('http');
const fs = require('fs');
const { argv } = require('process');

function countStudents(path, stream) {
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path, 'utf8');
    const result = [];
    data.split('\n').forEach((line) => {
      const studentData = line.split(',');
      // Only push if there is a valid field
      if (studentData[3]) {
        result.push(studentData);
      }
    });

    // Remove the header
    result.shift();

    const students = result.map((data) => [data[0], data[3]]); // [firstName, field]
    const fields = new Set(students.map((student) => student[1]));
    const finalCounts = {};

    fields.forEach((field) => { finalCounts[field] = 0; });
    students.forEach((student) => {
      if (student[1]) {
        finalCounts[student[1]] += 1;
      }
    });

    stream.write(`Number of students: ${result.length}\n`);

    Object.keys(finalCounts).forEach((field) => {
      const names = students
        .filter((student) => student[1] === field)
        .map((student) => student[0])
        .join(', ');
      stream.write(`Number of students in ${field}: ${finalCounts[field]}. List: ${names}\n`);
    });
  } else {
    throw new Error('Cannot load the database');
  }
}

const hostname = 'localhost';
const port = 1245;

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const { url } = req;
  
  if (url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  } else if (url === '/students') {
    res.write('This is the list of our students');
    try {
      countStudents(argv[2], res);
      res.end();
    } catch (err) {
      res.write(err.message);
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.write('Not Found\n');
    res.end();
  }
});

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server is listening on http://${hostname}:${port}/`);
});

// Export the app for potential testing or further use
module.exports = app;
