// Selectors
const $parametersSwitchImg = document.querySelector('#parameters-header img')
const $passwordLength      = document.querySelector('#length')
const $letters             = document.querySelector('#letters')
const $letterOptions       = document.querySelectorAll('input.letter-option')
const $digits              = document.querySelector('#digits')
const $specialSymbols      = document.querySelector('#special-symbols')
const $customSS            = document.querySelector('#custom-special-symbols')
const $generatedPassword   = document.querySelector('#generated-password')
const $visionSwitchImg     = document.querySelector('#vision-switch img')
const $messageField        = document.querySelector('#message small')


// Get password from server
async function getPassword(parameters) {
    // Setting url
    const url = new URL(`https://password-generator-api.herokuapp.com/generate`)
    Object.keys(parameters).forEach(key => url.searchParams.append(key, parameters[key]))

    const response = await fetch(url)
    const data     = await response.json()

    if (response.status == 200) {
        $messageField.innerText = 'Successfully generated!'
        $messageField.style.color = 'lightgreen'
        return await data.string
    } else {
        $messageField.innerText = data.error
        $messageField.style.color = 'red'
        return ''
    }
}

// Loading parameters from storage
function loadParameters(parameter) {
    const section = parameter === 'password' ? 'parameters' : 'app_parameters'
    try {
        const JSONParameters = localStorage.getItem(section)
        const parameters     = JSON.parse(JSONParameters)
        return parameters !== null ? parameters : {}
    } catch {
        console.error('Could not load parameters from local storage.')
        return {}
    }
}