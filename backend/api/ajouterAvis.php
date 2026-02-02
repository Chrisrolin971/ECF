<?php
ini_set('display_errors', 1); ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
$allowedOrigins = [ "https://projet-cinephoria.fr", "https://home-5019114412.app-ionos.space" ];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']); }
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config.php';

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
    $stmt = $pdo->prepare("INSERT INTO avis (seance_id, note, commentaire, dateAvis, idUtilisateur)
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
