<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require_once __DIR__ . '/../config/config.php';

$id = $_GET['id'] ?? 0;

$sql = "SELECT idFilms as id, titre, description, note, genre AS categorie, image_url AS image, coeur, date_sortie, pegi FROM films WHERE idFilms = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
$film = $stmt->fetch();

echo json_encode($film);
