<?php
header('Content-Type: application/json');
$allowedOrigins = [ "https://projet-cinephoria.fr", "https://home-5019114412.app-ionos.space" ];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']); }
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

$salleId = $_GET['salleId'] ?? 0;

$sql = "SELECT idSiege AS id, rang, numero, estPMR, dispo, salle_id FROM sieges WHERE salle_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$salleId]);
$sieges = $stmt->fetchAll();

echo json_encode($sieges);
