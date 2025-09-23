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
    // Vérifie que l'avis n'est pas validé
    $check = $pdo->prepare("SELECT valide FROM avis WHERE idAvisAttente = :id");
    $check->execute([':id' => $idAvis]);
    $avis = $check->fetch(PDO::FETCH_ASSOC);

    if (!$avis || $avis['valide'] == 1) {
        echo json_encode(["success" => false, "message" => "Impossible de supprimer un avis validé"]);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM avis WHERE idAvisAttente = :id");
    $stmt->execute([':id' => $idAvis]);

    echo json_encode(["success" => true, "message" => "Avis supprimé avec succès"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
}
