const modeButton = document.getElementById("modeButton")
modeButton.addEventListener('click', themeChanger)
applyTheme(getModePref());

const jsDepElems = document.getElementsByClassName('jsOff')
const baseLength = jsDepElems.length
for(let i = 0; i < baseLength; i++){
    console.log(i)
    jsDepElems[0].classList.replace('jsOff','na')
}


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
    const modeButton = document.getElementById('modeButton')
    modeButton.textContent = currTheme.replace(currTheme[0], currTheme[0].toUpperCase()) + " Mode"
    applyTheme(newTheme)
    
    

}

