<?php
header('Content-Type: application/json');

$allowedOrigins = [
    "https://projet-cinephoria.fr",
    "https://home-5019114412.app-ionos.space"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/config.php';

// Calcul du dernier mercredi
$today = new DateTime();
$lastWednesday = clone $today;
$lastWednesday->modify('last Wednesday');
$lastWednesdayStr = $lastWednesday->format('Y-m-d');

// Nouveautés
$sqlNouveautes = "SELECT idFilms, titre, image_url AS image FROM films WHERE date_sortie >= :lastWednesday";
$stmtN = $pdo->prepare($sqlNouveautes);
$stmtN->execute(['lastWednesday' => $lastWednesdayStr]);
$nouveautes = $stmtN->fetchAll();

// Affiches
$sqlAffiches = "SELECT idFilms, titre, image_url AS image FROM films ORDER BY date_sortie DESC";
$stmtA = $pdo->query($sqlAffiches);
$affiches = $stmtA->fetchAll();

echo json_encode([
    'nouveautes' => $nouveautes,
    'affiches' => $affiches
]);
