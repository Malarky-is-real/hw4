const modeButton = document.getElementById("navItem")
modeButton.addEventListener('click', themeChanger)
applyTheme(getPreferredTheme());



function getModePref(){
    try{
        const savedTheme = localStorage.getItem('theme')
        return savedTheme
    }
    catch{
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    }


}

function applyTheme(theme){
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
}




function themeChanger(){
    const currTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currTheme === 'dark' ? 'light' : 'dark'
    applyTheme(newTheme)
}

