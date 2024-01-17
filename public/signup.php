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
    <!--  -->
    <div class=" relative w-full h-screen flex justify-center items-center">
        <div class=" absolute top-4 left-4 text-2xl font-[cursive]">Compliance Drive</div>
        <div class="card w-[95%] md:w-[50%] bg-white">
            <div class=" w-full text-center">
                <img src="./assets/gemsLogo.png" class=" h-20 m-auto" alt="">
                <div class=" text-2xl mb-2">Sign Up</div>
                <form action="" method="post">
                    <div class=" flex flex-col my-1 text-left">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username">
                    </div>
                    <div class=" flex flex-col my-1 text-left">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email">
                    </div>
                    <div class=" flex flex-col my-1 text-left">
                        <label for="pwd">Password</label>
                        <input type="password" name="pwd" id="pwd">
                    </div>
                    <button class=" mt-4 bg-slate-500 text-white hover:bg-slate-400" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
    <!--  -->
</body>
</html>