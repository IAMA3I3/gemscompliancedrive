var LOGGED_IN = false
var USERNAME = false





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





// refresh with new data
const refresh = (ref, MODE) => {

    // console.log(MODE)

    // show loader
    let myDriveDisplay = document.querySelector('#' + ref)
    myDriveDisplay.innerHTML = `<div class=" col-span-full"><img src="assets/loading.gif" class=" h-20 m-auto mt-20" /></div>`

    let myForm = new FormData() // create form object

    myForm.append('data_type', 'get_files') // give this request function a data type of get files
    myForm.append('mode', MODE) // give this request function the mode coming into it

    let xhr = new XMLHttpRequest() // create object for making request

    // console.log(xhr)

    // console.log(xhr.upload)

    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) { // last state that will determine if success or fail

            if (xhr.status == 200) { // 200: connection is okay

                // console.log(xhr.responseText)

                let myDriveDisplay = document.querySelector('#' + ref)
                myDriveDisplay.innerHTML = ""

                // console.log(xhr.responseText)

                let obj = JSON.parse(xhr.responseText)

                // console.log(obj.username)
                // display username
                if (!USERNAME) {
                    USERNAME = obj.username
                    document.querySelector('#username').innerHTML = obj.username
                }

                // check if user is logged in
                LOGGED_IN = obj.LOGGED_IN
                if (!LOGGED_IN)
                    window.location.href = 'login.php'

                if (obj.success && obj.data_type == "get_files") {

                    // recreate display 
                    console.log(obj.rows_folders[0])
                    // folders
                    // for (let i = 0; i < obj.rows_folders.length; i++) {
                    //     console.log(obj.rows_folders[i])
                    // }

                    // files
                    for (let i = 0; i < obj.rows.length; i++) {

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
                        if (cardImg) {
                            cardBody.appendChild(cardImg)
                        } else if (cardFolder) {
                            cardBody.appendChild(cardFolder)
                        }

                        container.appendChild(cardTitle)
                        container.appendChild(cardBody)

                        container.oncontextmenu = (e) => {
                            rightClick(e, isFavourite, MODE)
                            // console.log(obj.rows[i].id)
                        }

                        cardImg.onclick = () => {

                            position = i
                            assignSrc(obj.rows[position].file_path)
                        }

                        leftBtn.onclick = () => {
                            position--
                            if (position < 0) {
                                position = obj.rows.length - 1
                            }
                            assignSrc(obj.rows[position].file_path)
                            // console.log(position, "prev")
                        }

                        rightBtn.onclick = () => {
                            position++
                            if (position == obj.rows.length) {
                                position = 0
                            }
                            assignSrc(obj.rows[position].file_path)
                            // console.log(position, "next")
                        }

                        // console.log(container)

                        myDriveDisplay.appendChild(container)
                    }
                } else {
                    myDriveDisplay.innerHTML = `
                        <div class=" col-span-full text-lg font-semibold text-gray-500 mt-20">Empty!</div>
                    `
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
}

refreshAll()


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



const menu = document.querySelector('#menu') //menu for right click
// function for right click
const rightClick = (e, isFavourite, mode) => {
    e.preventDefault()

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
}








// server request
let uploading = false

const uploadFiles = (files) => {

    if (uploading) {
        alert('File upload in progress')
        return
    }

    uploading = true

    let myForm = new FormData() // create form object

    myForm.append('data_type', 'upload_files') // give this request function a data type of upload files

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





// new folder pop up
const newFolder = document.querySelector('#new-folder-container')
const createFolderBtn = document.querySelector('#create-folder-btn')
const newFolderInner = document.querySelector('#new-folder-card')
const newFolderCloseBtn = document.querySelector('#new-folder-close-btn')
const newFolderInput = document.querySelector('#new-folder-input')

createFolderBtn.onclick = () => {
    action.showNewFolderContainer()
}
newFolder.onclick = () => {
    action.hideNewFolderContainer()
}
newFolderInner.onclick = (e) => {
    e.stopPropagation()
}
newFolderCloseBtn.onclick = () => {
    action.hideNewFolderContainer()
}



const action = {

    uploading: false,
    cancelled: false,

    createNewFolder: (e) => {

        let inputValue = newFolderInput.value.trim()
        action.hideNewFolderContainer()

        let obj = {}
        obj.data_type = 'new_folder'
        obj.name = inputValue

        action.send(obj)
    },

    showNewFolderContainer: () => {
        newFolder.classList.add('show')
        newFolderInput.focus()
        newFolderInput.value = ''
    },

    hideNewFolderContainer: () => {
        newFolder.classList.remove('show')
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
                    if (obj.success) {

                        refreshAll()
                    } else {
                        console.log('Could not complete')
                    }
                } else {
                    console.log(xhr.responseText)
                }

                action.uploading = false
            }
        }

        xhr.open('post', 'includes/api.php', true)
        xhr.send(myForm)

        refreshAll()
    }
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
}