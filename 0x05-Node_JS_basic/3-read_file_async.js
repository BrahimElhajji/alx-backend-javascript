const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    // Read the file asynchronously
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        // Reject with an error if the file cannot be read
        reject(new Error('Cannot load the database'));
        return;
      }

      // Split the data into lines and filter out empty lines
      const lines = data.split('\n').filter((line) => line.trim() !== '');

      // Remove the header line
      const students = lines.slice(1);

      console.log(`Number of students: ${students.length}`);

      // Create an object to store students by field
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

      // Log the count and list of students for each field
      Object.keys(fieldCounts).forEach((field) => {
        if (Object.prototype.hasOwnProperty.call(fieldCounts, field)) {
          console.log(`Number of students in ${field}: ${fieldCounts[field]}. List: ${fieldStudents[field].join(', ')}`);
        }
      });

      // Resolve the promise once everything is done
      resolve();
    });
  });
}

module.exports = countStudents;
