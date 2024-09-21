import { readDatabase } from '../utils.js';

export class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const fieldStudents = await readDatabase(process.argv[2]);
      let output = 'This is the list of our students\n';

      Object.keys(fieldStudents)
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
        .forEach(field => {
          output += `Number of students in ${field}: ${fieldStudents[field].length}. List: ${fieldStudents[field].join(', ')}\n`;
        });

      res.status(200).send(output.trim());
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const major = req.params.major;
    if (!['CS', 'SWE'].includes(major)) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const fieldStudents = await readDatabase(process.argv[2]);
      const studentsList = fieldStudents[major] || [];
      res.status(200).send(`List: ${studentsList.join(', ')}`);
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}
