import { appSettings, passwordParameters } from "./settings.js"


const $parametersSwitch     = document.querySelector('#parameters-header')
const $parametersSwitchImg  = document.querySelector('#parameters-header img')
const $passwordLength       = document.querySelector('#length')
const $passwordParameters   = document.querySelector("#parameters")
const $letters              = document.querySelector('#letters')
const $letterOptions        = document.querySelectorAll('input.letter-option')
const $letterOptionsChecked = document.querySelectorAll('input.letter-option:checked')
const $digits               = document.querySelector('#digits')
const $specialSymbols       = document.querySelector('#special-symbols')
const $customSS             = document.querySelector('#custom-special-symbols')
const $generatedPassword    = document.querySelector('#generated-password')
const $generateButton       = document.querySelector('#generate')
const $copyButton           = document.querySelector('#copy')
const $visionSwitch         = document.querySelector('#vision-switch')
const $visionSwitchImg      = document.querySelector('#vision-switch img')
const $messageField         = document.querySelector('#message small')


function changeSettings(settings) {
    switch (settings) {
        case 'password-visibility':
            appSettings.visible = !appSettings.visible
            break
        case 'parameters-visibility':
            appSettings.hide_parameters = !appSettings.hide_parameters
            break
        case 'password-parameters':
            passwordParameters.count = $passwordLength.value
            passwordParameters.letters = $letters.checked ? 'on' : ''
            $letterOptions.forEach((option) => passwordParameters[option.id] = option.checked ? 'on' : '')
            passwordParameters.digits = $digits.checked ? 'on' : ''
            passwordParameters.special_symbols = $specialSymbols.checked ? 'on' : ''
            $customSS.disabled = !$specialSymbols.checked
            if ($customSS.value && !$customSS.disabled) passwordParameters.special_symbols = $customSS.value
            break
        default:
            console.error('Wrong parameters to change')
    }
}

function applySettings() {
    if (appSettings.visible) {
        $visionSwitchImg.src = "images/visible.png"
        $visionSwitchImg.title = "Hide password"
        $generatedPassword.type = "text"
    } else {
        $visionSwitchImg.src = "images/invisible.png"
        $visionSwitchImg.title = "Show password"
        $generatedPassword.type = "password"
    }
    if (appSettings.hide_parameters) {
        $parametersSwitchImg.style.transform = "rotate(0deg)"
        $passwordParameters.style.display = "none"
    } else {
        $parametersSwitchImg.style.transform = "rotate(90deg)"
        $passwordParameters.style.display = "flex"
    }
}

function applyPasswordParameters() {
    $passwordLength.value   = passwordParameters.count
    $letterOptions.forEach((option) => option.checked = passwordParameters[option.id])
    const checkedCount      = $letterOptionsChecked.length
    $letters.indeterminate  = checkedCount > 0 && checkedCount < $letterOptions.length
    $letters.checked        = passwordParameters.letters ? true : false
    $digits.checked         = passwordParameters.digits ? true : false
    if (passwordParameters.special_symbols !== 'on' && passwordParameters.special_symbols) {
        $customSS.value = passwordParameters.special_symbols
    }
    $specialSymbols.checked = passwordParameters.special_symbols ? true : false
    $customSS.disabled = !$specialSymbols.checked
}

function passwordOutput(output) {
    console.log(output)
    if (output.status == 200) {
        $messageField.textContent = 'Successfully generated!'
        $messageField.style.color = 'lightgreen'
        $generatedPassword.value = output.data.string
    } else {
        $messageField.textContent = output.data.error
        $messageField.style.color = 'red'
    }
}

export { 
    // Selectors
    $parametersSwitch, $visionSwitch, $passwordParameters, $letters, $letterOptions,
    $generatedPassword, $generateButton, $copyButton,

    // Procedures
    changeSettings, applySettings, applyPasswordParameters, passwordOutput 
}
