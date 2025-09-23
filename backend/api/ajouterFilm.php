<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/config.php';

$data = json_decode(file_get_contents("php://input"), true);

try {
    $stmt = $pdo->prepare("INSERT INTO films (titre, duree, genre, description, note, date_sortie, image_url, coeur, pegi)
        VALUES (:titre, :duree, :genre, :description, :note, :date_sortie, :image_url, :coeur, :pegi)");

    $stmt->execute([
        ':titre' => $data['titre'],
        ':duree' => $data['duree'],
        ':genre' => $data['genre'],
        ':description' => $data['description'],
        ':note' => $data['note'],
        ':date_sortie' => $data['date_sortie'],
        ':image_url' => $data['image_url'],
        ':coeur' => $data['coeur'],
        ':pegi' => $data['pegi'] ?? null
    ]);

    echo json_encode(["success" => true, "message" => "Film ajouté"]);
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
}
