app.post('/inscription', (req, res) => {
  const { nom, prenom, pseudo, email, motDePasse } = req.body;

  // Sécuriser le mot de passe
  const bcrypt = require('bcrypt');
  const saltRounds = 10;

  bcrypt.hash(motDePasse, saltRounds, (err, hash) => {
    if (err) return res.status(500).send('Erreur de hash');

    const sql = `INSERT INTO Utilisateurs (nom, prenom, pseudo, email, mdp, role)
                 VALUES (?, ?, ?, ?, ?, 0)`; // role 0 = utilisateur standard

    connection.query(sql, [nom, prenom, pseudo, email, hash], (err, result) => {
      if (err) return res.status(500).send('Erreur SQL');
      res.status(201).send('Utilisateur créé avec succès');
    });
  });
});
