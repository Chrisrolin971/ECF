const mysql = require('mysql2');
const fs = require('fs');

require('dotenv').config(); //Charger les variables d'env à partir du fichier .env

// Configuration de la connexion
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true //permet d'executer plusieurs requettes à la fois
});

// Connexion à la base de données
function connectWithRetry() {
  connection.connect(err => {
    if (err) {
      console.error('Echec de connexion: ' + err.message);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('Connecté à la base de données MySQL.');

      // Lecture du fichier SQL
      let sql = fs.readFileSync('./database/init_db.sql', 'utf8');
      if (sql.charCodeAt(0) === 0xFEFF) sql = sql.slice(1); // Supprimer BOM si présent

      // Exécuter les requêtes
      connection.query(sql, (err, result) => {
        if (err) {
          console.error('Echec : ' + err.message);
        } else {
          console.log('Base de données et table créées avec succès.');
        }
        connection.end();
      });
    }
  });
}

connectWithRetry();

function maFonction() {
  return 'résultat attendu';
}

module.exports = maFonction;

