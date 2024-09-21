const fs = require('fs');

function countStudents(path) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(path, 'utf8');

    // Split the data into lines and filter out empty lines
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    // Remove the header line
    const students = lines.slice(1);

    // Log the total number of students
    console.log(`Number of students: ${students.length}`);

    // Initialize objects for counting and listing students by field
    const fields = {};

    students.forEach((student) => {
      const [firstName, , , field] = student.split(',');

      // Initialize the field if not already present
      if (!fields[field]) {
        fields[field] = { count: 0, names: [] };
      }

      // Increment the student count and add the name to the field's list
      fields[field].count += 1;
      fields[field].names.push(firstName);
    });

    // Log the number of students and names in each field
    Object.keys(fields).forEach((field) => {
      const { count, names } = fields[field];
      console.log(`Number of students in ${field}: ${count}. List: ${names.join(', ')}`);
    });
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
