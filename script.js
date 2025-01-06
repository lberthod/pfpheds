import { readFileSync, createReadStream, writeFileSync } from 'fs';
import { resolve } from 'path';
import csv from 'csv-parser';

// Chemins des fichiers
const jsonFilePath = resolve('import.json');
const csvFilePath = resolve('studentba22.csv');
const outputFilePath = resolve('out2.json');

// Lecture du fichier JSON
let studentsData = JSON.parse(readFileSync(jsonFilePath, 'utf-8'));

// Lecture du fichier CSV
createReadStream(csvFilePath)
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    // Rechercher l'étudiant correspondant dans le JSON par email
    let studentKey = Object.keys(studentsData).find(key => studentsData[key].Mail === row.Mail);

    if (studentKey) {
      // Mise à jour des informations de l'étudiant
      studentsData[studentKey].SAE = row.SAE.toLowerCase() === 'true';
      studentsData[studentKey].Lese = row.LESE.toLowerCase() === 'true';
      studentsData[studentKey].CasParticulier = row.CASPARTICULER.toLowerCase() === 'true';
      studentsData[studentKey].Remarque = row.REMARQUE || '';
      studentsData[studentKey].REPONDANTHES = row.REPONDANTHES || '';
      studentsData[studentKey].PFP1 = row.PFP1ID || '';
      studentsData[studentKey].PFP1_ = row.PFP1RID || '';
      studentsData[studentKey].PFP2 = row.PFP2ID || '';
      studentsData[studentKey].PFP2_ = row.PFP2RID || '';

      // Mettre à jour l'information de PFPinfo
      if (!studentsData[studentKey].PFPinfo) {
        studentsData[studentKey].PFPinfo = {};
      }

      studentsData[studentKey].PFPinfo['PFP1'] = {
        ...studentsData[studentKey].PFPinfo['PFP1'],
        ID: row.PFP1ID || '',
        IDA: row.PFP1RID || ''
      };
      studentsData[studentKey].PFPinfo['PFP2'] = {
        ...studentsData[studentKey].PFPinfo['PFP2'],
        ID: row.PFP2ID || '',
        IDA: row.PFP2RID || ''
      };
    }
  })
  .on('end', () => {
    // Écriture des données mises à jour dans un nouveau fichier JSON
    writeFileSync(outputFilePath, JSON.stringify(studentsData, null, 2), 'utf-8');
    console.log('Les données ont été mises à jour et enregistrées dans out2.json');
  });
