<?php
header('Content-Type: application/json');
$allowedOrigins = [ "https://projet-cinephoria.fr", "https://home-5019114412.app-ionos.space" ];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']); }
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
