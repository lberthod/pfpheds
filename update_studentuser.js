import fs from 'fs';
import csv from 'csv-parser';

// Define the path to your CSV file
const filePath = 'users_students.csv'; // Replace with the path to your CSV file

// Initialize an empty object to hold the transformed data
const results = {};

// Create a readable stream from the CSV file
fs.createReadStream(filePath)
  .pipe(csv({ separator: ';' })) // Specify the semicolon as the separator
  .on('data', (row) => {
    // Extract necessary information from each row
    const firebaseId = row['ID Firebase'];

    // Build the user object based on CSV row data
    const user = {
      email: row['Mail'],
      roles: {
        BA23: row['BA23'] === 'true',
        PFP2BA23: row['PFP2BA23'] === 'true',
        student: row['student'] === 'true',
        physio: row['physio'] === 'true',
        siteLoeche: row['siteLoeche'] === 'true',
      }
    };

    // Use the "ID Firebase" as the key in the results object
    results[firebaseId] = user;
  })
  .on('end', () => {
    // Output the results as JSON
    console.log(JSON.stringify(results, null, 2));

    // Optionally, write the JSON output to a file
    fs.writeFileSync('./output.json', JSON.stringify(results, null, 2));
    console.log('CSV file successfully converted to JSON and saved to output.json');
  });
