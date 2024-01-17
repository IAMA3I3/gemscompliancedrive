<?php

sleep(1);

require './functions.php';

$info = []; //initialize

$info['success'] = false;

if ($_SERVER['REQUEST_METHOD'] == "POST" && !empty($_POST['data_type'])) { // if request method is post & must have data type variable

    $info['data_type'] = $_POST['data_type']; // set info data type to the recieving data type

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
            $user_id = 0;

            $query = "INSERT INTO my_drive (file_name, file_type, file_size, file_path, user_id, created_at, updated_at) VALUES ('$file_name', '$file_type', '$file_size', '$file_path', '$user_id', '$created_at', '$updated_at')";
            query($query);

            $info["success"] = true;
        }
    } else if ($_POST['data_type'] == "get_files") {

        $mode = $_POST['mode'];
        switch ($mode) {
            case 'MYDRIVE':
                $query = "SELECT * FROM my_drive ORDER BY id DESC LIMIT 30";
                break;

            case 'FAVOURITES':
                $query = "SELECT * FROM my_drive WHERE favourite = 1 ORDER BY id DESC LIMIT 30";
                break;

            case 'RECENT':
                $query = "SELECT * FROM my_drive ORDER BY updated_at DESC LIMIT 30";
                break;

            case 'TRASH':
                $query = "SELECT * FROM my_drive WHERE trash = 1 ORDER BY id DESC LIMIT 30";
                break;

            default:
                $query = "SELECT * FROM my_drive ORDER BY id DESC LIMIT 30";
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
    }
}

echo json_encode($info); // convert to string
