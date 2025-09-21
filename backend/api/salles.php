<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$stmt = $pdo->query("SELECT
       s.idSalles AS numero,
       s.nomSalle AS nom,
       s.capacite,
       c.villeCinema AS cinema,
       q.Type AS qualite
     FROM salles s
     JOIN cinema c ON s.idCinema = c.idCinema
     JOIN qualite q ON s.idQualite = q.idQualite
   ");

$salles = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($salles);
