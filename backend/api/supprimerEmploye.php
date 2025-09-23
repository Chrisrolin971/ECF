<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once __DIR__ . '/../config/config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'])) {
    echo json_encode(["success" => false, "message" => "Email manquant"]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM Utilisateurs WHERE email = ?");
    $stmt->execute([$data['email']]);

    echo json_encode(["success" => true, "message" => "Employé supprimé"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
}
