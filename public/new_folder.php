<div class="pop-flex fixed top-0 left-0 w-screen h-screen bg-black/50 justify-center items-center" id="new-folder-container">
    <div class=" relative p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl w-96" id="new-folder-card">
        <i class="fa-solid fa-xmark absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer hover:text-red-500" id="new-folder-close-btn"></i>
        <div class=" text-lg mb-2">New Folder</div>
        <input class=" w-full" type="text" name="" id="new-folder-input" placeholder="Folder name">
        <div class="error-mssg text-red-600 text-xs font-semibold" id="new-folder-error"></div>
        <button class=" bg-blue-500 text-white hover:bg-blue-400 mt-4" onclick="action.createNewFolder(this)">Save</button>
    </div>
</div>