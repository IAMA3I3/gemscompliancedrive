<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="src/styles.css?v=<?php echo time(); ?>">
    <link rel="shortcut icon" href="assets/gemsIcon.png" type="image/x-icon">
    <title>Compliance Drive</title>
</head>

<body>
    <div class=" w-full bg-slate-600 text-white shadow">
        <div class=" container flex flex-col md:flex-row md:justify-between items-center">
            <div class="">
                <a href="index.php">
                    <img src="assets/gemsLogo(W).png" alt="Brand" class=" h-8 md:h-10 my-2">
                </a>
            </div>
            <div class=" text-white/60 hover:*:text-white divide-x *:rounded-none *:py-0 py-2 md:py-0 active:*:scale-100 active:*:text-blue-600">
                <button class="" id="copy-btn">
                    <i class="fa-solid fa-link"></i>
                    <span>Copy Link</span>
                </button>
                <a href="https://mail.google.com/mail/u/0/#inbox?compose=new" target="_blank" class="btn">
                    <i class="fa-regular fa-share-from-square"></i>
                    <span>Share</span>
                </a>
            </div>
        </div>
    </div>