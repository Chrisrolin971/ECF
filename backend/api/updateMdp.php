<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once __DIR__ . '/../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
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
    $decoded = \Firebase\JWT\JWT::decode($token, new \Firebase\JWT\Key($secretKey, 'HS256'));
    $idUtilisateur = $decoded->id;
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["error" => "Token invalide"]);
    exit;
}

if (empty($data['ancienMotDePasse']) || empty($data['nouveauMotDePasse'])) {
    echo json_encode(["success" => false, "message" => "Champs manquants"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT mdp FROM Utilisateurs WHERE idUtilisateurs = :id");
    $stmt->execute([':id' => $idUtilisateur]);
    $motDePasseActuel = $stmt->fetchColumn();

    if (!password_verify($data['ancienMotDePasse'], $motDePasseActuel)) {
        echo json_encode(["success" => false, "message" => "L'ancien mot de passe ne correspond pas"]);
        exit;
    }

    $nouveauHash = password_hash($data['nouveauMotDePasse'], PASSWORD_DEFAULT);
    $updateStmt = $pdo->prepare("UPDATE Utilisateurs SET mdp = :mdp WHERE idUtilisateurs = :id");
    $updateStmt->execute([':mdp' => $nouveauHash, ':id' => $idUtilisateur]);

    echo json_encode(["success" => true, "message" => "Mot de passe mis à jour"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
}
