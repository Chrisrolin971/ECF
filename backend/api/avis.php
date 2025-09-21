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

$stmt = $pdo->query("SELECT
       a.idAvis AS id,
       a.Note AS note,
       a.commentaire,
       a.dateAvis AS date,
       f.titre AS titre,
       f.note AS notes,
       u.pseudo AS pseudo
     FROM avis a
     JOIN films f ON a.idFilms = f.idFilms
     JOIN utilisateurs u ON a.idUtilisateur = u.idUtilisateurs
   ");

$avis = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($avis);
