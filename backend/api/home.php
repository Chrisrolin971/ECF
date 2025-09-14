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

// Calcul du dernier mercredi
$today = new DateTime();
$lastWednesday = clone $today;
$lastWednesday->modify('last Wednesday');
$lastWednesdayStr = $lastWednesday->format('Y-m-d');

// Films sortis dans les 30 derniers jours = nouveauté
$sqlNouveautes = "SELECT idFilms, titre, image_url AS image FROM films WHERE date_sortie >= :lastWednesday";
$stmtN = $pdo->prepare($sqlNouveautes);
$stmtN->execute(['lastWednesday' => $lastWednesdayStr]);
$nouveautes = $stmtN->fetchAll();

// Tous les films à l'affiche (on peut filtrer par date si besoin)
$sqlAffiches = "SELECT idFilms, titre, image_url AS image FROM films ORDER BY date_sortie DESC";
$stmtA = $pdo->query($sqlAffiches);
$affiches = $stmtA->fetchAll();

echo json_encode([
  'nouveautes' => $nouveautes,
  'affiches' => $affiches
]);
