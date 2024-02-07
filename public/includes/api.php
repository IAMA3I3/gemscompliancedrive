<?php

require_once './session.php';

// sleep(1);

require './functions.php';

$info = []; //initialize

$info['success'] = false;
$info['LOGGED_IN'] = is_logged_in();
$info['data_type'] = $_POST['data_type'] ?? ''; // set info data type to the recieving data type

if (!$info['LOGGED_IN'] && ($info['data_type'] != 'user_signup' && $info['data_type'] != 'user_login')) {
    echo json_encode($info);
    die;
}

$info['username'] = $_SESSION['MY_DRIVE_USER']['username'] ?? 'Guest';
$info['folder_tabs'] = [];

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
            $folder_id = $_POST['folder_id'] ?? 0;
            $slug = generate_slug();

            $query = "INSERT INTO my_drive (file_name, file_type, file_size, file_path, user_id, created_at, updated_at, folder_id, slug) VALUES ('$file_name', '$file_type', '$file_size', '$file_path', '$user_id', '$created_at', '$updated_at', '$folder_id', '$slug')";
            query($query);

            $info["success"] = true;
        }
    } else if ($_POST['data_type'] == "get_files") {

        $user_id = $_SESSION['MY_DRIVE_USER']['id'] ?? null;
        $mode = $_POST['mode'];
        $folder_id = $_POST['folder_id'] ?? 0;

        // get folder tabs
        $has_parent = true;
        $num = 0;
        $my_folder_id = $folder_id;

        while ($has_parent && $num < 100) {

            $query = "SELECT * FROM folders WHERE id = '$my_folder_id' LIMIT 1";
            $row = query($query);

            if ($row) {
                $info['folder_tabs'][] = $row[0];
                if ($row[0]['parent'] == 0) {
                    $has_parent = false;
                } else {
                    $my_folder_id = $row[0]['parent'];
                }
            }

            $num++;
        }

        switch ($mode) {
            case 'MYDRIVE':
                $query_folder = "SELECT * FROM folders WHERE trash = 0 AND user_id = '$user_id' AND parent = '$folder_id' ORDER BY id DESC LIMIT 30";
                $query = "SELECT * FROM my_drive WHERE trash = 0 AND user_id = '$user_id' AND folder_id = '$folder_id' ORDER BY id DESC LIMIT 30";
                break;

            case 'SHARED':
                $query_folder = "SELECT * FROM folders WHERE share_mode = 1 AND trash = 0 AND user_id = '$user_id' ORDER BY id DESC LIMIT 30"; // AND parent = '$folder_id'
                $query = "SELECT * FROM my_drive WHERE share_mode = 1 AND trash = 0 AND user_id = '$user_id' AND folder_id = '$folder_id' ORDER BY id DESC LIMIT 30";
                break;

            case 'FAVOURITES':
                $query = "SELECT * FROM my_drive WHERE trash = 0 AND favourite = 1 AND user_id = '$user_id' ORDER BY id DESC LIMIT 30";
                break;

            case 'RECENT':
                $query = "SELECT * FROM my_drive WHERE trash = 0 AND user_id = '$user_id' ORDER BY updated_at DESC LIMIT 30";
                break;

            case 'TRASH':
                $query_folder = "SELECT * FROM folders WHERE trash = 1 AND user_id = '$user_id' ORDER BY id DESC LIMIT 30";  // AND parent = '$folder_id'
                $query = "SELECT * FROM my_drive WHERE trash = 1 AND user_id = '$user_id' ORDER BY id DESC LIMIT 30";
                break;

            default:
                $query = "SELECT * FROM my_drive WHERE trash = 0 AND user_id = '$user_id' AND folder_id = '$folder_id' ORDER BY id DESC LIMIT 30";
                break;
        }

        if (!empty($query_folder)) {
            $rows_folders = query($query_folder);
        }

        if (empty($rows_folders)) {
            $rows_folders = [];
        }

        $rows = query($query);

        if ($rows) {
            foreach ($rows as $key => $row) {
                $rows[$key]['icon'] = $icons[$row['file_type']] ?? '<i class="fa-regular fa-circle-question"></i>';
            }
            $info['rows'] = $rows;
            $info["success"] = true;
        }

        if ($rows_folders) {
            foreach ($rows_folders as $key => $row_folder) {
                $rows_folders[$key]['icon'] = '<i class="fa-regular fa-folder"></i>';
            }
            $info['rows_folders'] = $rows_folders;
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
    } else if ($_POST['data_type'] == "new_folder") {

        $name = addslashes($_POST["name"]);
        $created_at = date("Y-m-d H:i:s");
        $user_id = $_SESSION['MY_DRIVE_USER']['id'] ?? 0;
        $parent = $_POST['folder_id'] ?? 0;
        $slug = generate_slug();

        // validation
        $errors = [];

        if (empty($name))
            $errors['name'] = "Folder name cannot be empty";

        if (empty($errors)) {
            $query = "INSERT INTO folders (name, created_at, user_id, parent, slug) VALUES ('$name', '$created_at', '$user_id', '$parent', '$slug')";

            query($query);

            $info["success"] = true;
        }

        $info['errors'] = $errors;
    } else if ($_POST['data_type'] == "delete_row") {

        // delete from db
        $id = $_POST['id'];
        $file_type = $_POST['file_type'];
        $user_id = $_SESSION['MY_DRIVE_USER']['id'];
        $actually_deleted = false;

        if ($file_type == 'FOLDER') {
            $query_row = "SELECT * FROM folders WHERE id = '$id' AND user_id = '$user_id' LIMIT 1";
            $row = query_row($query_row);

            if ($row['trash']) {

                $query = "DELETE FROM folders WHERE id = '$id' AND user_id = '$user_id' LIMIT 1";
                $actually_deleted = true;
            } else {
                $query = "UPDATE folders SET trash = 1 WHERE id = '$id' AND user_id = '$user_id' LIMIT 1";
            }

            if ($actually_deleted) {
                // delete all files and folders from folder
                $folder_id = $row["id"];
                $sql = "DELETE FROM my_drive WHERE folder_id = '$folder_id' AND user_id = '$user_id' LIMIT 1";
                query($sql);
            }
        } else {

            $query_row = "SELECT * FROM my_drive WHERE id = '$id' AND user_id = '$user_id' LIMIT 1";
            $row = query_row($query_row);

            if ($row) {

                if ($row['trash']) {

                    $query = "DELETE FROM my_drive WHERE id = '$id' AND user_id = '$user_id' LIMIT 1";
                    $actually_deleted = true;
                } else {
                    $query = "UPDATE my_drive SET trash = 1 WHERE id = '$id' AND user_id = '$user_id' LIMIT 1";
                }
            }

            if ($actually_deleted && file_exists($row['file_path'])) {
                // delete actual file
                unlink($row['file_path']);
            }
        }

        query($query);

        $info['success'] = true;
    } else if ($_POST['data_type'] == "add_to_favourite") {

        // check if item is already added to favourite
        $id = addslashes($_POST["id"] ?? 0);
        $user_id = $_SESSION['MY_DRIVE_USER']['id'];

        $query = "SELECT * FROM my_drive WHERE user_id = '$user_id' AND id = '$id' LIMIT 1";

        $row = query($query);

        if ($row) {
            $row = $row[0];
            $favourite = !$row["favourite"];

            $query = "UPDATE my_drive SET favourite = '$favourite' WHERE user_id = '$user_id' AND id = '$id' LIMIT 1";
            query($query);
        }

        $info['success'] = true;
    } else if ($_POST['data_type'] == "restore_row") {

        $id = $_POST['id'];
        $file_type = $_POST['file_type'];
        $user_id = $_SESSION['MY_DRIVE_USER']['id'];

        if ($file_type == 'FOLDER') {
            $query = "UPDATE folders SET trash = 0 WHERE id = '$id' AND user_id = '$user_id' LIMIT 1";
        } else {
            $query = "UPDATE my_drive SET trash = 0 WHERE id = '$id' AND user_id = '$user_id' LIMIT 1";
        }

        query($query);

        $info['success'] = true;
    } else if ($_POST['data_type'] == "preview") {

        $slug = addslashes($_POST["slug"]);
        $user_id = $_SESSION['MY_DRIVE_USER']['id'];
        $type = addslashes($_POST['type']);

        $query = "SELECT * FROM my_drive WHERE slug = '$slug' AND user_id = '$user_id' LIMIT 1";

        $info['row'] = $row = query_row($query);

        if ($row) {
            $row['icon'] = $icons[$row['file_type']] ?? '<i class="fa-regular fa-circle-question"></i>';

            $info['row'] = $row;
            $info["success"] = true;
        }

    }
}

echo json_encode($info); // convert to string
