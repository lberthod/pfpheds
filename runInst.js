import { readFileSync, createReadStream, writeFileSync } from 'fs';
import { resolve } from 'path';
import csv from 'csv-parser';

// Chemins des fichiers
const jsonFilePath = resolve('json_inst.json');
const csvFilePath = resolve('institution_data.csv');
const outputFilePath = resolve('missing_places.json');

// Lecture du fichier JSON
const jsonData = JSON.parse(readFileSync(jsonFilePath, 'utf-8'));

// Fonction pour vérifier si le nom et le lieu existent dans le JSON
const checkPlaceExists = (name, place) => {
  return Object.values(jsonData).some(inst => {
    const instName = inst.Name.toLowerCase();
    const instPlace = inst.Lieu.toLowerCase();
    const nameParts = name.toLowerCase().split(' ');

    // Vérifie si le nom complet ou une partie du nom correspond et si le lieu est le même
    return (instName === name.toLowerCase() || nameParts.some(part => instName.includes(part))) && instPlace === place.toLowerCase();
  });
};

const missingPlaces = [];

// Lecture du fichier CSV
createReadStream(csvFilePath)
  .pipe(csv({ separator: ';' }))
  .on('data', (row) => {
    const name = row.Nom;
    const place = row.Lieu;

    if (!checkPlaceExists(name, place)) {
      missingPlaces.push({ Nom: name, Lieu: place });
    }
  })
  .on('end', () => {
    // Écriture des lieux manquants dans un fichier JSON
    writeFileSync(outputFilePath, JSON.stringify(missingPlaces, null, 2), 'utf-8');
    console.log('Les lieux manquants ont été enregistrés dans', outputFilePath);
  });

