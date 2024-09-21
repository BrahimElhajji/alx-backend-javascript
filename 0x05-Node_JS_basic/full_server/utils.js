import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  readFile(filePath, 'utf8')
    .then((data) => {
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      const students = lines.slice(1);
      const fields = {};

      students.forEach((student) => {
        const [firstname, , , field] = student.split(',');
        if (firstname && field) {
          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstname);
        }
      });

      resolve(fields);
    })
    .catch(() => {
      reject(new Error('Cannot load the database'));
    });
});

export default readDatabase;
