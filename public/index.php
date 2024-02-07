<?php

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
            <div class="h-full md:h-[65%] w-full overflow-x-hidden overflow-y-auto scrollbar *:truncate *:my-1 first:*:mb-8">
                <!--  -->
                <div class=" cursor-pointer py-2 px-6 rounded-full bg-blue-500 text-white hover:bg-blue-400 active:scale-95 active:text-white shadow-lg" id="create-folder-btn">
                    <i class="fa-solid fa-folder-plus w-8"></i>
                    <span>Create Folder</span>
                </div>
                <!--  -->
                <div class=" is-active cursor-pointer py-2 px-4 rounded-md hover:bg-slate-300" id="left-bar-item" mode="MYDRIVE">
                    <i class="fa-regular fa-hard-drive w-8"></i>
                    <span>My Drive</span>
                </div>
                <!--  -->
                <div class=" cursor-pointer py-2 px-4 rounded-md hover:bg-slate-300" id="left-bar-item" mode="SHARED">
                    <i class="fa-solid fa-share-nodes w-8"></i>
                    <span>Shared</span>
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
            <!-- upload -->
            <div class=" hidden md:inline-block h-[35%]">
                <label class=" rounded-xl h-full flex justify-center items-center flex-col text-center p-4 border cursor-pointer" id="drop-zone">
                    <i class="fa-solid fa-cloud-arrow-up text-2xl mb-2"></i>
                    <span>Drag and drop files here or click to upload</span>
                    <input onchange="uploadFiles(this.files)" type="file" class=" hidden" name="" id="upload-input" multiple>
                    <!-- progress bar -->
                    <div class=" w-full mt-2" id="prog-container">
                        <div class=" w-full h-2 rounded-full bg-gray-400" id="prog">
                            <div class=" h-full rounded-full bg-blue-500" id="prog-thumb"></div>
                        </div>
                        <div class="" id="prog-per">0%</div>
                    </div>
                    <!--  -->
                </label>
            </div>
            <!--  -->
            <!--  -->
        </div>
        <!--  -->
        <!-- main body -->
        <?php
        include './my_drive.php';
        include './shared.php';
        include './favourite.php';
        include './recent.php';
        include './trash.php';
        ?>
        <!--  -->
    </div>
    <!--  -->
</div>
<!--  -->


<!-- menu -->
<div class=" absolute shadow-lg bg-white rounded-sm *:py-2 *:px-4 hover:*:bg-slate-500 hover:*:text-white cursor-pointer overflow-hidden *:text-nowrap min-w-44" id="menu">
    <a href="#" class=" hide-from-trash block" id="menu-preview">
        <i class=" w-8 fa-solid fa-eye"></i>
        <span>Preview</span>
    </a>
    <a href="#" class=" hide-from-trash block" id="menu-download">
        <i class=" w-8 fa-solid fa-cloud-arrow-down"></i>
        <span>Download</span>
    </a>
    <div class=" hide-from-trash">
        <i class=" w-8 fa-regular fa-pen-to-square"></i>
        <span>Edit</span>
    </div>
    <div class=" hide-from-trash">
        <i class=" w-8 fa-regular fa-folder-open"></i>
        <span>Move</span>
    </div>
    <div class="" id="menu-delete">
        <i class=" w-8 fa-regular fa-trash-can"></i>
        <span id="menu-delete-text">Delete</span>
    </div>
    <div class="" id="menu-restore">
        <!-- <i class=" w-8 fa-solid fa-trash-arrow-up"></i> -->
        <i class=" w-8 fa-solid fa-rotate-left"></i>
        <span>Restore</span>
    </div>
    <div class=" hide-from-trash" id="menu-share">
        <i class=" w-8 fa-solid fa-share-nodes"></i>
        <span>Share</span>
    </div>
    <div class=" hide-from-trash" id="menu-fav">
        <i class=" w-8 fa-regular fa-star" id="star-outline"></i>
        <i class=" w-8 fa-solid fa-star" id="star-fill"></i>
        <span id="fav-menu">Add to favourites</span>
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

<!-- pop up new folder -->
<?php include './new_folder.php'; ?>

<!-- pop up share -->
<?php include './share_modal.php'; ?>

<!-- pop up logout -->
<?php include './logout.php' ?>

<?php

include './components/footer.php';
?>

<script src="src/script.js"></script>