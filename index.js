const mysql = require('mysql2');

require('dotenv').config(); //Charger les variables d'env à partir du fichier .env

// Configuration de la connexion
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// Connexion à la base de données
function connectWithRetry() {
  connection.connect(err => {
    if (err) {
      return console.error('Echec de connexion: ' + err.message);
      setTimeout(connectWithRetry, 5000);
    } else console.log('Connecté à la base de données MySQL.');
  });
}

// Insérer de nouvelles données
// const queryInsert = `INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com')`;
// connection.query(queryInsert, function(err, results) {
//     if (err)
//         console.error('Erreur lors de l\'insertion : ' + err.message);
//     else console.log('Données insérées avec succès, ID de l\'entrée : ' + results.insertId);
//     connection.end();
// });

// Mettre à jour les données
// const queryUpdate = `UPDATE users SET email = 'alice@example.com' WHERE name = 'Alice'`;
// connection.query(queryUpdate, function(err, results) {
//     if (err)
//         console.error('Erreur lors de la mise à jour : ' + err.message);
//     else console.log('Données mises à jour avec succès, lignes affectées : ' + results.affectedRows);
//     connection.end();
// });

// Supprimer des données
// const queryDel = `DELETE
//                   FROM users
//                   WHERE name = 'Alice'`;
// connection.query(queryDel, function (err, results) {
//   if (err)
//     console.error('Erreur lors de la suppression : ' + err.message);
//   else console.log('Données supprimées avec succès, lignes affectées : ' + results.affectedRows);
//   connection.end();
// });

// Lire les données
const queryRead = `SELECT *
                   FROM users`;
connection.query(queryRead, function (err, results) {
  if (err)
    console.error('Erreur lors de la lecture : ' + err.message);
  else console.log('Données récupérées :', results);
  connection.end();
});

connectWithRetry();


function maFonction() {
  return 'résultat attendu';
}

module.exports = maFonction;

