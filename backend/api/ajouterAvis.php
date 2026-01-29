<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
$allowedOrigins = [ "https://projet-cinephoria.fr", "https://home-5019114412.app-ionos.space" ];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']); }
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Max-Age: 86400");
    http_response_code(200);
    exit;
}

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

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
    $userId = $decoded->id;
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["error" => "Token invalide"]);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$seance_id = $input['seance_id'] ?? null;
$note = $input['note'] ?? null;
$commentaire = $input['commentaire'] ?? '';

if (!$seance_id || !$note || !is_numeric($note)) {
    http_response_code(400);
    echo json_encode(["error" => "Données invalides"]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO avis (seance_id, Note, commentaire, dateAvis, idUtilisateur)
                           VALUES (:seance_id, :note, :commentaire, NOW(), :userId)");
    $stmt->execute([
        ':seance_id' => $seance_id,
        ':note' => $note,
        ':commentaire' => $commentaire,
        ':userId' => $userId
    ]);
    echo json_encode(["success" => true, "message" => "Avis en attente enregistré"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur lors de l'enregistrement"]);
}
