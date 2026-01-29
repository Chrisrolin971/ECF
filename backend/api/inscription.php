<?php
header('Content-Type: application/json');
$allowedOrigins = [ "https://projet-cinephoria.fr", "https://home-5019114412.app-ionos.space" ];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']); }
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/../config/config.php';

// reponse a la requette preflight HTTP
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/config.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data['nom']) && !empty($data['prenom']) &&
    !empty($data['pseudo']) && !empty($data['email']) && !empty($data['motDePasse']))
  {
      // Vérification si le pseudo existe déjà
              $sqlCheck = "SELECT * FROM Utilisateurs WHERE pseudo = :pseudo";
              $stmtCheck = $pdo->prepare($sqlCheck);
              $stmtCheck->execute([':pseudo' => $data['pseudo']]);
              $pseudoExiste = $stmtCheck->fetchColumn() > 0;

              if ($pseudoExiste) {
                echo json_encode([
                "success" => false,
                "message" => "Ce pseudo est déjà utilisé"]);
                exit;
              }

              // Vérification de l'email
              $sqlEmail = "SELECT * FROM Utilisateurs WHERE email = :email";
              $stmtEmail = $pdo->prepare($sqlEmail);
              $stmtEmail->execute([':email' => $data['email']]);
              $emailExiste = $stmtEmail->fetchColumn() > 0;

              if ($emailExiste) {
                echo json_encode(["message" => "Un compte existe déjà avec cette adresse mail"]);
              exit;
              }

    $mdpHash = password_hash($data['motDePasse'], PASSWORD_DEFAULT);

try {
    $sql = "INSERT INTO Utilisateurs (nom, prenom, pseudo, role, email, mdp)
            VALUES (:nom, :prenom, :pseudo, :role, :email, :mdp)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':nom' => $data['nom'],
        ':prenom' => $data['prenom'],
        ':pseudo' => $data['pseudo'],
        ':email' => $data['email'],
        ':mdp' => $mdpHash,
        'role' => $data['role']
    ]);

    echo json_encode([
          "success" => true,
          "message" => "Inscription réussie"
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Erreur lors de l'inscription : " . $e->getMessage()
    ]);
}
}
?>

