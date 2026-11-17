
const form = document.getElementById('contactForm')

const nameField = document.getElementById('Name')
const emailField = document.getElementById('Email')
const textField = document.getElementById('comments')
const errorsField = document.getElementById('form-errors')


const ariaField = document.getElementById('formStatus')
const ariaCount = document.getElementById('charCount')
const submitButton = document.getElementById('submitButton')



let globalWarnings = false


nameField.addEventListener('blur', checkNameValidity)
emailField.addEventListener('blur', checkEmailValidity)
textField.addEventListener('input', updateCommentCount)
textField.addEventListener('blur', checkCommentsValidity)
form.addEventListener('invalid', checkErrors, true)
form.addEventListener('submit', submitErrors)

let form_errors= []




function checkErrors(event){

    event.preventDefault();
    const failedField = event.target
    form_errors.push({field: failedField.name, message: failedField.validationMessage})
    console.log({field: failedField.name, message: failedField.validationMessage})
}


function submitErrors(){
    errorsField.value = JSON.stringify(form_errors)    
}




function checkAllValidity(){
    console.log('a')
    checkNameValidity()

    checkCommentsValidity()
    checkEmailValidity()

    

    

}


function checkNameValidity(){
    
    errorMessage = ''    

    if(nameField.validity.valueMissing || nameField.validity.tooShort){
        errorMessage += '- You need at least 1 character for the Name field. You are currently using ' + (nameField.value.length) + '.'
    }
    nameField.setCustomValidity(errorMessage)
    nameField.reportValidity()
    ariaField.textContent = errorMessage
}

function checkEmailValidity(){

    let errorMessage = ''

    if(emailField.validity.valueMissing || emailField.validity.typeMismatch){
        errorMessage = '-The input is not an valid email address. Check for an @ symbol or characters following the @ symbol.  \nExample format: a@b'
    }
    else if(emailField.validity.tooShort){
        errorMessage += '\n-You need at least 3 characters for the Email field. You are currently using ' + (emailField.value.length) + '.'
    }


    
    emailField.setCustomValidity(errorMessage)
    emailField.reportValidity()
    ariaField.textContent = errorMessage
}

function checkCommentsValidity(){

    let errorMessage = ''
  

    if(textField.validity.valueMissing || textField.validity.tooShort){
        errorMessage += '\n - You need at least 10 characters for the Comments field. You are currently using (' + (textField.value.length) + ') characters.'
        
    }

    textField.setCustomValidity(errorMessage)
    textField.reportValidity()
    ariaField.textContent = errorMessage


    
}

function updateCommentCount(){
    let countMessage = 'Remaining Characters: ' + (textField.maxLength - textField.value.length)
    
    
    if(textField.value.length == textField.maxLength){
        countMessage = 'Character limit reached'
    }
    if(textField.value.length >= textField.maxLength - 100 ){
        console.log('a')
        ariaCount.classList.replace('notNear','nearMax')
    }
    else{
        console.log('b')
        ariaCount.classList.replace('nearMax','notNear')
    }
    
    ariaCount.textContent = countMessage
}







const modeButton = document.getElementById("modeButton")
modeButton.addEventListener('click', themeChanger)
applyTheme(getModePref());



function getModePref(){
    try{
        const savedTheme = localStorage.getItem('theme')
        return savedTheme
    }
    catch{
        console.warn('Unable to read preference from local storage')
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';



}

function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme)
    try{
        localStorage.setItem('theme', theme)
    }
    catch{
        console.error("Unable to save")
    }
    
    
}




function themeChanger(){
    const currTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currTheme === 'dark' ? 'light' : 'dark'
    console.log(currTheme)
    applyTheme(newTheme)
}

