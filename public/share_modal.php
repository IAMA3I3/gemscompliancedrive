<div class="pop-flex fixed top-0 left-0 w-screen h-screen bg-black/50 justify-center items-center" id="share-modal-container">
    <div class=" relative p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl w-96" id="share-modal-card">
        <i class="fa-solid fa-xmark absolute top-4 right-4 text-2xl text-gray-500 cursor-pointer hover:text-red-500" id="share-close-btn"></i>
        <div class=" text-2xl mb-2 text-center"><i class="fa-solid fa-share-nodes"></i></div>
        <div class=" text-sm font-semibold text-gray-500 mb-2 text-center" id="share-file-name"></div>
        <div class=" *:block">
            <label>
                <input class=" radio" type="radio" value="0" name="share" id="share-mode-0"> <span>Stop Sharing</span>
            </label>
            <label>
                <input class=" radio" type="radio" value="1" name="share" id="share-mode-1"> <span>Share to Specific People</span>
            </label>
            <label>
                <input class=" radio" type="radio" value="2" name="share" id="share-mode-2"> <span>Share to Public</span>
            </label>
        </div>
        <div class=" my-2">
            <label class=" text-sm font-semibold text-gray-500" for="share-input">File Link</label>
            <div class=" relative">
                <input readonly class=" w-full pr-28" type="text" name="" id="share-input" placeholder="">
                <button class=" text-xs font-semibold bg-slate-500 text-white py-1 px-2 absolute right-2 top-[50%] translate-y-[-50%]" id="copy-share-link-btn">
                    <i class="fa-solid fa-copy"></i>
                    <span>Copy Link</span>
                </button>
            </div>
        </div>
        <button class=" bg-blue-500 text-white hover:bg-blue-400 mt-4" onclick="shareAction.shareFile(this)">Save</button>
    </div>
</div>