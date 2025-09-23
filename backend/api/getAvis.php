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

if (!isset($_GET['id'])) {
    echo json_encode(['error' => 'Paramètre idFilm manquant']);
    exit;
}

$id = intval($_GET['id']);

$sql = "SELECT
          a.idAvisAttente AS id,
          a.Note AS note,
          a.commentaire,
          a.dateAvis AS date,
          u.pseudo AS pseudo
        FROM avis a
        JOIN seance s ON a.seance_id = s.idSeance
        JOIN utilisateurs u ON a.idUtilisateur = u.idUtilisateurs
        JOIN films f ON s.films_id = f.idFilms
        WHERE a.valide = 1 AND f.idFilms = :id";

$stmt = $pdo->prepare($sql);
$stmt->execute(['id' => $id]);

$avis = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($avis);
