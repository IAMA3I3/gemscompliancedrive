<?php

$con = mysqli_connect('localhost', 'root', '', 'gems_compliance_drive');

$icons = [
    'image/jpeg'=> '<i class="fa-regular fa-image"></i>',
    'image/png'=> '<i class="fa-regular fa-image"></i>',
    'image/gif'=> '<i class="fa-regular fa-image"></i>',
    'image/jpg'=> '<i class="fa-regular fa-image"></i>',
    'image/jfif'=> '<i class="fa-regular fa-image"></i>',
    'image/jif'=> '<i class="fa-regular fa-image"></i>',
    'image/jfi'=> '<i class="fa-regular fa-image"></i>',
    'video/mp4'=> '<i class="fa-solid fa-video"></i>',
    'video/mpg'=> '<i class="fa-solid fa-video"></i>',
    'video/mp2'=> '<i class="fa-solid fa-video"></i>',
    'video/mpeg'=> '<i class="fa-solid fa-video"></i>',
    'video/mpe'=> '<i class="fa-solid fa-video"></i>',
    'video/mpv'=> '<i class="fa-solid fa-video"></i>',
    'video/mov'=> '<i class="fa-solid fa-video"></i>',
];

function query($query)
{

    global $con;

    $result = mysqli_query($con, $query);
    if ($result) {

        if (!is_bool($result) && mysqli_num_rows($result) > 0) {

            $res = [];
            while ($row = mysqli_fetch_assoc($result)) {
                $res[] = $row;
            }
            return $res;
        }
    }

    return false;
}

function is_logged_in()
{

    if (!empty($_SESSION['MY_DRIVE_USER']) && is_array($_SESSION['MY_DRIVE_USER']))
        return true;

    return false;
}