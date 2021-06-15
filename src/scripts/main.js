import { getPassword } from './requests.js'
import * as views from './views.js'
import * as settings from './settings.js'

// Setup apllication
document.addEventListener('DOMContentLoaded', () => {
    views.applySettings()
    views.applyPasswordParameters()
})

// Hide/Show parameters switcher
views.$parametersSwitch.addEventListener('click', () => {
    views.changeSettings('parameters-visibility')
    views.applySettings()
    settings.saveSettings('app-settings')
})

// Switch visibility of generated password
views.$visionSwitch.addEventListener('click', () => {
    views.changeSettings('password-visibility')
    views.applySettings()
    settings.saveSettings('app-settings')
})

// Save parameters on change
views.$passwordParameters.addEventListener('input', () => {
    views.changeSettings('password-parameters')
    settings.saveSettings('password-parameters')
})

// Generating password
views.$generateButton.addEventListener('click', async () => {
    const outputData = await getPassword()
    views.passwordOutput(outputData)
})

// Copy-to-clipboard 
views.$copyButton.addEventListener('click', (e) => {
    e.preventDefault()
    views.$generatedPassword.select()
    document.execCommand('copy')
})


/** Nested checkboxes events
 Thanks to naveen segaran for solution https://codepen.io/96naveen/pen/PwVMJq/?editors=1010  **/
views.$letterOptions.forEach((option) => {
    option.addEventListener('click', () => {
        const checkedCount     = document.querySelectorAll('input.letter-option:checked').length
        views.$letters.indeterminate = checkedCount > 0 && checkedCount < views.$letterOptions.length
        views.$letters.checked       = checkedCount == views.$letterOptions.length
    })
})

views.$letters.addEventListener('click', () => {
    views.$letterOptions.forEach((option) => {
        option.checked = views.$letters.checked
    })
})