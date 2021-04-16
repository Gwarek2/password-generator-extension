document.addEventListener('DOMContentLoaded', () => {
    
    // Load password parameters
    let passwordParameters  = loadParameters('password')
    
    $passwordLength.value   = passwordParameters.count
    $letterOptions.forEach((option) => option.checked = passwordParameters[option.id])
    const checkedCount      = document.querySelectorAll('input.letter-option:checked').length
    $letters.indeterminate  = checkedCount > 0 && checkedCount < $letterOptions.length
    $letters.checked        = passwordParameters.letters ? true : false
    $digits.checked         = passwordParameters.digits ? true : false
    if (passwordParameters.special_symbols !== 'on' && passwordParameters.special_symbols) {
        $customSS.value = passwordParameters.special_symbols
    }
    $specialSymbols.checked = passwordParameters.special_symbols ? true : false
    $customSS.disabled = !$specialSymbols.checked

    // Load application settings
    let appParameters = loadParameters('appParameters')
    if (appParameters.visible) {
        $visionSwitchImg.src = "images/visible.png"
        $visionSwitchImg.title = "Hide password"
        $generatedPassword.type = "text"
    } else {
        $visionSwitchImg.src = "images/invisible.png"
        $visionSwitchImg.title = "Show password"
        $generatedPassword.type = "password"
    }
    if (appParameters.hide_parameters) {
        $parametersSwitchImg.style.transform = "rotate(0deg)"
        document.querySelector("#parameters").style.display = "none"
    } else {
        $parametersSwitchImg.style.transform = "rotate(90deg)"
        document.querySelector("#parameters").style.display = "flex"
    }
})
