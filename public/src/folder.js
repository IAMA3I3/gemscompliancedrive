var LOGGED_IN = false
var USERNAME = false
var FOLDER_ID = 0


var RIGHT_CLICKED = {}


const infoAlert = document.querySelector('#info-alert')
const infoText = document.querySelector('#info-text')
const showInfoAlert = (info) => {
    infoText.innerHTML = info
    infoAlert.classList.add('show')
    setTimeout(() => infoAlert.classList.remove('show'), 5000)
}


// pop up images/videos
var images = document.querySelectorAll('#img')
var pop = document.querySelector('#popup')
var popImage = document.querySelector('#popup img')
var popVideo = document.querySelector('#popup video')
var closeImgBtn = document.querySelector('#popup #close-img')
var leftBtn = document.querySelector('#popup #left-btn')
var rightBtn = document.querySelector('#popup #right-btn')

// console.log(images)



const isImage = ['gif', 'jpg', 'jpeg', 'png', 'jfif', 'jif', 'jfi']
const isVideo = ['mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'mp4', 'mov']
let displayImages = []
let position = 0

const assignSrc = (e) => {
    console.log(e)
    if (isImage.includes(e.split('.').pop().toLowerCase())) {
        pop.classList.add('show')
        popImage.style.display = "inline-block"
        popVideo.style.display = "none"
        popImage.src = 'includes/' + e
    } else if (isVideo.includes(e.split('.').pop().toLowerCase())) {
        pop.classList.add('show')
        popImage.style.display = "none"
        popVideo.style.display = "inline-block"
        popVideo.src = 'includes/' + e
    } else {
        // console.log("Not valid")
        pop.classList.add('show')
        popImage.style.display = "inline-block"
        popVideo.style.display = "none"
        popImage.src = 'assets/q.png'
    }
}

// images.forEach((image, index) => {
//     image.onclick = () => {
//         position = index
//         // console.log(position, "current")
//         assignSrc(image)
//     }
// })



closeImgBtn.onclick = () => {
    pop.classList.remove('show')
}



const getUrlParams = () => {
    let url = window.location.search

    url = url.trim()
    url = url.split('?')
    url = typeof url[1] === 'undefined' ? 0 : url[1]
    url = url.split('&')

    let params = {}
    for (let i = 0; i < url.length; i++) {
        let parts = url[i].split('=')
        let key = parts[0]
        let value = typeof parts[1] === 'undefined' ? true : parts[1]

        params[key] = value
    }

    // console.log(params)
    return params
}

// refresh with new data
const refresh = (ref, MODE) => {

    // console.log(MODE)

    // show loader
    let myDriveDisplay = document.querySelector('#' + ref)
    if (myDriveDisplay) {

        myDriveDisplay.innerHTML = `<div class=" col-span-full"><img src="assets/loading.gif" class=" h-20 m-auto mt-20" /></div>`
    }

    let params = getUrlParams()

    let paramId = typeof params.id === 'undefined' ? '' : params.id
    let paramType = typeof params.type === 'undefined' ? '' : params.type

    let myForm = new FormData() // create form object

    myForm.append('data_type', 'folder_preview') // give this request function a data type of get files
    myForm.append('mode', MODE) // give this request function the mode coming into it
    myForm.append('slug', paramId)
    myForm.append('type', paramType)

    let xhr = new XMLHttpRequest() // create object for making request

    // console.log(xhr)

    // console.log(xhr.upload)

    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) { // last state that will determine if success or fail

            if (xhr.status == 200) { // 200: connection is okay

                // console.log(xhr.responseText)

                let myDriveDisplay = document.querySelector('#' + ref)
                if (myDriveDisplay) {

                    myDriveDisplay.innerHTML = ""
                }

                // console.log(xhr.responseText)

                let obj = JSON.parse(xhr.responseText)

                // console.log(obj.current_folder)

                FOLDER_ID = obj.current_folder

                // console.log(obj.username)
                // display username
                if (!USERNAME) {
                    USERNAME = obj.username
                    document.querySelector('#username').innerHTML = obj.username
                }

                // check if user is logged in
                LOGGED_IN = obj.LOGGED_IN
                // if (!LOGGED_IN && obj.data_type !== 'folder_preview')
                //     window.location.href = 'login.php'

                // console.log(LOGGED_IN)
                if (!LOGGED_IN) {
                    document.querySelector('#drop-zone').style.display = 'none'
                    document.querySelector('#logout-btn').innerHTML = `
                        <i class="fa-solid fa-right-to-bracket"></i>
                        <span>Login</span>
                    `
                    document.querySelector('#logout-btn').onclick = () => {
                        window.location.href = 'login.php'
                    }
                }

                // update folder tabs
                let folderTabs = document.querySelector('#folder-tabs')
                let extendedFolder = document.querySelector('#extended-folders')
                let dropFolder = document.querySelector('#drop-down-folder-tabs')
                folderTabs.innerHTML = ""
                dropFolder.innerHTML = ""
                dropFolder.classList.remove('show')
                extendedFolder.classList.remove('show')
                for (let i = obj.folder_tabs.length - 1; i >= 0; i--) {
                    // console.log(obj.folder_tabs[i], 'tabs')
                    if (i < 3) {
                        let folderTabCont = document.createElement('div')
                        folderTabCont.className = `${(i == 0) ? 'bg-blue-500' : 'bg-blue-400'} text-sm font-semibold rounded-full py-1 px-4 text-white cursor-pointer hover:bg-blue-500 active:scale-95 max-w-32 overflow-hidden flex items-center gap-2`
                        folderTabCont.innerHTML += `
                                <i class="fa-regular fa-folder-open"></i>
                                <span class=" truncate">${obj.folder_tabs[i].name}</span>
                        `
                        folderTabs.appendChild(folderTabCont)
                        folderTabCont.onclick = () => {
                            folderPreview(obj.folder_tabs[i])
                        }
                    } else if (i >= 3) {
                        // console.log(obj.folder_tabs[i].name)
                        extendedFolder.classList.add('show')
                        let dropFolderCont = document.createElement('div')
                        dropFolderCont.className = "py-1 px-4 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-2"
                        dropFolderCont.innerHTML += `
                                <i class="fa-regular fa-folder-open"></i>
                                <span class=" truncate">${obj.folder_tabs[i].name}</span>
                        `
                        dropFolder.appendChild(dropFolderCont)
                        dropFolderCont.onclick = () => {
                            folderPreview(obj.folder_tabs[i])
                        }
                    }
                }

                if (extendedFolder.classList.contains('show')) {
                    extendedFolder.onclick = (e) => {
                        e.stopPropagation()
                        dropFolder.classList.toggle('show')
                    }
                }

                if (obj.success && obj.data_type == "folder_preview") {


                    // recreate display 
                    // folders
                    if (obj.rows_folders) {
                        for (let i = 0; i < obj.rows_folders.length; i++) {

                            let folderContainer = document.createElement('div')
                            folderContainer.className = " w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300"
                            folderContainer.setAttribute("id", "main-body-item")

                            let isFavourite = false

                            let folderCardTitle = document.createElement('div')
                            folderCardTitle.className = " py-2 px-4 w-full truncate overflow-hidden z-10"
                            folderCardTitle.innerHTML = `
                                ${obj.rows_folders[i].icon}
                                <span class="">${obj.rows_folders[i].name}</span>
                            `

                            let folderInner = document.createElement('div')
                            folderInner.className = " h-full flex items-center justify-center text-6xl md:text-9xl"
                            folderInner.innerHTML = `<i class="fa-solid fa-folder"></i>`

                            let folderCardBody = document.createElement('div')
                            folderCardBody.className = " h-40 overflow-hidden rounded-md"
                            folderCardBody.appendChild(folderInner)

                            folderContainer.appendChild(folderCardTitle)
                            folderContainer.appendChild(folderCardBody)

                            folderContainer.oncontextmenu = (e) => {
                                rightClick(e, isFavourite, MODE, obj.rows_folders[i], 'FOLDER')
                                // console.log(obj.rows[i].id)
                            }

                            folderContainer.ondblclick = (e) => {
                                e.preventDefault()
                                // console.log(obj.rows_folders[i], 'dbclick')
                                // changeFolder(obj.rows_folders[i].id)
                                folderPreview(obj.rows_folders[i])
                            }

                            if (myDriveDisplay) {

                                myDriveDisplay.appendChild(folderContainer)
                            }
                        }
                    }

                    // files
                    if (obj.rows) {
                        displayImages = []

                        for (let i = 0; i < obj.rows.length; i++) {
                            // console.log(obj.rows[i].folder_id)

                            let container = document.createElement('div')
                            container.className = " w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300"
                            container.setAttribute("id", "main-body-item")

                            let isFavourite = false
                            if (obj.rows[i].favourite == 1)
                                isFavourite = true

                            let cardTitle = document.createElement('div')
                            cardTitle.className = " py-2 px-4 w-full truncate overflow-hidden z-10"
                            cardTitle.innerHTML = `
                                ${obj.rows[i].icon}
                                <span class="">${obj.rows[i].file_name}</span>
                            `

                            let imgVid = obj.rows[i].file_path

                            // console.log(obj.rows[i].folder_id)

                            // console.log(obj.rows[i].file_path)

                            let cardImg
                            if (isImage.includes(imgVid.split('.').pop().toLowerCase())) {
                                cardImg = document.createElement('img')
                                cardImg.src = `includes/${obj.rows[i].file_path}`
                                cardImg.className = " cursor-pointer w-full h-full object-cover transition hover:scale-105"
                                cardImg.setAttribute("id", "img")
                            } else if (isVideo.includes(imgVid.split('.').pop().toLowerCase())) {
                                cardImg = document.createElement('video')
                                cardImg.src = `includes/${obj.rows[i].file_path}`
                                cardImg.className = " cursor-pointer w-full h-full object-cover transition hover:scale-105"
                                cardImg.setAttribute("id", "img")
                            } else {
                                cardImg = document.createElement('img')
                                cardImg.src = "assets/q.png"
                                cardImg.className = " cursor-pointer w-full h-full object-cover transition hover:scale-105"
                                cardImg.setAttribute("id", "img")
                            }

                            let cardBody = document.createElement('div')
                            cardBody.className = " h-40 overflow-hidden rounded-md"
                            cardBody.appendChild(cardImg)

                            container.appendChild(cardTitle)
                            container.appendChild(cardBody)

                            container.oncontextmenu = (e) => {
                                rightClick(e, isFavourite, MODE, obj.rows[i], 'FILE')
                                // console.log(obj.rows[i].id)
                            } 


                            if (MODE == "MYDRIVE" && obj.rows[i].folder_id == FOLDER_ID) {
                                displayImages.push(obj.rows[i].file_path)
                            } else if (MODE != "MYDRIVE") {
                                displayImages.push(obj.rows[i].file_path)
                            }

                            // console.log(displayImages)

                            cardImg.onclick = () => {

                                position = i
                                console.log(displayImages[position])
                                assignSrc(displayImages[position])
                                // assignSrc(obj.rows[position].file_path)
                            }

                            leftBtn.onclick = () => {
                                position--
                                if (position < 0) {
                                    position = displayImages.length - 1
                                    // position = obj.rows.length - 1
                                }
                                assignSrc(displayImages[position])
                                // assignSrc(obj.rows[position].file_path)
                                // console.log(position, "prev")
                            }

                            rightBtn.onclick = () => {
                                position++
                                if (position == displayImages.length) {
                                    position = 0
                                }
                                assignSrc(displayImages[position])
                                // assignSrc(obj.rows[position].file_path)
                                // console.log(position, "next")
                            }


                            // console.log(container)

                            if (myDriveDisplay) {

                                myDriveDisplay.appendChild(container)
                            }
                        }
                    }
                } else {
                    if (myDriveDisplay) {

                        myDriveDisplay.innerHTML = `
                        <div class=" col-span-full text-lg font-semibold text-gray-500 pt-20 select-none">Empty!</div>
                        `
                    }
                }
            } else {
                // console.log(xhr)
                console.log(xhr.responseText)
                console.log('Error oo, Gbagam')
            }
        }
    }

    xhr.open('post', 'includes/api.php', true) // open
    xhr.send(myForm) // send set of data
}


const refreshAll = () => {
    refresh('my-drive', 'MYDRIVE')
    refresh('favourites', 'FAVOURITES')
    refresh('recent', 'RECENT')
    refresh('trash', 'TRASH')
    refresh('shared', 'SHARED')
}

// refreshAll()
refresh('my-drive', 'MYDRIVE')





// preview
let previewBtn = document.querySelector('#menu-preview')
previewBtn.onclick = () => {
    preview()
}

const preview = () => {
    // console.log(RIGHT_CLICKED.itemRow.slug)
    window.open(`preview.php?id=${RIGHT_CLICKED.itemRow.slug}&type=${RIGHT_CLICKED.type}`, '_blank')
}

const folderPreview = (folder) => {
    // console.log(folder, 'folderPreview')
    window.open(`folder.php?id=${folder.slug}&type=FOLDER`, `_self`)
}


const logout = () => {

    let myForm = new FormData()
    myForm.append('data_type', 'user_logout')

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) {

            if (xhr.status == 200) {

                // redirect
                window.location.href = 'login.php'
            } else {
                console.log(xhr.responseText)
            }
        }
    }

    xhr.open('post', 'includes/api.php', true) // open
    xhr.send(myForm) // send set of data
}






// copy link
const copyBtn = document.querySelector('#copy-btn')
const copyAlert = document.querySelector('#copy-alert')

const copyLink = () => {
    var linkToCopy = window.location.href
    var tempInput = document.createElement("input")
    tempInput.value = linkToCopy
    document.body.appendChild(tempInput)
    tempInput.select()
    tempInput.setSelectionRange(0, 99999)
    document.execCommand("copy")
    document.body.removeChild(tempInput)
    console.log(`Link copied: ${linkToCopy}`)
}

const showAlert = () => {
    copyAlert.classList.add('show')
    setTimeout(() => copyAlert.classList.remove('show'), 5000)
}

copyBtn.onclick = () => {
    copyLink()
    showAlert()
}



// refresh by mode
const refreshByMode = (mode) => {
    switch (mode) {
        case "MYDRIVE":
            refresh('my-drive', 'MYDRIVE')
            break;

        case "SHARED":
            refresh('shared', 'SHARED')
            break;

        case "FAVOURITES":
            refresh('favourites', 'FAVOURITES')
            break;

        case "RECENT":
            refresh('recent', 'RECENT')
            break;

        case "TRASH":
            refresh('trash', 'TRASH')
            break;

        default:
            break;
    }
}



// mode
const leftBarItems = document.querySelectorAll('#left-bar-item')
const subScreens = document.querySelectorAll('#sub-screen')

let currentMode = "MYDRIVE"

leftBarItems.forEach((item) => {
    item.onclick = () => {
        let mode = item.getAttribute('mode')
        currentMode = mode

        leftBarItems.forEach((i) => {
            i.classList.remove('is-active')
        })

        subScreens.forEach((i) => {
            i.classList.remove('is-active')
        })

        if (currentMode === mode) {
            item.classList.add('is-active')

            subScreens.forEach((i) => {
                let screenMode = i.getAttribute('mode')

                if (currentMode === screenMode) {
                    i.classList.add('is-active')
                }
            })
        }

        refreshByMode(mode)
    }
})






// send file
// const uploadInput = document.querySelector('#upload-input')
const progressBar = document.querySelector('#prog-thumb')
const progressPer = document.querySelector('#prog-per')
const progressContainer = document.querySelector('#prog-container')

// uploadInput.onchange = (e) => {

//     console.log(e)

//     // upload.send(e.files[0])
// }









// drag n drop
const dropZone = document.querySelector('#drop-zone')

if (dropZone) {

    dropZone.ondrop = (e) => {
        e.preventDefault()

        dropZone.classList.remove('highlight')
        // console.log(e.dataTransfer.files)
        uploadFiles(e.dataTransfer.files)
    }

    dropZone.ondragover = (e) => {
        e.preventDefault()

        dropZone.classList.add('highlight')
    }

    dropZone.ondragleave = () => {

        dropZone.classList.remove('highlight')
    }
}






// delete
const deleteRow = (file_type, id) => {

    if (!confirm("Proceed to delete")) {
        return
    }

    let obj = {}

    obj.data_type = 'delete_row'
    obj.file_type = file_type
    obj.id = id

    action.send(obj)
}

const restoreRow = (file_type, id) => {

    if (!confirm("Proceed to restore")) {
        return
    }

    let obj = {}

    obj.data_type = 'restore_row'
    obj.file_type = file_type
    obj.id = id

    action.send(obj)
}


// add to favourite
const addToFavourite = (file_type, id) => {

    if (file_type == 'FOLDER') {
        return
    }

    let obj = {}

    obj.id = id
    obj.data_type = 'add_to_favourite'

    action.send(obj)
}



const menu = document.querySelector('#menu') //menu for right click
// function for right click
const rightClick = (e, isFavourite, mode, itemRow, type) => {
    e.preventDefault()


    RIGHT_CLICKED = {
        'itemRow': itemRow,
        'name': type === 'FOLDER' ? itemRow.name : itemRow.file_name,
        'type': type
    }

    // console.log(RIGHT_CLICKED)

    let hideFromTrashMenu = document.querySelectorAll('.hide-from-trash')
    let restoreBtn = document.querySelector('#menu-restore')
    let downloadBtn = document.querySelector('#menu-download')
    let delBtnText = document.querySelector('#menu-delete-text')
    let deleteBtn = document.querySelector('#menu-delete')
    let previewBtn = document.querySelector('#menu-preview')
    let shareBtn = document.querySelector('#menu-share')
    let favBtn = document.querySelector('#menu-fav')

    if (!LOGGED_IN) {
        previewBtn.style.opacity = '0.7'
        previewBtn.onclick = () => {
            return
        }
        deleteBtn.style.opacity = '0.7'
        shareBtn.style.opacity = '0.7'
        shareBtn.onclick = () => {
            return
        }
        favBtn.style.opacity = '0.7'
    }

    delBtnText.innerHTML = "Delete"

    hideFromTrashMenu.forEach((item) => {
        item.style.display = 'block'
    })
    restoreBtn.style.display = 'none'

    if (mode == 'TRASH') {
        hideFromTrashMenu.forEach((item) => {
            item.style.display = 'none'
        })
        restoreBtn.style.display = 'block'
        delBtnText.innerHTML = "Delete Permanently"
    }

    downloadBtn.setAttribute('href', '#')

    if (type === 'FILE' && mode != 'TRASH') {

        downloadBtn.style.display = 'block'
        downloadBtn.setAttribute('href', `includes/download.php?id=${itemRow.id}`)
        favBtn.style.display = 'block'
        previewBtn.style.display = 'block'

    } else if (type === 'FOLDER' && mode != 'TRASH') {

        downloadBtn.style.display = 'none'
        favBtn.style.display = 'none'
        previewBtn.style.display = 'none'
    }

    console.log(itemRow.id, type)

    // console.log(mode)

    if (isFavourite) {
        document.querySelector('#fav-menu').innerHTML = 'Remove from favourite'
        document.querySelector('#star-outline').style.display = 'none'
        document.querySelector('#star-fill').style.display = 'inline-block'
    } else {
        document.querySelector('#fav-menu').innerHTML = 'Add to favourite'
        document.querySelector('#star-outline').style.display = 'inline-block'
        document.querySelector('#star-fill').style.display = 'none'

    }

    favBtn.onclick = () => {
        if (!LOGGED_IN) {
            return
        }
        addToFavourite(type, itemRow.id)
    }

    let xP = e.clientX / window.innerWidth * 100
    let yP = e.clientY / window.innerHeight * 100

    if (xP < 80) {
        menu.style.left = xP + '%'
        menu.style.right = 'auto'
    } else {
        menu.style.left = 'auto'
        menu.style.right = (100 - xP) + '%'
    }

    if (yP < 60) {
        menu.style.top = yP + '%'
        menu.style.bottom = 'auto'
    } else {
        menu.style.top = 'auto'
        menu.style.bottom = (100 - yP) + '%'
    }

    menu.classList.add('show')
    menu.onclick = () => {
        refreshByMode(mode)
    }

    deleteBtn.onclick = () => {
        if (!LOGGED_IN) {
            return
        }
        deleteRow(type, itemRow.id)
    }
    restoreBtn.onclick = () => {
        restoreRow(type, itemRow.id)
    }
}








// server request
let uploading = false

const uploadFiles = (files) => {

    if (uploading) {
        // alert('File upload in progress')
        showInfoAlert('File upload in progress')
        return
    }

    uploading = true

    let myForm = new FormData() // create form object

    myForm.append('data_type', 'upload_files') // give this request function a data type of upload files
    myForm.append('folder_id', FOLDER_ID)

    for (let i = 0; i < files.length; i++) {
        myForm.append('file' + i, files[i])
    }

    progressContainer.classList.add('show')
    progressBar.style.width = '0%'
    progressPer.innerHTML = '0%'

    let xhr = new XMLHttpRequest() // create object for making request

    // console.log(xhr)

    xhr.onerror = () => {
        console.log('Error dey oo, u ar doin d rubbish')
    }

    // console.log(xhr.upload)

    xhr.upload.onprogress = (e) => {

        let percent = Math.round(e.loaded / e.total * 100)
        // console.log(percent)
        progressBar.style.width = percent + '%'
        progressPer.innerHTML = percent + '%'
    }

    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) { // last state that will determine if success or fail

            uploading = false

            if (xhr.status == 200) { // 200: connection is okay

                console.log(xhr.responseText)

                let obj = JSON.parse(xhr.responseText)
                if (obj.success) {
                    console.log('Upload complete')
                    refreshAll()
                    location.reload()
                } else {
                    console.log('Upload error')
                }
                progressContainer.classList.remove('show')
                progressBar.style.width = '0%'
                progressPer.innerHTML = '0%'
            } else {
                // console.log(xhr)
                console.log(xhr.responseText)
                console.log('Error oo, Gbagam')
            }
        }
    }

    xhr.open('post', 'includes/api.php', true) // open
    xhr.send(myForm) // send set of data
}














const logoutContainer = document.querySelector('#logout-container')
const logoutCard = document.querySelector('#logout-card')
const logoutCloseBtn = document.querySelector('#logout-close-btn')
const logoutBtn = document.querySelector('#logout-btn')

logoutBtn.onclick = () => {
    if (!LOGGED_IN) {
        return
    }
    logoutContainer.classList.add('show')
}
logoutContainer.onclick = () => {
    logoutContainer.classList.remove('show')
}
logoutCard.onclick = (e) => {
    e.stopPropagation()
}
logoutCloseBtn.onclick = () => {
    logoutContainer.classList.remove('show')
}




// right click
// const mainBodyItems = document.querySelectorAll('#main-body-item')
// console.log(mainBodyItems)

// mainBodyItems.forEach((item) => {
//     item.oncontextmenu = (e) => {
//         rightClick(e)
//     }
// })

window.onclick = () => {
    menu.classList.remove('show')
    let dropFolder = document.querySelector('#drop-down-folder-tabs')
    dropFolder.classList.remove('show')
}
