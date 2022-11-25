import { url } from "../App.jsx"

const makeDeleteImageFunction = (imageId, initPage, setServerMessage) => async () => {
    const deleteRequestObject = { id: imageId }
    const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deleteRequestObject)
    }
    const response = await fetch(url, options)
    const responseStatus = response.status
    initPage()

    return (setServerMessage((responseStatus === 200) ?
        "Image deleted from server." :
        "Response status: " + response.status))
}

export default makeDeleteImageFunction