<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !isset($data['pseudo'])) {
    echo json_encode(["success" => false, "message" => "Email ou pseudo manquant"]);
    exit;
}

try {
    // si utilisateur existe
    $stmtCheck = $pdo->prepare("SELECT idUtilisateur FROM Utilisateurs WHERE email = :email OR pseudo = :pseudo");
    $stmtCheck->execute([
        ':email' => $data['email'],
        ':pseudo' => $data['pseudo']
    ]);
    $user = $stmtCheck->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(["success" => false, "message" => "Utilisateur introuvable"]);
        exit;
    }

    // Mise à jour
    $mdpHash = password_hash($data['motDePasse'], PASSWORD_DEFAULT);

    $stmtUpdate = $pdo->prepare("UPDATE Utilisateurs SET nom = :nom, prenom = :prenom, pseudo = :pseudo, email = :email, mdp = :mdp WHERE idUtilisateur = :id");
    $stmtUpdate->execute([
        ':nom' => $data['nom'],
        ':prenom' => $data['prenom'],
        ':pseudo' => $data['pseudo'],
        ':email' => $data['email'],
        ':mdp' => $mdpHash,
        ':id' => $user['idUtilisateur']
    ]);

    echo json_encode(["success" => true, "message" => "Utilisateur mis à jour avec succès"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
}
