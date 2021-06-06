import * as selectors from './globals.js'

// Load parameters
export let appSettings = loadParameters('app-settings')
export let passwordParameters = loadParameters('password-parameters')

// Get password from server
export async function getPassword() {
    // Setting url
    const url = new URL(`https://password-generator-api.herokuapp.com/generate`)
    Object.keys(passwordParameters).forEach(key => url.searchParams.append(key, passwordParameters[key]))


    const response = await fetch(url)
    const data     = await response.json()

    if (response.status == 200) {
        selectors.$messageField.innerText = 'Successfully generated!'
        selectors.$messageField.style.color = 'lightgreen'
        return await data.string
    } else {
        selectors.$messageField.innerText = data.error
        selectors.$messageField.style.color = 'red'
        return ''
    }
}

// Loading parameters from storage
export function loadParameters(parametersName) {
    try {
        const JSONParameters   = localStorage.getItem(parametersName)
        const loadedParameters = JSON.parse(JSONParameters)
        return loadedParameters ? loadedParameters : {}
    } catch (e) {
        console.error(e)
        return {}
    }
}

export function saveParameters(parametersName) {
    localStorage.setItem(parametersName, JSON.stringify(parametersName === 'password-parameters' ? passwordParameters : appSettings))
}

export function applySettings() {
    if (appSettings.visible) {
        selectors.$visionSwitchImg.src = "images/visible.png"
        selectors.$visionSwitchImg.title = "Hide password"
        selectors.$generatedPassword.type = "text"
    } else {
        selectors.$visionSwitchImg.src = "images/invisible.png"
        selectors.$visionSwitchImg.title = "Show password"
        selectors.$generatedPassword.type = "password"
    }
    if (appSettings.hide_parameters) {
        selectors.$parametersSwitchImg.style.transform = "rotate(0deg)"
        document.querySelector("#parameters").style.display = "none"
    } else {
        selectors.$parametersSwitchImg.style.transform = "rotate(90deg)"
        document.querySelector("#parameters").style.display = "flex"
    }
}

export function applyPasswordParameters() {
    selectors.$passwordLength.value   = passwordParameters.count
    selectors.$letterOptions.forEach((option) => option.checked = passwordParameters[option.id])
    const checkedCount      = document.querySelectorAll('input.letter-option:checked').length
    selectors.$letters.indeterminate  = checkedCount > 0 && checkedCount < selectors.$letterOptions.length
    selectors.$letters.checked        = passwordParameters.letters ? true : false
    selectors.$digits.checked         = passwordParameters.digits ? true : false
    if (passwordParameters.special_symbols !== 'on' && passwordParameters.special_symbols) {
        selectors.$customSS.value = passwordParameters.special_symbols
    }
    selectors.$specialSymbols.checked = passwordParameters.special_symbols ? true : false
    selectors.$customSS.disabled = !selectors.$specialSymbols.checked
}