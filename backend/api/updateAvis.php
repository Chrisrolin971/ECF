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
$idAvis = $data['id'] ?? null;

if (!$idAvis) {
    echo json_encode(["success" => false, "message" => "ID manquant"]);
    exit;
}

try {
    $stmt = $pdo->prepare("UPDATE avis SET valide = 1 WHERE idAvisAttente = :id");
    $stmt->execute([':id' => $idAvis]);
    echo json_encode(["success" => true, "message" => "Cet avis a été validé"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
}
