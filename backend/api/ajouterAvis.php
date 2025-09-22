<?php
// 🔧 CORS — doit être tout en haut
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:4200");
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

// 🔍 Debugging (logs côté serveur)
error_log("Fichier ajouterAvis.php appelé");
error_log("Méthode : " . $_SERVER['REQUEST_METHOD']);

// 🔐 JWT
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? '';
$secretKey = 'token';

if (!preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    error_log("Token manquant");
    http_response_code(401);
    echo json_encode(["error" => "Token manquant"]);
    exit;
}

$token = $matches[1];
try {
    $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
    $userId = $decoded->id;
    error_log("Token valide, utilisateur ID : $userId");
} catch (Exception $e) {
    error_log("Token invalide : " . $e->getMessage());
    http_response_code(401);
    echo json_encode(["error" => "Token invalide"]);
    exit;
}

// 📥 Données reçues
$input = json_decode(file_get_contents('php://input'), true);
error_log("Données reçues : " . json_encode($input));

$seance_id = $input['seance_id'] ?? null;
$note = $input['note'] ?? null;
$commentaire = $input['commentaire'] ?? '';

if (!$seance_id || !$note || !is_numeric($note)) {
    http_response_code(400);
    echo json_encode(["error" => "Données invalides"]);
    exit;
}


// 🗃️ Insertion en base
try {
    $stmt = $pdo->prepare("INSERT INTO avis (seance_id, Note, commentaire, dateAvis, idUtilisateur)
                           VALUES (:seance_id, :note, :commentaire, NOW(), :userId)");
    $stmt->execute([
        ':seance_id' => $seance_id,
        ':note' => $note,
        ':commentaire' => $commentaire,
        ':userId' => $userId
    ]);

    error_log("Avis enregistré avec succès");
    echo json_encode(["success" => true, "message" => "Avis en attente enregistré"]);
} catch (PDOException $e) {
    error_log("Erreur SQL : " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur lors de l'enregistrement"]);
}
