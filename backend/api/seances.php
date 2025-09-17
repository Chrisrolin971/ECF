<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

$filmId = $_GET['filmId'] ?? 0;

$sql = "SELECT
  s.idSeance,
  s.date,
  s.heure,
  s.langue,
  q.Type AS qualite,
  q.Prix AS prix,
  sa.nomSalle AS salle,
  sa.idSalles AS salle_id,
  sa.capacite AS capacite,
  c.villeCinema AS cinema
FROM seance s
JOIN qualite q ON s.qualite_id = q.idQualite
JOIN salles sa ON s.salle_id = sa.idSalles
JOIN cinema c ON sa.idCinema = c.idCinema
WHERE s.films_id = ?
ORDER BY s.date, s.heure";

$stmt = $pdo->prepare($sql);
$stmt->execute([$filmId]);
$seances = $stmt->fetchAll();

echo json_encode($seances);
