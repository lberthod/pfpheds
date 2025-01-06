import { promises as fs } from 'fs';

async function normalizeFields(obj) {
  const keysToNormalize = ["AIGU", "AMBU", "MSQ", "NEUROGER", "REA", "SYSINT"];
  
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      keysToNormalize.forEach(field => {
        if (obj[key][field] === "x") {
          obj[key][field] = true;
        } else if (obj[key][field] === "" || obj[key][field] === "video") {
          obj[key][field] = false;
        }
      });
    }
  }
}

async function main() {
  try {
    // Lire le JSON depuis un fichier
    const data = await fs.readFile('data.json', 'utf8');
    let json = JSON.parse(data);

    // Normaliser les champs
    normalizeFields(json);

    // Écrire le JSON modifié dans un nouveau fichier
    await fs.writeFile('output.json', JSON.stringify(json, null, 2), 'utf8');
    console.log('Le fichier JSON a été modifié et sauvegardé avec succès.');
  } catch (err) {
    console.error('Erreur:', err);
  }
}

main();
