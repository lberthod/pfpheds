import fs from 'fs';
import csv from 'csv-parser';

const results = {};

fs.createReadStream('data_student.csv')
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => {
    const firebaseId = data.ID_Firebase;
    if (firebaseId) {
      results[firebaseId] = data;
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');

    // Convert the results object to a JSON string
    const jsonData = JSON.stringify(results, null, 2);

    // Save the JSON data to student.json file
    fs.writeFileSync('student.json', jsonData, 'utf8');

    console.log('JSON data has been written to student.json');
  });
