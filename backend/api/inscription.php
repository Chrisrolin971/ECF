<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

// reponse a la requette preflight HTTP
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['nom']) && !empty($data['prenom']) &&
    !empty($data['pseudo']) && !empty($data['email']) && !empty($data['motDePasse']))
  {

    $mdpHash = password_hash($data['motDePasse'], PASSWORD_DEFAULT);

    $sql = "INSERT IGNORE INTO Utilisateurs (nom, prenom, pseudo, role, email, mdp)
            VALUES (:nom, :prenom, :pseudo, :role, :email, :mdp)";
    $stmt = $pdo->prepare($sql);

    $success = $stmt->execute([
        ':nom' => $data['nom'],
        ':prenom' => $data['prenom'],
        ':pseudo' => $data['pseudo'],
        ':role' => 0,
        ':email' => $data['email'],
        ':mdp' => $mdpHash
    ]);

    if ($stmt->execute()) {
    echo json_encode(["message" => "Inscription réussie"]);
    } else {
    echo json_encode(["message" => "Erreur lors de l'inscription"]);
    }
  }
?>

