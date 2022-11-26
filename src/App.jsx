import { useEffect, useState } from "react"
import "./App.css"

import getData from "./api/GetData.js"
import postData from "./api/PostData"
import deleteData from "./api/DeleteData.js"

import ImageCard from "./components/ImageCard.jsx"

// Set api URL here
export const url = "http://localhost:7767/images"


function App() {

  // App state
  const [images, setImages] = useState([])

  const [titleInput, setTitleInput] = useState("")
  const [authorInput, setAuthorInput] = useState("")
  const [fileInputValue, setFileInputValue] = useState("")
  const [selectedFile, setSelectedFile] = useState({})
  const [serverMessage, setServerMessage] = useState("")


  // Call Fetch function and set App state
  const initPage = async () => {
    const imagesData = await getData()
    setImages(imagesData)
  }

  // Kick in window:onLoad
  useEffect(() => {
    initPage()
  }, [])

  const resetForm = () => {
    setTitleInput("")
    setAuthorInput("")
    setFileInputValue("")
    setSelectedFile({})
  }

  const deleteHandler = (imageId) => async () => {
    const response = await deleteData(imageId)
    setServerMessage((response === 200) ? "Image deleted from server." : "Response status: " + response.status)
    initPage()
  }

  const uploadHandler = async () => {
    if (!titleInput || !authorInput || !fileInputValue) {
      setServerMessage("Please choose a file and fill all fields before uploading!")
      return false
    }

    const formData = new FormData()
    formData.append("titleinput", titleInput)
    formData.append("authorinput", authorInput)
    formData.append("fileinput", selectedFile)

    const response = await postData(formData)
    setServerMessage((response === 201) ? "Image and data saved on server." : "Response status: " + response)

    resetForm()
    initPage()
  }

  
  return (
    <div className="App">

      <div id='upload-section'>
        <section id='uploadsection'>

          <input
            type="file"
            id="file-input"
            name="fileinput"
            value={fileInputValue}
            onChange={(event) => {
              setSelectedFile(event.target.files[0])
              setFileInputValue(event.target.value)
            }}
          />

          <input
            type="text"
            id="title-input"
            placeholder="title"
            maxLength="40"
            value={titleInput}
            onChange={event => setTitleInput(event.target.value)}
          />

          <input
            type="text"
            id="author-input"
            placeholder="author"
            maxLength="30"
            value={authorInput}
            onChange={event => setAuthorInput(event.target.value)}
          />

          <input
            type="submit"
            id="uploadButton"
            value="Upload!"
            onClick={uploadHandler}
          />

          <p id="server-message">{serverMessage}</p>
        </section>
      </div>


      <div id='imageGridContainer'>
        {/* {images.map(image => (image && ImageCard({key:image.id, image, initPage, setServerMessage})))} */}
        {images.map(image => (image &&
          <ImageCard
            key={image.id}
            image={image}
            onClickFunction={deleteHandler}
          />
        ))}

      </div>

    </div>
  )
}

export default App
