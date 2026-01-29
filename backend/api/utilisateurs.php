<?php
header('Content-Type: application/json; charset=utf-8');
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
try {
  $stmt = $pdo->query("SELECT
  idUtilisateurs AS id,
  nom,
  prenom,
  pseudo,
  email,
  mdp AS motDePasse,
  role
  FROM utilisateurs");

  $utilisateurs = $stmt->fetchAll(PDO::FETCH_ASSOC);

  echo json_encode($utilisateurs);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Erreur lors du chargement des utilisateurs']);
}
