<?php
header('Content-Type: application/json');
$allowedOrigins = [ "https://projet-cinephoria.fr", "https://home-5019114412.app-ionos.space" ];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']); }
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$stmt = $pdo->query("SELECT
       a.idAvisAttente AS id,
       a.Note AS note,
       a.commentaire,
       a.dateAvis AS date,
       u.pseudo AS pseudo,
       f.titre AS titre,
       u.pseudo AS pseudo
     FROM avis a
     JOIN seance s ON a.seance_id = s.idSeance
     JOIN utilisateurs u ON a.idUtilisateur = u.idUtilisateurs
     JOIN films f ON s.films_id = f.idFilms
     WHERE a.valide = 0;
   ");


$avis = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($avis);
