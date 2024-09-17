const fs = require('fs');

function countStudents(path) {
    try {
        const data = fs.readFileSync(path, 'utf-8');

        const lines = data.split('\n').filter((line) => line.trim() !== '');

        if (lines.length <= 1) {
            throw new Error('Cannot load the database');
        }

        const header = lines[0].split(',');
        const students = lines.slice(1);

        const fieldData = {};

        for (const student of students) {
            const [firstname, lastname, age, field] = student.split(',');

            if (firstname && field) {
                if (!fieldData[field]) {
                    fieldData[field] = [];
                }

                fieldData[field].push(firstname);
            }
        }

        console.log(`Number of students: ${students.length}`);

        for (const field in fieldData) {
            const list = fieldData[field].join(', ');
            console.log(`Number of students in ${field}: ${fieldData[field].length}. List: ${list}`);
        }
    } catch (err) {
        throw new Error('Cannot load the database');
    }
}

module.exports = countStudents;
