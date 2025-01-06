// Charger dynamiquement le module 'fs'
import('fs').then(fs => {
    // Charger le fichier JSON
    fs.readFile('ila.json', 'utf8', (err, data) => {
      if (err) throw err;
      const jsonData = JSON.parse(data);
  
      // Fonction pour supprimer les valeurs des clés 'takenBy'
      function clearTakenBy(obj) {
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === 'object') {
              clearTakenBy(obj[key]); // Appliquer récursivement pour les objets imbriqués
            } else if (key === 'takenBy') {
              obj[key] = ""; // Vider la clé 'takenBy'
            }
          }
        }
      }
  
      // Appliquer la fonction à l'objet JSON
      clearTakenBy(jsonData);
  
      // Enregistrer le fichier JSON mis à jour
      fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), 'utf8', err => {
        if (err) throw err;
        console.log('Clés takenBy vidées avec succès.');
      });
    });
  }).catch(err => {
    console.error('Erreur lors de l\'importation du module fs:', err);
  });
  