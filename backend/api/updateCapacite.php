<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

$data = json_decode(file_get_contents("php://input"), true);
$salleId = $data['salleId'] ?? null;
$nbPlaces = $data['nbPlaces'] ?? 0;

if ($salleId && $nbPlaces > 0) {
  $sql = "UPDATE salles SET capacite = capacite - :nbPlaces WHERE idSalles = :salleId";
  $stmt = $pdo->prepare($sql);
  $stmt->execute([
    ':nbPlaces' => $nbPlaces,
    ':salleId' => $salleId
  ]);
  echo json_encode(["success"  => true]);
} else {
  echo json_encode(["success"  => false, "error" => 'Paramètres invalides']);
}
