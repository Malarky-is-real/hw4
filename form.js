
const form = document.getElementById('contactForm')

const nameField = document.getElementById('Name')
const emailField = document.getElementById('Email')
const textField = document.getElementById('Comments')
const errorsField = document.getElementById('form-errors')


const ariaField = document.getElementById('formStatus')
const ariaCount = document.getElementById('charCount')
const submitButton = document.getElementById('submitButton')



let globalWarnings = false


nameField.addEventListener('input', checkNameValidity, true)
nameField.addEventListener('invalid', checkNameValidity, true)


emailField.addEventListener('input', checkEmailValidity, true)
emailField.addEventListener('invalid', checkEmailValidity, true)


textField.addEventListener('input', updateCommentCount)

textField.addEventListener('input', checkCommentsValidity, true)
textField.addEventListener('invalid', checkCommentsValidity, true)

form.addEventListener('invalid', checkErrors, true)
form.addEventListener('submit', submitErrors)

let form_errors= []




function checkErrors(event){
    const failedField = event.target
    form_errors.push({field: failedField.name, message: failedField.validationMessage})
    console.log({field: failedField.name, message: failedField.validationMessage})
}


function submitErrors(){
    console.log("AAA")
    errorsField.value = JSON.stringify(form_errors)    
}


const currentErrors = {
    name: '',
    email: '',
    comments: ''
};

function statusAriaUpdater(){
    const activeErrors = [];
    if (currentErrors.name){ 
        activeErrors.push(currentErrors.name);
    }
    if (currentErrors.email){
        activeErrors.push(currentErrors.email)
    }
    if (currentErrors.comments)
    {
        activeErrors.push(currentErrors.comments)
    } 
    

    ariaField.textContent = activeErrors.join('\n')
    console.log(activeErrors)


}


function checkNameValidity(event){

    errorMessage = ''    

    if(nameField.validity.valueMissing || nameField.validity.tooShort){
        errorMessage += '\n- You need at least 1 character for the Name field. You are currently using ' + (nameField.value.length) + '.'
    }
    nameField.setCustomValidity(errorMessage)
    if(event.type != 'invalid'){
        nameField.reportValidity()
    }

    currentErrors.name = errorMessage
    statusAriaUpdater()
}

function checkEmailValidity(event){

    let errorMessage = ''

    if(emailField.validity.valueMissing || emailField.validity.typeMismatch){
        errorMessage += '\n - The input is not an valid email address. Check for an @ symbol or characters following the @ symbol.  \nExample format: a@b'
    }
    if(emailField.validity.tooShort){
        errorMessage += '\n - You need at least 3 characters for the Email field. You are currently using ' + (emailField.value.length) + '.'
    }


    
    emailField.setCustomValidity(errorMessage)
    if(event.type != 'invalid'){
        emailField.reportValidity()
    }

    currentErrors.email = errorMessage
    statusAriaUpdater()

}

function checkCommentsValidity(event){
    let errorMessage = ''
  

    if(textField.validity.valueMissing || textField.validity.tooShort){
        errorMessage += '\n- You need at least 10 characters for the Comments field.'
        
    }

    textField.setCustomValidity(errorMessage)
    if(event.type != 'invalid'){
        textField.reportValidity()
    }

    currentErrors.comments = errorMessage
    statusAriaUpdater()

    
}

function updateCommentCount(){
    let countMessage = 'Remaining Characters: ' + (textField.maxLength - textField.value.length)
    
    
    if(textField.value.length == textField.maxLength){
        countMessage = 'Character limit reached'
    }
    if(textField.value.length >= textField.maxLength - 100 ){
        ariaCount.classList.replace('notNear','nearMax')
    }
    else{
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

