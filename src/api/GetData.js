import { url } from "../App.jsx"

const getData = async () => {
    try {
        const responseJson = await fetch(url)
        const responseObject = responseJson.json()
        return responseObject
    }
    catch (error) {
        console.error(error)
        return error
    }
}

export default getData