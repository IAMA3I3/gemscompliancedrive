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
                <div class=" text-2xl mb-2">Login</div>
                <form onsubmit="login.submit(event)" action="" method="post">
                    <div class=" flex flex-col my-1 text-left">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email">
                        <div class="error-mssg text-red-600 text-xs font-semibold" id="email-error"></div>
                    </div>
                    <div class=" flex flex-col my-1 text-left">
                        <label for="pwd">Password</label>
                        <input type="password" name="pwd" id="pwd">
                        <div class="error-mssg text-red-600 text-xs font-semibold" id="pwd-error"></div>
                    </div>
                    <div class=" text-sm font-semibold text-gray-500 tracking-wide mt-2">Don't have an account? <a class=" text-blue-600 hover:underline" href="./signup.php">Sign Up</a></div>
                    <button class=" mt-4 bg-slate-500 text-white hover:bg-slate-400" type="submit" id="login-btn">Login</button>
                </form>
            </div>
        </div>
    </div>
    <!--  -->
    <script src="./src/auth.js"></script>
</body>
</html>