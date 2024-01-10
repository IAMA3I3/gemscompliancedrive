<?php

include_once './includes/session.php';
include './includes/functions.php';
include './components/header.php';
?>

<!-- copy alert -->
<div class=" alert absolute z-10 w-full top-2 flex justify-center" id="copy-alert">
    <div class=" bg-green-400/50 text-green-900 border-2 border-green-900 shadow-xl py-2 px-5 rounded-full">
        <i class="fa-regular fa-copy"></i>
        <span>Link copied</span>
    </div>
</div>

<!-- email share alert -->
<?php if (isset($_SESSION["send_email"]) && $_SESSION["send_email"] === "success") { ?>
    <div class=" alert absolute z-10 w-full top-2 flex justify-center" id="email-alert">
        <div class=" bg-green-400/50 text-green-900 border-2 border-green-900 shadow-xl py-2 px-5 rounded-full">
            <i class="fa-regular fa-envelope"></i>
            <span>Email Sent</span>
        </div>
    </div>
<?php } ?>

<!-- main -->
<div class=" flex-1 p-4">
    <!-- card -->
    <div class="card h-[75vh] md:h-[80vh] flex">
        <!-- left bar -->
        <div class=" w-[20%] h-full border-r border-gray-400 pr-1 md:pr-2">
            <!--  -->
            <div class=" h-full w-full overflow-x-hidden overflow-y-auto scrollbar *:truncate *:my-1">
                <!--  -->
                <div class=" cursor-pointer py-2 px-4 rounded-md hover:bg-slate-300 active:bg-slate-500 active:text-white">
                    <i class="fa-solid fa-folder-plus w-8"></i>
                    <span>Create Folder</span>
                </div>
                <!--  -->
                <div class=" cursor-pointer py-2 px-4 rounded-md hover:bg-slate-300 active:bg-slate-500 active:text-white" id="left-bar-item" mode="MYDRIVE">
                    <i class="fa-regular fa-file w-8"></i>
                    <span>My Drive</span>
                </div>
                <!--  -->
                <div class=" cursor-pointer py-2 px-4 rounded-md hover:bg-slate-300 active:bg-slate-500 active:text-white" id="left-bar-item" mode="FAVOURITES">
                    <i class="fa-regular fa-folder w-8"></i>
                    <span>Favourites</span>
                </div>
                <!--  -->
                <div class=" cursor-pointer py-2 px-4 rounded-md hover:bg-slate-300 active:bg-slate-500 active:text-white" id="left-bar-item" mode="RECENT">
                    <i class="fa-regular fa-folder w-8"></i>
                    <span>Recent</span>
                </div>
                <!--  -->
                <div class=" cursor-pointer py-2 px-4 rounded-md hover:bg-slate-300 active:bg-slate-500 active:text-white" id="left-bar-item" mode="TRASH">
                    <i class="fa-regular fa-folder w-8"></i>
                    <span>Trash</span>
                </div>
                <!--  -->
            </div>
            <!--  -->
        </div>
        <!--  -->
        <!-- grid image/video -->
        <div class=" h-full w-full p-2 overflow-x-hidden overflow-y-auto scrollbar">
            <!--  -->
            <!--  -->
        </div>
        <!--  -->
    </div>
    <!--  -->
</div>
<!--  -->

<!-- pop up image/video -->
<div class=" absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/40 backdrop-blur-sm" id="popup">
    <!-- close btn -->
    <div class=" absolute z-10 top-4 right-4 text-2xl md:text-3xl text-white/60 hover:text-white active:text-red-500 cursor-pointer" id="close-img">
        <i class="fa-solid fa-xmark"></i>
    </div>
    <!--  -->
    <!-- image/video -->
    <div class=" h-screen md:h-[80vh] w-full md:w-[80vw]">
        <img src="assets/b.png" alt="..." class=" w-full h-full object-contain">
        <video src="assets/video.mp4" class=" w-full h-full object-contain" controls></video>
    </div>
    <!--  -->
    <!-- left btn -->
    <div class=" absolute text-2xl md:text-3xl text-white/60 hover:text-white p-5 cursor-pointer active:text-blue-600 left-4" id="left-btn">
        <i class="fa-solid fa-chevron-left"></i>
    </div>
    <!--  -->
    <!-- right btn -->
    <div class=" absolute text-2xl md:text-3xl text-white/60 hover:text-white p-5 cursor-pointer active:text-blue-600 right-4" id="right-btn">
        <i class="fa-solid fa-chevron-right"></i>
    </div>
    <!--  -->
</div>
<!--  -->

<!-- email share -->
<div class=" absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black/40 backdrop-blur-sm" id="email-share">
    <!-- card -->
    <div class="card bg-white w-[95vw] md:w-[600px]">
        <!--  -->
        <div class=" text-base md:text-lg tracking-wide mb-2"><i class="fa-regular fa-envelope"></i> <span>SHARE</span></div>
        <!--  -->
        <!-- form -->
        <form action="./includes/share/email_share.php" method="post">
            <!--  -->
            <div class=" flex flex-col my-1">
                <label for="rec-email">To:</label>
                <input type="email" name="rec_email" id="rec-email" placeholder="Recipient Email">
            </div>
            <!--  -->
            <div class=" flex flex-col my-1">
                <label for="cc-email">CC:</label>
                <input type="email" name="cc_email" id="cc-email" placeholder="CC Email">
            </div>
            <!--  -->
            <div class=" flex flex-col my-1">
                <label for="subject">Subject:</label>
                <input type="text" name="subject" id="subject">
            </div>
            <!--  -->
            <div class=" flex flex-col my-1">
                <label for="mail-text">Mail Text:</label>
                <textarea name="body" id="mail-text" class="scrollbar"></textarea>
            </div>
            <!--  -->
            <button class=" bg-blue-700 text-white hover:bg-blue-600 mt-2 shadow" type="submit"><i class="fa-regular fa-paper-plane"></i> <span>Send</span></button>
            <!--  -->
        </form>
        <!--  -->
    </div>
    <!--  -->
    <!-- close btn -->
    <div class=" absolute z-10 top-4 right-4 text-2xl md:text-3xl text-white/60 hover:text-white active:text-red-500 cursor-pointer" id="close-email-share">
        <i class="fa-solid fa-xmark"></i>
    </div>
    <!--  -->
</div>

<?php

include './components/footer.php';

unset($_SESSION["send_email"]);
?>