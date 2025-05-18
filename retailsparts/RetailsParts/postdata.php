<?php
header("Access-Control-Allow-Origin: *"); // Προσωρινή λύση για testing

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $subject = $_POST['subject'] ?? '';
    $message = $_POST['message'] ?? '';

    // Βασικός έλεγχος
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Μη έγκυρο email.']);
        exit;
    }

    // Προετοιμασία email
    $to = 'retailsparts@gmail.com';
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $email_body = "Ονοματεπώνυμο: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Τηλέφωνο: $phone\n\n";
    $email_body .= "Μήνυμα:\n$message";

    // Αποστολή email
    $mail_sent = mail($to, $subject, $email_body, $headers);

    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Το μήνυμα στάλθηκε επιτυχώς!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Αποτυχία αποστολής.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Μη επιτρεπτή μέθοδος.']);
}
?>