const http = require('http');
const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1);

    let output = `Number of students: ${students.length}`;

    const fieldCounts = {};
    const fieldStudents = {};

    students.forEach((student) => {
      const [firstName, , , field] = student.split(',');
      if (!fieldCounts[field]) {
        fieldCounts[field] = 0;
        fieldStudents[field] = [];
      }
      fieldCounts[field] += 1;
      fieldStudents[field].push(firstName);
    });

    Object.keys(fieldCounts).forEach((field) => {
      output += `\nNumber of students in ${field}: ${fieldCounts[field]}. List: ${fieldStudents[field].join(', ')}`;
    });

    return output;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const databasePath = process.argv[2];
      const output = await countStudents(databasePath);
      res.end(`This is the list of our students\n${output}`);
    } catch (error) {
      res.end(`Error: ${error.message}`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

const port = 1245;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
