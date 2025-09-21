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

if (preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    $token = $matches[1];
    try {
        $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
        // ✅ Token valide, on continue
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(["error" => "Token invalide"]);
        exit;
    }
} else {
    http_response_code(401);
    echo json_encode(["error" => "Token manquant"]);
    exit;
}

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
