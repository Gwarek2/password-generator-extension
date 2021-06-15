// Loading parameters from storage
function loadSettings(parametersName) {
    try {
        const JSONParameters   = localStorage.getItem(parametersName)
        const loadedParameters = JSON.parse(JSONParameters)
        return loadedParameters ? loadedParameters : {}
    } catch (e) {
        console.error(e)
        return {}
    }
}

function saveSettings(parametersName) {
    localStorage.setItem(parametersName, JSON.stringify(parametersName === 'password-parameters' ? passwordParameters : appSettings))
}


let appSettings = loadSettings('app-settings')
let passwordParameters = loadSettings('password-parameters')


export { appSettings, passwordParameters, saveSettings }