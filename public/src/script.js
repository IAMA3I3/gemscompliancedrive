// pop up images/videos
var images = document.querySelectorAll('#img')
var pop = document.querySelector('#popup')
var popImage = document.querySelector('#popup img')
var popVideo = document.querySelector('#popup video')
var closeImgBtn = document.querySelector('#popup #close-img')
var leftBtn = document.querySelector('#popup #left-btn')
var rightBtn = document.querySelector('#popup #right-btn')


const isImage = ['gif', 'jpg', 'jpeg', 'png']
const isVideo = ['mpg', 'mp2', 'mpeg', 'mpe', 'mpv', 'mp4', 'mov']
let position = 0

const assignSrc = (e) => {
    if (isImage.includes(e.getAttribute('src').split('.').pop().toLowerCase())) {
        pop.classList.add('show')
        popImage.style.display = "inline-block"
        popVideo.style.display = "none"
        popImage.src = e.getAttribute('src')
    } else if (isVideo.includes(e.getAttribute('src').split('.').pop().toLowerCase())) {
        pop.classList.add('show')
        popImage.style.display = "none"
        popVideo.style.display = "inline-block"
        popVideo.src = e.getAttribute('src')
    } else {
        console.log("Not valid")
    }
}

images.forEach((image, index) => {
    image.onclick = () => {
        position = index
        // console.log(position, "current")
        assignSrc(image)
    }
})

leftBtn.onclick = () => {
    position--
    if (position < 0) {
        position = images.length - 1
    }
    assignSrc(images[position])
    // console.log(position, "prev")
}

rightBtn.onclick = () => {
    position++
    if (position == images.length) {
        position = 0
    }
    assignSrc(images[position])
    // console.log(position, "next")
}

closeImgBtn.onclick = () => {
    pop.classList.remove('show')
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





// mode
const leftBarItems = document.querySelectorAll('#left-bar-item')

let currentMode = "MYDRIVE"

leftBarItems.forEach((item) => {
    item.onclick = () => {
        let mode = item.getAttribute('mode')
        currentMode = mode

        leftBarItems.forEach((i) => {
            i.classList.remove('is-active')
        })
        
        if (currentMode === mode) {
            item.classList.add('is-active')
        }
    }
})


// right click
const mainBodyItems = document.querySelectorAll('#main-body-item')
const menu = document.querySelector('#menu')

mainBodyItems.forEach((item) => {
    item.oncontextmenu = (e) => {
        e.preventDefault()

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
    }
})

window.onclick = () => {
    menu.classList.remove('show')
}