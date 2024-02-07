var LOGGED_IN = false
var USERNAME = false
var FOLDER_ID = 0
var MODE = 'PREVIEW'

var RIGHT_CLICKED = {}



// loading
var myDriveDisplay = document.querySelector('#preview-display')
if (myDriveDisplay) {

    myDriveDisplay.innerHTML = `<div class=" col-span-full"><img src="assets/loading.gif" class=" h-20 m-auto mt-20" /></div>`
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



// pop up images/videos
var images = document.querySelectorAll('#img')
var pop = document.querySelector('#popup')
var popImage = document.querySelector('#popup img')
var popVideo = document.querySelector('#popup video')
var closeImgBtn = document.querySelector('#popup #close-img')
var leftBtn = document.querySelector('#popup #left-btn')
var rightBtn = document.querySelector('#popup #right-btn')


closeImgBtn.onclick = () => {
    pop.classList.remove('show')
}




// preview actions
const action = {

    uploading: false,
    cancelled: false,

    get: () => {
        let params = getUrlParams()

        let obj = {}

        obj.data_type = 'preview'
        obj.slug = typeof params.id === 'undefined' ? '' : params.id
        obj.type = typeof params.type === 'undefined' ? '' : params.type

        action.send(obj)
    },

    send: (obj) => {

        if (action.uploading) {
            alert("Folder upload in progress")
            return
        }

        action.uploading = true
        action.cancelled = false

        let myForm = new FormData()

        for (key in obj) {
            myForm.append(key, obj[key])
        }

        let xhr = new XMLHttpRequest()

        xhr.onerror = () => console.log('an error occured')

        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4) {

                if (xhr.status == 200) {

                    let obj = JSON.parse(xhr.responseText)
                    action.handleResult(xhr.responseText, obj)

                } else {
                    console.log(xhr.responseText)
                }

                action.uploading = false
            }
        }

        xhr.open('post', 'includes/api.php', true)
        xhr.send(myForm)

    },

    handleResult: (result, obj) => {
        console.log(result)
        if (!USERNAME) {
            USERNAME = obj.username
            document.querySelector('#username').innerHTML = obj.username
        }
        if (obj.success) {

            // alert(result)

            if (myDriveDisplay) {

                myDriveDisplay.innerHTML = ""
            }

            // console.log(xhr.responseText)

            // check if user is logged in

            // update folder tabs
            // let folderTabs = document.querySelector('#folder-tabs')
            // let extendedFolder = document.querySelector('#extended-folders')
            // let dropFolder = document.querySelector('#drop-down-folder-tabs')
            // folderTabs.innerHTML = ""
            // dropFolder.innerHTML = ""
            // dropFolder.classList.remove('show')
            // extendedFolder.classList.remove('show')
            // for (let i = obj.folder_tabs.length - 1; i >= 0; i--) {
            //     // console.log(obj.folder_tabs[i].name)
            //     if (i < 3) {
            //         folderTabs.innerHTML += `
            //                 <div onclick="changeFolder(${obj.folder_tabs[i].id})" class="${(i == 0) ? 'bg-blue-500' : 'bg-blue-400'} text-sm font-semibold rounded-full py-1 px-4 text-white cursor-pointer hover:bg-blue-500 active:scale-95 max-w-32 overflow-hidden flex items-center gap-2">
            //                     <i class="fa-regular fa-folder-open"></i>
            //                     <span class=" truncate">${obj.folder_tabs[i].name}</span>
            //                 </div>
            //             `
            //     } else if (i >= 3) {
            //         // console.log(obj.folder_tabs[i].name)
            //         extendedFolder.classList.add('show')
            //         dropFolder.innerHTML += `
            //                 <div onclick="changeFolder(${obj.folder_tabs[i].id})" class=" py-1 px-4 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-2">
            //                     <i class="fa-regular fa-folder-open"></i>
            //                     <span class=" truncate">${obj.folder_tabs[i].name}</span>
            //                 </div>
            //             `
            //     }
            // }

            // if (extendedFolder.classList.contains('show')) {
            //     extendedFolder.onclick = (e) => {
            //         e.stopPropagation()
            //         dropFolder.classList.toggle('show')
            //     }
            // }

            // recreate display 
            // folders
            // if (obj.rows_folders) {
            //     for (let i = 0; i < obj.rows_folders.length; i++) {

            //         let folderContainer = document.createElement('div')
            //         folderContainer.className = " w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300"
            //         folderContainer.setAttribute("id", "main-body-item")

            //         let isFavourite = false

            //         let folderCardTitle = document.createElement('div')
            //         folderCardTitle.className = " py-2 px-4 w-full truncate overflow-hidden z-10"
            //         folderCardTitle.innerHTML = `
            //                     ${obj.rows_folders[i].icon}
            //                     <span class="">${obj.rows_folders[i].name}</span>
            //                 `

            //         let folderInner = document.createElement('div')
            //         folderInner.className = " h-full flex items-center justify-center text-6xl md:text-9xl"
            //         folderInner.innerHTML = `<i class="fa-solid fa-folder"></i>`

            //         let folderCardBody = document.createElement('div')
            //         folderCardBody.className = " h-40 overflow-hidden rounded-md"
            //         folderCardBody.appendChild(folderInner)

            //         folderContainer.appendChild(folderCardTitle)
            //         folderContainer.appendChild(folderCardBody)

            //         folderContainer.oncontextmenu = (e) => {
            //             rightClick(e, isFavourite, MODE, obj.rows_folders[i], 'FOLDER')
            //             // console.log(obj.rows[i].id)
            //         }

            //         folderContainer.ondblclick = (e) => {
            //             e.preventDefault()
            //             // console.log(obj.rows_folders[i].id)
            //             changeFolder(obj.rows_folders[i].id)
            //         }

            //         if (myDriveDisplay) {

            //             myDriveDisplay.appendChild(folderContainer)
            //         }
            //     }
            // }

            // files
            if (obj.row) {
                displayImages = []

                let container = document.createElement('div')
                container.className = " w-[90%] rounded-xl shadow-md border-4 border-slate-300 bg-slate-300"
                container.setAttribute("id", "main-body-item")

                let isFavourite = false
                if (obj.row.favourite == 1)
                    isFavourite = true

                let cardTitle = document.createElement('div')
                cardTitle.className = " py-2 px-4 w-full truncate overflow-hidden z-10"
                cardTitle.innerHTML = `
                                ${obj.row.icon}
                                <span class="">${obj.row.file_name}</span>
                            `

                let imgVid = obj.row.file_path

                // console.log(obj.row.folder_id)

                let cardImg
                if (isImage.includes(imgVid.split('.').pop().toLowerCase())) {
                    cardImg = document.createElement('img')
                    cardImg.src = `includes/${obj.row.file_path}`
                    cardImg.className = " cursor-pointer w-full h-full object-cover transition hover:scale-105"
                    cardImg.setAttribute("id", "img")
                } else if (isVideo.includes(imgVid.split('.').pop().toLowerCase())) {
                    cardImg = document.createElement('video')
                    cardImg.src = `includes/${obj.row.file_path}`
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
                    rightClick(e, isFavourite, MODE, obj.row, 'FILE')
                    // console.log(obj.row.id)
                }

                // console.log(MODE == "MYDRIVE")

                // if (MODE == "MYDRIVE" && FOLDER_ID == obj.row.folder_id) {
                //     displayImages.push(obj.row.file_path)
                // }
                displayImages.push(obj.row.file_path)

                // if (MODE != "MYDRIVE") {
                //     displayImages.push(obj.row.file_path)
                // }

                cardImg.onclick = () => {

                    // position = i
                    position = 0
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

        } else {
            console.log('Error on preview.js: handleResult()')
            if (myDriveDisplay) {

                myDriveDisplay.innerHTML = `
                    <div class=" col-span-full text-lg font-semibold text-gray-500 pt-20 select-none">No Files Found!</div>
                    `
            }
        }
    },
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


const isImage = ['gif', 'jpg', 'jpeg', 'png', 'jfif', 'jif', 'jfi']
const isVideo = ['mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'mp4', 'mov']
let displayImages = []
let position = 0

const assignSrc = (e) => {
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


const menu = document.querySelector('#menu') //menu for right click
// function for right click
const rightClick = (e, isFavourite, mode, itemRow, type) => {
    e.preventDefault()

    RIGHT_CLICKED = { 'id': itemRow.id, 'type': type, 'slug': itemRow.slug }

    // console.log(RIGHT_CLICKED)

    let hideFromTrashMenu = document.querySelectorAll('.hide-from-trash')
    let restoreBtn = document.querySelector('#menu-restore')
    let downloadBtn = document.querySelector('#menu-download')
    let delBtnText = document.querySelector('#menu-delete-text')
    let deleteBtn = document.querySelector('#menu-delete')

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

    let favBtn = document.querySelector('#menu-fav')

    downloadBtn.setAttribute('href', '#')

    if (type === 'FILE' && mode != 'TRASH') {

        downloadBtn.style.display = 'block'
        downloadBtn.setAttribute('href', `includes/download.php?id=${itemRow.id}`)
        favBtn.style.display = 'block'

    } else if (type === 'FOLDER' && mode != 'TRASH') {

        downloadBtn.style.display = 'none'
        favBtn.style.display = 'none'
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
        // addToFavourite(type, itemRow.id)
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
        menu.classList.remove('show')
    }

    deleteBtn.onclick = () => {
        // deleteRow(type, itemRow.id)
    }
    restoreBtn.onclick = () => {
        // restoreRow(type, itemRow.id)
    }
}

action.get()




window.onclick = () => {
    menu.classList.remove('show')
}