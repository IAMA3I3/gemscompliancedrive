const infoAlert = document.querySelector('#info-alert')
const infoText = document.querySelector('#info-text')
const showInfoAlert = (info) => {
    infoText.innerHTML = info
    infoAlert.classList.add('show')
    setTimeout(() => infoAlert.classList.remove('show'), 5000)
}

const successAlert = document.querySelector('#success-alert')
const successText = document.querySelector('#success-text')
const showSuccessAlert = (info) => {
    successText.innerHTML = info
    successAlert.classList.add('show')
    setTimeout(() => successAlert.classList.remove('show'), 5000)
}

const signup = {

    uploading: false,

    submit: (e) => {

        e.preventDefault()

        if (signup.uploading) {
            // alert('Uploading, please wait...')
            showInfoAlert('Please wait ...')
            return
        }

        let signupBtn = document.querySelector('#signup-btn')
        signupBtn.innerHTML = 'Saving...'

        let myForm = new FormData()
        myForm.append('data_type', 'user_signup')

        // get all input
        let inputs = e.currentTarget.querySelectorAll('input,select,textarea')
        for (let i = 0; i < inputs.length; i++) {
            myForm.append(inputs[i].name, inputs[i].value.trim())
        }

        signup.uploading = true

        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4) {

                signup.uploading = false

                let signupBtn = document.querySelector('#signup-btn')
                signupBtn.innerHTML = 'Sign Up'

                if (xhr.status == 200) {

                    // console.log(xhr.responseText, 'response text')

                    let obj = JSON.parse(xhr.responseText)

                    if(obj.success && obj.data_type == "user_signup") {

                        // alert('Account created, Please login to continue')
                        showSuccessAlert('Account created, Please login to continue')
                        window.location.href = 'login.php'
                    } else {

                        // errors
                        console.log("An error occured")
                        // let form = document.querySelector('#signup-form')
                        let errors = document.querySelectorAll('.error-mssg')
                        for (let i = 0; i < errors.length; i++) {
                            errors[i].innerHTML = ''
                        }
                        for (key in obj.errors) {
                            document.querySelector('#'+key+'-error').innerHTML = obj.errors[key] 
                        }
                    }
                } else {
                    console.log(xhr.responseText)
                }
            }
        }

        xhr.open('post', 'includes/api.php', true)
        xhr.send(myForm)
    }
}



const login = {

    uploading: false,

    submit: (e) => {

        e.preventDefault()

        if (login.uploading) {
            // alert('Uploading, please wait...')
            showInfoAlert('Please wait ...')
            return
        }

        let loginBtn = document.querySelector('#login-btn')
        loginBtn.innerHTML = 'Loading...'

        let myForm = new FormData()
        myForm.append('data_type', 'user_login')

        // get all input
        let inputs = e.currentTarget.querySelectorAll('input,select,textarea')
        for (let i = 0; i < inputs.length; i++) {
            myForm.append(inputs[i].name, inputs[i].value.trim())
        }

        signup.uploading = true

        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4) {

                signup.uploading = false

                let loginBtn = document.querySelector('#login-btn')
                loginBtn.innerHTML = 'Login'

                if (xhr.status == 200) {

                    console.log(xhr.responseText, 'response text')

                    let obj = JSON.parse(xhr.responseText)

                    if(obj.success && obj.data_type == "user_login") {

                        // alert('Login Successful')
                        showInfoAlert('Loging you in ...')
                        window.location.href = 'index.php'
                    } else {

                        // errors
                        console.log("An error occured")
                        // let form = document.querySelector('#signup-form')
                        let errors = document.querySelectorAll('.error-mssg')
                        for (let i = 0; i < errors.length; i++) {
                            errors[i].innerHTML = ''
                        }
                        for (key in obj.errors) {
                            document.querySelector('#'+key+'-error').innerHTML = obj.errors[key] 
                        }
                    }
                } else {
                    console.log(xhr.responseText)
                }
            }
        }

        xhr.open('post', 'includes/api.php', true)
        xhr.send(myForm)
    }
}