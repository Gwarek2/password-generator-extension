import { passwordParameters } from "./settings.js"

// Get password from server
export async function getPassword() {
    // Setting url
    const url = new URL(`https://password-generator-api.herokuapp.com/generate`)
    Object.keys(passwordParameters).forEach(key => url.searchParams.append(key, passwordParameters[key]))

    const response = await fetch(url)
    const data     = await response.json()

    return {
        data: data, 
        status: response.status
    }
}