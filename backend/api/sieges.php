<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

$data = json_decode(file_get_contents("php://input"), true);
$sieges = $data['sieges'] ?? [];

$response = ['success' => false];

if (!empty($sieges)) {
  $stmt = $pdo->prepare("UPDATE sieges SET dispo = 0 WHERE rang = ? AND numero = ? AND salle_id = ?");
  foreach ($sieges as $s) {
    $stmt->execute([$s['rang'], $s['numero'], $s['salle_id']]);
  }
  $response['success'] = true;
}

echo json_encode($response);
