// alert
const saveAlert = document.querySelector('#saved-alert')

const showSaveAlert = () => {
    saveAlert.classList.add('show')
    setTimeout(() => saveAlert.classList.remove('show'), 5000)
}

// const infoAlert = document.querySelector('#info-alert')
// const infoText = document.querySelector('#info-text')
// const showInfoAlert = (info) => {
//     infoText.innerHTML = info
//     infoAlert.classList.add('show')
//     setTimeout(() => infoAlert.classList.remove('show'), 5000)
// }

// share pop up
const shareBtn = document.querySelector('#menu-share')
const shareContainer = document.querySelector('#share-modal-container')
const shareCard = document.querySelector('#share-modal-card')
const shareCloseBtn = document.querySelector('#share-close-btn')
const shareInput = document.querySelector('#share-input')
const shareFileName = document.querySelector('#share-file-name')
const copyShareLinkBtn = document.querySelector('#copy-share-link-btn')
const radios = document.querySelectorAll('.radio')

shareBtn.onclick = () => {
    // console.log(RIGHT_CLICKED.itemRow.email_shared_to)
    share.refresh(RIGHT_CLICKED.itemRow.email_shared_to)
    shareAction.showShareContainer()
}
shareContainer.onclick = () => {
    shareAction.hideShareContainer()
    document.querySelector('#email-share-error').classList.remove('show')
}
shareCard.onclick = (e) => {
    e.stopPropagation()
}
shareCloseBtn.onclick = () => {
    shareAction.hideShareContainer()
    document.querySelector('#email-share-error').classList.remove('show')
}
copyShareLinkBtn.onclick = () => {
    shareAction.copyShareLink()
    showAlert()
    shareInput.setSelectionRange(0, 0)
}


// share actions
const shareAction = {
    root_path: 'http://localhost/gemscompliancedrive/public/',

    showShareContainer: () => {
        shareContainer.classList.add('show')
        shareFileName.innerHTML = RIGHT_CLICKED.name
        document.querySelector(`#share-mode-${RIGHT_CLICKED.itemRow.share_mode}`).checked = true
        if (RIGHT_CLICKED.type === 'FILE') {
            shareInput.value = `${shareAction.root_path}preview.php?id=${RIGHT_CLICKED.itemRow.slug}&type=${RIGHT_CLICKED.type}`
        } else if (RIGHT_CLICKED.type === 'FOLDER') {
            shareInput.value = `${shareAction.root_path}folder.php?id=${RIGHT_CLICKED.itemRow.slug}&type=${RIGHT_CLICKED.type}`
        } else {
            shareInput.value = ''
        }
    },

    hideShareContainer: () => {
        shareContainer.classList.remove('show')
    },

    shareFile: () => {
        // console.log(RIGHT_CLICKED.itemRow.id, RIGHT_CLICKED.type)
        let shareMode = 0

        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                shareMode = radios[i].value
            }
        }

        showSaveAlert()

        // grab all share email address
        let inputs = document.querySelector('#email-share-list').querySelectorAll("input")
        let emails = []
        for (let i = 0; i < inputs.length; i++) {
            emails.push(inputs[i].value)
        }

        let obj = {}
        obj.data_type = 'share_file'
        obj.share_mode = shareMode
        obj.folder_id = FOLDER_ID
        obj.file_type = RIGHT_CLICKED.type
        obj.id = RIGHT_CLICKED.itemRow.id
        obj.emails = JSON.stringify(emails)

        action.send(obj)
    },

    copyShareLink: () => {
        shareInput.select()
        shareInput.setSelectionRange(0, 99999)
        document.execCommand("copy")
    },
}






// new folder pop up
const newFolder = document.querySelector('#new-folder-container')
const createFolderBtn = document.querySelector('#create-folder-btn')
const newFolderInner = document.querySelector('#new-folder-card')
const newFolderCloseBtn = document.querySelector('#new-folder-close-btn')
const newFolderInput = document.querySelector('#new-folder-input')

if (createFolderBtn) {

    createFolderBtn.onclick = () => {
        if (!LOGGED_IN) {
            return
        }
        action.showNewFolderContainer()
    }
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


// new folder actions
const action = {

    uploading: false,
    cancelled: false,

    createNewFolder: (e) => {

        let inputValue = newFolderInput.value.trim()
        if (inputValue != '') {
            action.hideNewFolderContainer()
        }

        let obj = {}
        obj.data_type = 'new_folder'
        obj.name = inputValue
        obj.folder_id = FOLDER_ID

        action.send(obj)
    },

    showNewFolderContainer: () => {
        document.querySelector('#new-folder-error').innerHTML = ''
        newFolderInput.value = ''
        newFolder.classList.add('show')
        newFolderInput.focus()
    },

    hideNewFolderContainer: () => {
        newFolder.classList.remove('show')
    },

    send: (obj) => {

        if (action.uploading) {
            // alert("Folder upload in progress")
            showInfoAlert('Folder upload in progress')
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

                    // console.log(xhr.responseText)

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

        refreshAll()
    },

    handleResult: (result, obj) => {
        // alert(result)
        if (obj.success) {

            refreshAll()
        } else {
            let errorMssg = document.querySelector('#new-folder-error')
            errorMssg.innerHTML = obj.errors.name
            console.log(obj.errors.name)
        }
    },
}


const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
};


const shareEmailInput = document.querySelector('#email-share-input')
const shareEmailAddBtn = document.querySelector('#email-share-add')

//  onclick="share.add(this.parentNode.querySelector('#email-share-input').value.trim())"
shareEmailAddBtn.onclick = () => {
    share.add(shareEmailInput.value.trim())
    shareEmailInput.value = ""
    shareEmailInput.focus()
}



const share = {
    add: (email) => {
        let shareEmailError = document.querySelector('#email-share-error')
        if (email == "") {
            shareEmailError.innerHTML = "Empty field"
            shareEmailError.classList.add('show')
            return
        }
        if (email != "" && !validateEmail(email)) {
            shareEmailError.innerHTML = "Invalid Email Address"
            shareEmailError.classList.add('show')
            return
        }
        shareEmailError.classList.remove('show')

        let shareEmailList = document.querySelector('#email-share-list')

        let shareEmailItem = document.createElement('div')
        shareEmailItem.className = "flex items-center py-1 px-3 bg-slate-700/10 rounded mx-2 my-1"
        shareEmailItem.innerHTML = `
            <div class=" flex-1 overflow-hidden truncate">${email}</div>
            <div class=" flex items-center px-2 hover:text-red-500 active:text-red-700 active:scale-95 cursor-pointer" title="Remove" onclick="share.remove(event)">
                <i class="fa-solid fa-xmark"></i>
            </div>
            <input type="hidden" name="" id="" value="${email}">
        `

        shareEmailList.insertBefore(shareEmailItem, shareEmailList.children[0])
    },
    remove: (e) => {
        e.currentTarget.parentNode.remove()
    },
    refresh: (obj) => {
        document.querySelector('#email-share-list').innerHTML = ""
        let rows = JSON.parse(obj)
        for (let i = 0; i < rows.length; i++) {
            share.add(rows[i].email)
        }
    }
}
