// Hide/Show parameters switcher
document.querySelector('#parameters-header').addEventListener('click', () => {
    let appParameters = loadParameters('appParameters')
    appParameters.hide_parameters = !appParameters.hide_parameters
    if (appParameters.hide_parameters) {
        $parametersSwitchImg.style.transform = "rotate(0deg)"
        document.querySelector("#parameters").style.display = "none"
    } else {
        $parametersSwitchImg.style.transform = "rotate(90deg)"
        document.querySelector("#parameters").style.display = "flex"
    }
    localStorage.setItem('app_parameters', JSON.stringify(appParameters))
})

// Save parameters on change
document.querySelector("#parameters").addEventListener('input', () => {
    passwordParameters = {}

    passwordParameters.count           = $passwordLength.value
    passwordParameters.letters         = $letters.checked ? 'on' : ''
    $letterOptions.forEach((option) => passwordParameters[option.id]  = option.checked ? 'on' : '')
    passwordParameters.digits          = $digits.checked         ? 'on' : ''
    passwordParameters.special_symbols = $specialSymbols.checked ? 'on' : ''
    $customSS.disabled = !$specialSymbols.checked
    if ($customSS.value && !$customSS.disabled) passwordParameters.special_symbols = $customSS.value
    localStorage.setItem('parameters', JSON.stringify(passwordParameters))
})

// Generating password
document.querySelector('#generate').addEventListener('click', async () => {
    passwordParameters = await loadParameters('password')

    const password = await getPassword(passwordParameters)

    $generatedPassword.value = password ? password : ''
})

// Copy-to-clipboard event
document.querySelector("#copy").addEventListener('click', (e) => {
    e.preventDefault()
    const copiedPassword = document.querySelector('#generated-password')
    copiedPassword.select()
    document.execCommand('copy')
})

// Switches visibility of generated password
document.querySelector('#vision-switch').addEventListener('click', () => {
    let appParameters = loadParameters('appParameters')
    appParameters.visible = !appParameters.visible
    if (appParameters.visible) {
        $visionSwitchImg.src = "images/visible.png"
        $visionSwitchImg.title = "Hide password"
        $generatedPassword.type = "text"
    } else {
        $visionSwitchImg.src = "images/invisible.png"
        $visionSwitchImg.title = "Show password"
        $generatedPassword.type = "password"
    }
    localStorage.setItem('app_parameters', JSON.stringify(appParameters))
})

// Nested checkboxes events
// Thanks to naveen segaran for solution https://codepen.io/96naveen/pen/PwVMJq/?editors=1010  
$letterOptions.forEach((option) => {
    option.addEventListener('click', () => {
        const checkedCount     = document.querySelectorAll('input.letter-option:checked').length

        $letters.indeterminate = checkedCount > 0 && checkedCount < $letterOptions.length
        $letters.checked       = checkedCount == $letterOptions.length
    })
})

$letters.addEventListener('click', () => {
    $letterOptions.forEach((option) => {
        option.checked = $letters.checked
    })
})