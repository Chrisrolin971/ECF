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

$sql = "SELECT idFilms as id, titre, description, note, genre AS categorie, image_url AS image, coeur, date_sortie, pegi FROM films";
$stmt = $pdo->query($sql);
$films = $stmt->fetchAll();

echo json_encode($films);
