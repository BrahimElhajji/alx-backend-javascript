const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const header = lines.shift();
    if (!header) {
      throw new Error('Cannot load the database');
    }
    const students = {};
    let totalStudents = 0;
    for (const line of lines) {
      const [firstname, lastname, age, field] = line.split(',');

      if (firstname && field) {
        totalStudents++;
        if (!students[field]) {
          students[field] = [];
        }
        students[field].push(firstname);
      }
    }
    console.log(`Number of students: ${totalStudents}`);
    for (const [field, names] of Object.entries(students)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }

  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
