import fs from 'fs/promises';

export async function readDatabase(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.split('\n').filter(line => line.trim() !== '');
    const students = lines.slice(1);
    const fieldStudents = {};

    students.forEach(student => {
      const [firstName, , , field] = student.split(',');
      if (!fieldStudents[field]) {
        fieldStudents[field] = [];
      }
      fieldStudents[field].push(firstName);
    });

    return fieldStudents;
  } catch (error) {
    throw error;
  }
}
