<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

$salleId = $_GET['salleId'] ?? 0;

$sql = "SELECT idSiege, rang, numero, estPMR, dispo, salle_id FROM sieges WHERE salle_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$salleId]);
$sieges = $stmt->fetchAll();

echo json_encode($sieges);
