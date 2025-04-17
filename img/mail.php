<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';

    if (!empty($email)) {
        $formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe6efyJLSk8-nImKLJCs04BF4UT1xUy61n6xjgto_sNyMm_qw/formResponse';

        // Champ "mail" → entry.68892649
        $postData = http_build_query([
            'entry.68892649' => $email
        ]);

        $options = [
            'http' => [
                'method'  => 'POST',
                'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
                'content' => $postData
            ],
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false
            ]
        ];

        try {
            $context = stream_context_create($options);
            $result = file_get_contents($formUrl, false, $context);

            if ($result !== false) {
                echo json_encode(['success' => true, 'message' => 'Merci ! Votre email a bien été enregistré.']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi du formulaire.']);
            }
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Erreur : ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Email manquant.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Requête invalide.']);
}
?>
    