const fs = require('fs');
function countStudents(path) {
  try {
  const data = fs.readFileSync(path, 'utf-8').trim();
    const lines = data.split('\n').filter(line => line);
    const headers = lines.shift();
    const studentsByField = {};
    lines.forEach((line) => {
      const [firstname, lastname, age, field] = line.split(',');
      if (!studentsByField[field]) {
        studentsByField[field] = [];
      }
      studentsByField[field].push(firstname);
    });
    const totalStudents = lines.length;
    console.log(`Number of students: ${totalStudents}`);
    for (const [field, students] of Object.entries(studentsByField)) {
      console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
