<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:4200');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$ville = $_GET['ville'] ?? '';

if ($ville) {
    $sql = "SELECT f.idFilms AS id, f.titre, f.description, f.note, f.genre AS categorie, f.image_url AS image, f.coeur, f.date_sortie, f.pegi AS pegi
            FROM films f
            JOIN FilmCinema fc ON f.idFilms = fc.idFilm
            JOIN Cinema c ON fc.idCinema = c.idCinema
            WHERE c.villeCinema = :ville";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([':ville' => $ville]);
    $films = $stmt->fetchAll();

    echo json_encode($films);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Paramètre 'ville' manquant"]);
}
?>
