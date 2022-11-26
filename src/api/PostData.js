import { url } from "../App"

async function postData(formData) {
    const response = await fetch(url, { method: "POST", body: formData })

    return response.status
}

export default postData