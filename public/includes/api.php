<?php

require_once './session.php';

// sleep(1);

require './functions.php';

$info = []; //initialize

$info['success'] = false;
$info['LOGGED_IN'] = is_logged_in();
$info['username'] = $_SESSION['MY_DRIVE_USER']['username'] ?? 'User';
$info['data_type'] = $_POST['data_type'] ?? ''; // set info data type to the recieving data type

if (!$info['LOGGED_IN'] && ($info['data_type'] != 'user_signup' && $info['data_type'] != 'user_login')) {
    echo json_encode($info);
    die;
}

function is_logged_in()
{

    if (!empty($_SESSION['MY_DRIVE_USER']) && is_array($_SESSION['MY_DRIVE_USER']))
        return true;

    return false;
}

if ($_SERVER['REQUEST_METHOD'] == "POST" && !empty($_POST['data_type'])) { // if request method is post & must have data type variable

    if ($_POST['data_type'] == "upload_files") { // check if the data type is upload files as set in JS upload function

        $folder = 'uploads/'; // folder

        if (!file_exists($folder)) { // check if the folder doesn't exist
            mkdir($folder, 0777, true); // create the folder, give the edit permission, recursive incase of multiple folders
            file_put_contents($folder . '.HTACCESS', 'Options -Indexes'); // put HTACCESS file in the folder to restrict user access
        }

        foreach ($_FILES as $key => $file) { // loop through files

            $destination = $folder . time() . $file['name']; // give file unique name and put inside the folder
            if (file_exists($destination)) // if the destination exists
                $destination = $folder . time() . rand(0, 9999) . $file['name']; // add random number

            move_uploaded_file($file['tmp_name'], $destination); // upload the file (filename, destination)

            // save to database
            $file_name = $file['name'];
            $file_type = $file['type'];
            $file_path = $destination;
            $file_size = filesize($destination);
            $created_at = date("Y-m-d H:i:s");
            $updated_at = date("Y-m-d H:i:s");
            $user_id = $_SESSION['MY_DRIVE_USER']['id'] ?? 0;

            $query = "INSERT INTO my_drive (file_name, file_type, file_size, file_path, user_id, created_at, updated_at) VALUES ('$file_name', '$file_type', '$file_size', '$file_path', '$user_id', '$created_at', '$updated_at')";
            query($query);

            $info["success"] = true;
        }
    } else if ($_POST['data_type'] == "get_files") {

        $user_id = $_SESSION['MY_DRIVE_USER']['id'] ?? null;
        $mode = $_POST['mode'];
        switch ($mode) {
            case 'MYDRIVE':
                $query = "SELECT * FROM my_drive WHERE user_id = '$user_id' ORDER BY id DESC LIMIT 30";
                break;

            case 'FAVOURITES':
                $query = "SELECT * FROM my_drive WHERE favourite = 1 AND user_id = '$user_id' ORDER BY id DESC LIMIT 30";
                break;

            case 'RECENT':
                $query = "SELECT * FROM my_drive WHERE user_id = '$user_id' ORDER BY updated_at DESC LIMIT 30";
                break;

            case 'TRASH':
                $query = "SELECT * FROM my_drive WHERE trash = 1 AND user_id = '$user_id' ORDER BY id DESC LIMIT 30";
                break;

            default:
                $query = "SELECT * FROM my_drive WHERE user_id = '$user_id' ORDER BY id DESC LIMIT 30";
                break;
        }

        $rows = query($query);

        if ($rows) {
            foreach ($rows as $key => $row) {
                $rows[$key]['icon'] = $icons[$row['file_type']] ?? '<i class="fa-regular fa-circle-question"></i>';
            }
            $info['rows'] = $rows;
            $info["success"] = true;
        }
    } else if ($_POST['data_type'] == "user_signup") {

        $username = addslashes($_POST["username"]);
        $email = addslashes($_POST["email"]);
        $pwd = addslashes($_POST["pwd"]);
        $confirm_pwd = addslashes($_POST["confirm_pwd"]);
        $created_at = date("Y-m-d H:i:s");
        $updated_at = date("Y-m-d H:i:s");

        // validate data
        $errors = [];

        if (empty($username) || !preg_match("/^[a-zA-Z ]+$/", $username))
            $errors['username'] = "Invalid username";

        if (query("SELECT id FROM users WHERE email = '$email' LIMIT 1"))
            $errors['email'] = "Email already registered";

        if (!filter_var($email, FILTER_VALIDATE_EMAIL))
            $errors['email'] = "Invalid email address";

        if (strlen($pwd) < 4)
            $errors["pwd"] = "Password must be 4 characters or more";

        if ($pwd !== $confirm_pwd)
            $errors["pwd"] = "Confirm passord must match password";

        if (empty($errors)) {

            $pwd = password_hash($pwd, PASSWORD_DEFAULT);


            $query = "INSERT INTO users (username, email, pwd, created_at, updated_at) VALUES ('$username', '$email', '$pwd', '$created_at', '$updated_at')";

            query($query);
            $info['success'] = true;
        }

        $info['errors'] = $errors;
    } else if ($_POST['data_type'] == "user_login") {

        $email = addslashes($_POST["email"]);
        $pwd = addslashes($_POST["pwd"]);

        // validate data
        $errors = [];

        $row = query("SELECT * FROM users WHERE email = '$email' LIMIT 1");

        if (!empty($row)) {

            $row = $row[0];

            if (password_verify($pwd, $row["pwd"])) {

                $info['success'] = true;
                $_SESSION['MY_DRIVE_USER'] = $row;
            }
        }

        $info['errors']['email'] = "Wrong email or password";
    } else if ($_POST['data_type'] == "user_logout") {

        if (isset($_SESSION['MY_DRIVE_USER'])) {
            unset($_SESSION['MY_DRIVE_USER']);
        }

        $info['success'] = true;
    }
}

echo json_encode($info); // convert to string
