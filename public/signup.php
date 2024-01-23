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
                <!-- <div class="pop bg-red-300 text-red-800 font-semibold p-2 rounded-lg shadow-md">
                    <div class="">Errors</div>
                </div> -->
                <form onsubmit="signup.submit(event)" action="" method="post" id="signup-form">
                    <div class=" flex flex-col my-1 text-left">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" required>
                        <div class="error-mssg text-red-600 text-xs font-semibold" id="username-error"></div>
                    </div>
                    <div class=" flex flex-col my-1 text-left">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required>
                        <div class="error-mssg text-red-600 text-xs font-semibold" id="email-error"></div>
                    </div>
                    <div class=" flex flex-col my-1 text-left">
                        <label for="pwd">Password</label>
                        <input type="password" name="pwd" id="pwd" required>
                        <div class="error-mssg text-red-600 text-xs font-semibold" id="pwd-error"></div>
                    </div>
                    <div class=" flex flex-col my-1 text-left">
                        <label for="confirm-pwd">Confirm Password</label>
                        <input type="password" name="confirm_pwd" id="confirm-pwd" required>
                    </div>
                    <div class=" text-sm font-semibold text-gray-500 tracking-wide mt-2">Already have an account? <a class=" text-blue-600 hover:underline" href="./login.php">Login</a></div>
                    <button class=" mt-4 bg-slate-500 text-white hover:bg-slate-400" type="submit" id="signup-btn">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
    <!--  -->
    <script src="./src/auth.js"></script>
</body>
</html>