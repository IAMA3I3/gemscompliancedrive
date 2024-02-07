<div class="pop-flex fixed top-0 left-0 w-screen h-screen bg-black/50 justify-center items-center" id="share-modal-container">
    <div class=" relative p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl w-96" id="share-modal-card">
        <i class="fa-solid fa-xmark absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer hover:text-red-500" id="share-close-btn"></i>
        <div class=" text-2xl mb-2 text-center"><i class="fa-solid fa-share-nodes"></i></div>
        <div class=" *:block">
            <label>
                <input type="radio" value="0" name="share" id=""> <span>Stop Sharing</span>
            </label>
            <label>
                <input type="radio" value="1" name="share" id=""> <span>Share to Specific People</span>
            </label>
            <label>
                <input type="radio" value="2" name="share" id=""> <span>Share to Public</span>
            </label>
        </div>
        <div class=" my-2">
            <label class=" text-sm font-semibold text-gray-500" for="share-input">File Link</label>
            <input class=" w-full" type="text" name="" id="share-input" placeholder="">
        </div>
        <button class=" bg-blue-500 text-white hover:bg-blue-400 mt-4" onclick="shareAction.shareFile(this)">Save</button>
    </div>
</div>