<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://projet-cinephoria.fr');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['email']) && !empty($data['motDePasse'])) {
    $sql = "SELECT * FROM Utilisateurs WHERE email = :email";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':email' => $data['email']]);
    $user = $stmt->fetch();

    if ($user && password_verify($data['motDePasse'], $user['mdp'])) {
        $secretKey = 'token';
        $payload = [
            'id' => $user['idUtilisateurs'],
            'pseudo' => $user['pseudo'],
            'role' => $user['role'],
            'exp' => time() + 3600 // expire dans 1h
        ];
        $jwt = JWT::encode($payload, $secretKey, 'HS256');
        echo json_encode([
                    "message" => "Connexion réussie",
                    "success" => true,
                    "token" => $jwt
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["message" => "Email ou mot de passe incorrect"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Champs requis manquants"]);
}
?>
