import { url } from "../App.jsx"

async function deleteData(imageId) {
    const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: imageId })
    }
    const response = await fetch(url, options)

    return response.status
}

export default deleteData