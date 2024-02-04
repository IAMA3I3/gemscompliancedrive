<div class=" is-active h-full w-full p-2 pt-0 overflow-x-hidden overflow-y-auto scrollbar" id="sub-screen" mode="MYDRIVE">
    <!--  -->
    <div class=" pl-4 flex items-center justify-between mb-2">
        <div class=" flex items-center gap-4">
            <div class=" text-2xl mb-2 hover:text-blue-600 cursor-pointer active:text-blue-800" onclick="changeFolder(0)">My Drive</div>
            <!--  -->
            <div class="pop relative" id="extended-folders">
                <div class="  cursor-pointer hover:text-blue-600 active:text-blue-800">
                    <i class="fa-solid fa-angle-right"></i>
                    <span>...</span>
                </div>
                <div class=" pop absolute rounded-sm overflow-hidden bg-white shadow-md w-32 mt-2" id="drop-down-folder-tabs">
                    <!--  -->
                </div>
            </div>
            <!--  -->
            <div class=" flex items-center gap-4" id="folder-tabs">
                <!--  -->
            </div>
        </div>
        <div class=" flex items-center gap-4">
            <div class=" text-sm font-semibold text-gray-500" id="username">User</div>
            <a class=" uppercase text-sm font-semibold tracking-wide py-1 px-4 rounded-full bg-slate-400 text-white hover:bg-slate-500 active:scale-95" href="#" id="logout-btn">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <span>Logout</span>
            </a>
        </div>
    </div>
    <!--  -->
    <div class=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 *:m-auto" id="my-drive">
        <!--  -->
        <!--  -->
    </div>
    <!--  -->
</div>