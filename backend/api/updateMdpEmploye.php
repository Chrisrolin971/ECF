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

if (!isset($data['email']) || !isset($data['nouveauMotDePasse'])) {
    echo json_encode(["success" => false, "message" => "Email ou mot de passe manquant"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT idUtilisateurs FROM Utilisateurs WHERE email = :email");
    $stmt->execute([':email' => $data['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["success" => false, "message" => "Utilisateur introuvable"]);
        exit;
    }

    $mdpHash = password_hash($data['nouveauMotDePasse'], PASSWORD_DEFAULT);

    $stmtUpdate = $pdo->prepare("UPDATE Utilisateurs SET mdp = :mdp WHERE idUtilisateurs = :id");
    $stmtUpdate->execute([
        ':mdp' => $mdpHash,
        ':id' => $user['idUtilisateurs']
    ]);

    echo json_encode(["success" => true, "message" => "Mot de passe mis à jour"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
}
