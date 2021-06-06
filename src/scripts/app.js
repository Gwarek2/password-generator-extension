import {applySettings, applyPasswordParameters, saveParameters, getPassword, appSettings, passwordParameters} from './functions.js'
import * as selectors from './globals.js'

// Setup apllication
document.addEventListener('DOMContentLoaded', () => {
    applySettings()
    applyPasswordParameters()
})

// Hide/Show parameters switcher
document.querySelector('#parameters-header').addEventListener('click', () => {
    appSettings.hide_parameters = !appSettings.hide_parameters
    applySettings()
    saveParameters('app-settings')
})

// Switch visibility of generated password
selectors.$visionSwitch.addEventListener('click', () => {
    appSettings.visible = !appSettings.visible
    applySettings()
    saveParameters('app-settings')
})

// Save parameters on change
selectors.$passwordParameters.addEventListener('input', () => {

    passwordParameters.count           = selectors.$passwordLength.value
    passwordParameters.letters         = selectors.$letters.checked ? 'on' : ''
    selectors.$letterOptions.forEach((option) => passwordParameters[option.id]  = option.checked ? 'on' : '')
    passwordParameters.digits          = selectors.$digits.checked         ? 'on' : ''
    passwordParameters.special_symbols = selectors.$specialSymbols.checked ? 'on' : ''
    selectors.$customSS.disabled = !selectors.$specialSymbols.checked
    if (selectors.$customSS.value && !selectors.$customSS.disabled) passwordParameters.special_symbols = selectors.$customSS.value
    saveParameters('password-parameters')
})

// Generating password
selectors.$generateButton.addEventListener('click', async () => {
    const password = await getPassword()
    selectors.$generatedPassword.value = password ? password : ''
})

// Copy-to-clipboard 
selectors.$copyButton.addEventListener('click', (e) => {
    e.preventDefault()
    const copiedPassword = document.querySelector('#generated-password')
    copiedPassword.select()
    document.execCommand('copy')
})

// Nested checkboxes events
// Thanks to naveen segaran for solution https://codepen.io/96naveen/pen/PwVMJq/?editors=1010  
selectors.$letterOptions.forEach((option) => {
    option.addEventListener('click', () => {
        const checkedCount     = document.querySelectorAll('input.letter-option:checked').length
        selectors.$letters.indeterminate = checkedCount > 0 && checkedCount < $letterOptions.length
        selectors.$letters.checked       = checkedCount == $letterOptions.length
    })
})

selectors.$letters.addEventListener('click', () => {
    selectors.$letterOptions.forEach((option) => {
        option.checked = selectors.$letters.checked
    })
})