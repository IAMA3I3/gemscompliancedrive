<?php

require_once './session.php';
require './functions.php';

// if (!is_logged_in()) {
//     echo 'Please login to download';
//     die();
// }

$id = (int)$_GET['id'] ?? null;
$user_id = (int)$_SESSION['MY_DRIVE_USER']['id'] ?? 0;

$query = "SELECT * FROM my_drive WHERE id = '$id' LIMIT 1"; // user_id = '$user_id' AND
$row = query($query);

if ($row) {

    $row = $row[0];
    $file_path = $row['file_path'];
    $file_name = $row['file_name'];
    header('Content-Disposition: attachment; filename="' . basename($file_name) . '"');
    readfile($file_path);
    exit();
} else {
    echo 'File not found';
}
