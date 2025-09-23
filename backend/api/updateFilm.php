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

$sql = "UPDATE films SET
            titre = :titre,
            duree = :duree,
            description = :description,
            coeur = :coeur,
            date_sortie = :date_sortie,
            genre = :genre,
            image_url = :image_url,
            pegi = :pegi,
            note = :note
        WHERE idFilms = :idFilms";

$stmt = $pdo->prepare($sql);
$success = $stmt->execute([
    'titre' => $data['titre'],
    'duree' => $data['duree'],
    'description' => $data['description'],
    'coeur' => $data['coeur'],
    'date_sortie' => $data['date_sortie'],
    'genre' => $data['genre'],
    'image_url' => $data['image_url'],
    'pegi' => $data['pegi'],
    'note' => $data['note'],
    'idFilms' => $data['id']
]);

echo json_encode([
    'success' => $success,
    'message' => $success ? 'Film mis à jour avec succès' : 'Échec de la mise à jour'
]);
