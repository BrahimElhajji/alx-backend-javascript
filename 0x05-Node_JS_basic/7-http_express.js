const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1);

    let output = `Number of students: ${students.length}\n`;

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
      if (Object.prototype.hasOwnProperty.call(fieldCounts, field)) {
        output += `Number of students in ${field}: ${fieldCounts[field]}. List: ${fieldStudents[field].join(', ')}\n`;
      }
    });

    return output;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

// Define the root endpoint
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Define the /students endpoint
app.get('/students', async (req, res) => {
  const databasePath = process.argv[2];

  try {
    const studentList = await countStudents(databasePath);
    res.send(`This is the list of our students\n${studentList}`);
  } catch (error) {
    res.send(`This is the list of our students\n${error.message}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Export the app
module.exports = app;
