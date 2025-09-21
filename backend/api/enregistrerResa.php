<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';
$secretKey = 'token';

if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    http_response_code(401);
    echo json_encode(["error" => "Token manquant"]);
    exit;
}

$token = $matches[1];
try {
    $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["error" => "Token invalide"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$utilisateurId = $data['utilisateur_id'] ?? null;
$seanceId = $data['seance_id'] ?? null;
$siegeId = $data['siege_id'] ?? [];
error_log(print_r($siegeId, true));


if (!$utilisateurId || !$seanceId || empty($siegeId)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Données manquantes"]);
    exit;
}

try {
    $pdo->beginTransaction();

    // 1. Insérer la réservation
    $stmt = $pdo->prepare("INSERT INTO reservations (utilisateur_id, seance_id) VALUES (:utilisateur_id, :seance_id)");
    $stmt->execute([
        ':utilisateur_id' => $utilisateurId,
        ':seance_id' => $seanceId
    ]);

    // 2. Récupérer l'ID généré
    $reservationId = $pdo->lastInsertId();

    // 3. Insérer les sièges liés à cette réservation dans la table reservation_sieges
    $stmtSiege = $pdo->prepare("INSERT INTO reservation_sieges (reservation_id, siege_id) VALUES (:reservation_id, :siege_id)");

    foreach ($siegeId as $sid) {
        $stmtSiege->execute([
            ':reservation_id' => $reservationId,
            ':siege_id' => $sid
        ]);
        error_log("Insertion siege_id: " . $sid);
        error_log("siegeIds reçus : " . print_r($sid, true));

    }
    $pdo->commit();
    echo json_encode(["success" => true]);
} catch (Exception $e) {
      $pdo->rollBack();
      http_response_code(500);
      echo json_encode(["success" => false, "error" => "Erreur lors de l'enregistrement"]);
}
