<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $rec_email = $_POST["rec_email"];
    $cc_email = $_POST["cc_email"];
    $subject = $_POST["subject"];
    $body = $_POST["body"];

    $headers = "From: abdulazeezsalami19@gmail.com";
    if (!empty($cc_email)) {
        $headers .= "\r\nCc: $cc_email";
    }

    mail($rec_email, $subject, $body, $headers);

    include_once "../session.php";
    $_SESSION["send_email"] = "success";
    header("Location: ../../index.php");

    die();
} else {
    header("Location: ../../index.php");
    die();
}
