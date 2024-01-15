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
                <div class=" is-active cursor-pointer py-2 px-4 rounded-md hover:bg-slate-300" id="left-bar-item" mode="MYDRIVE">
                    <i class="fa-regular fa-hard-drive w-8"></i>
                    <span>My Drive</span>
                </div>
                <!--  -->
                <div class=" cursor-pointer py-2 px-4 rounded-md hover:bg-slate-300" id="left-bar-item" mode="FAVOURITES">
                    <i class="fa-regular fa-star w-8"></i>
                    <span>Favourites</span>
                </div>
                <!--  -->
                <div class=" cursor-pointer py-2 px-4 rounded-md hover:bg-slate-300" id="left-bar-item" mode="RECENT">
                    <i class="fa-regular fa-clock w-8"></i>
                    <span>Recent</span>
                </div>
                <!--  -->
                <div class=" cursor-pointer py-2 px-4 rounded-md hover:bg-slate-300" id="left-bar-item" mode="TRASH">
                    <i class="fa-regular fa-trash-can w-8"></i>
                    <span>Trash</span>
                </div>
                <!--  -->
            </div>
            <!--  -->
        </div>
        <!--  -->
        <!-- main body -->
        <div class=" h-full w-full p-2 overflow-x-hidden overflow-y-auto scrollbar">
            <!--  -->
            <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 *:m-auto">
                <!--  -->
                <div class=" w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300" id="main-body-item">
                    <div class=" py-2 px-4 w-full truncate overflow-hidden z-10">
                        <i class="fa-regular fa-folder"></i>
                        <span class="">Folder</span>
                    </div>
                    <div class=" h-40 overflow-hidden rounded-md">
                        <div class=" h-full flex items-center justify-center text-6xl md:text-9xl">
                            <i class="fa-solid fa-folder"></i>
                        </div>
                    </div>
                </div>
                <!--  -->
                <div class=" w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300" id="main-body-item">
                    <div class=" py-2 px-4 w-full truncate overflow-hidden z-10">
                        <i class="fa-regular fa-image"></i>
                        <span class="">image</span>
                    </div>
                    <div class=" h-40 overflow-hidden rounded-md">
                        <img id="img" src="assets/b.png" alt="" class=" cursor-pointer w-full h-full object-cover transition hover:scale-105">
                    </div>
                </div>
                <!--  -->
                <div class=" w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300" id="main-body-item">
                    <div class=" py-2 px-4 w-full truncate overflow-hidden">
                        <i class="fa-regular fa-image"></i>
                        <span class="">image</span>
                    </div>
                    <div class=" h-40 overflow-hidden rounded-md">
                        <img id="img" src="assets/city.jpg" alt="" class=" cursor-pointer w-full h-full object-cover transition hover:scale-105">
                    </div>
                </div>
                <!--  -->
                <div class=" w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300" id="main-body-item">
                    <div class=" py-2 px-4 w-full truncate overflow-hidden">
                        <i class="fa-regular fa-image"></i>
                        <span class="">image</span>
                    </div>
                    <div class=" h-40 overflow-hidden rounded-md">
                        <img id="img" src="assets/desk-2.jpg" alt="" class=" cursor-pointer w-full h-full object-cover transition hover:scale-105">
                    </div>
                </div>
                <!--  -->
                <div class=" w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300" id="main-body-item">
                    <div class=" py-2 px-4 w-full truncate overflow-hidden">
                        <i class="fa-regular fa-image"></i>
                        <span class="">image</span>
                    </div>
                    <div class=" h-40 overflow-hidden rounded-md">
                        <img id="img" src="assets/images.jpeg" alt="" class=" cursor-pointer w-full h-full object-cover transition hover:scale-105">
                    </div>
                </div>
                <!--  -->
                <div class=" w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300" id="main-body-item">
                    <div class=" py-2 px-4 w-full truncate overflow-hidden">
                        <i class="fa-regular fa-image"></i>
                        <span class="">image</span>
                    </div>
                    <div class=" h-40 overflow-hidden rounded-md">
                        <img id="img" src="assets/b.png" alt="" class=" cursor-pointer w-full h-full object-cover transition hover:scale-105">
                    </div>
                </div>
                <!--  -->
                <div class=" w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300" id="main-body-item">
                    <div class=" py-2 px-4 w-full truncate overflow-hidden">
                        <i class="fa-regular fa-image"></i>
                        <span class="">image</span>
                    </div>
                    <div class=" h-40 overflow-hidden rounded-md">
                        <img id="img" src="assets/city.jpg" alt="" class=" cursor-pointer w-full h-full object-cover transition hover:scale-105">
                    </div>
                </div>
                <!--  -->
                <div class=" w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300" id="main-body-item">
                    <div class=" py-2 px-4 w-full truncate overflow-hidden">
                        <i class="fa-solid fa-video"></i>
                        <span class="">Video</span>
                    </div>
                    <div class=" h-40 overflow-hidden rounded-md">
                        <video id="img" src="assets/video.mp4" class=" cursor-pointer w-full h-full object-cover transition hover:scale-105"></video>
                    </div>
                </div>
                <!--  -->
            </div>
            <!--  -->
        </div>
        <!--  -->
    </div>
    <!--  -->
</div>
<!--  -->


<!-- menu -->
<div class=" absolute shadow-lg bg-white rounded-sm *:py-2 *:px-4 hover:*:bg-slate-500 hover:*:text-white cursor-pointer overflow-hidden" id="menu">
    <div class="">
        <i class=" w-8 fa-solid fa-cloud-arrow-down"></i>
        <span>Download</span>
    </div>
    <div class="">
        <i class=" w-8 fa-regular fa-pen-to-square"></i>
        <span>Edit</span>
    </div>
    <div class="">
        <i class=" w-8 fa-regular fa-folder-open"></i>
        <span>Move</span>
    </div>
    <div class="">
        <i class=" w-8 fa-regular fa-trash-can"></i>
        <span>Delete</span>
    </div>
    <div class="">
        <i class=" w-8 fa-solid fa-share-nodes"></i>
        <span>Share</span>
    </div>
    <div class="">
        <i class=" w-8 fa-regular fa-star"></i>
        <span>Add to favourites</span>
    </div>
</div>

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

<?php

include './components/footer.php';
?>