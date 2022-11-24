import { useEffect, useState } from 'react'
import './App.css'

const url = "http://localhost:7767/images"


function App() {
  
  // Database
  const [images, setImages] = useState([])

  const [titleInput, setTitleInput] = useState("")
  const [authorInput, setAuthorInput] = useState("")
  const [fileInputValue, setFileInputValue] = useState("")
  const [selectedFile, setSelectedFile] = useState({})
  const [serverMessage, setServerMessage] = useState("")
  
  
  // Get data from server  -- url
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

  // Call Fetch function and set database state
  const initPage = async () => {
    const imagesData = await getData()
    setImages(imagesData)
  }



  // Kick in window:onLoad
  useEffect(() => {
    initPage()
  }, [])



  // REMOVE image: DELETE HTTP request and re-render     -- setServerMessage, initpage
  const makeDeleteImageFunction = (imageId) => async (event) => {
    const deleteRequestObject = { id: imageId }
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteRequestObject)
    }
    const response = await fetch(url, options)
    setServerMessage((response.status === 200) ? "Image deleted server." : "Response status: " + response.status)

    initPage()
  }


  // UPLOAD image: POST HTTP request and re-render           --setServerMessage, titleInput, authorInput, fileInputValue, selectedFile, az összes set..., initPage
  const uploadHandler = async () => {
    setServerMessage("")
    if (!titleInput || !authorInput || !fileInputValue) {
      setServerMessage("Please choose a file and fill all fields before uploading!")
      return false
    }
    else {
      const formData = new FormData()
      formData.append("titleinput", titleInput)
      formData.append("authorinput", authorInput)
      formData.append("fileinput", selectedFile)

      const response = await fetch(url, { method: "POST", body: formData })
      setServerMessage((response.status === 201) ? "Image and data saved on server." : "Response status: " + response.status)
      setTitleInput("")
      setAuthorInput("")
      setFileInputValue("")
      setSelectedFile({})

      initPage()
    }
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
        {
          images.map(image => (image &&
            <div key={image.id} id={"card-" + image.id} className="imageCard">
              <div className="removeButton">
                <span className="material-symbols-outlined" onClick={makeDeleteImageFunction(image.id)}>
                  delete
                </span>
              </div>
              <img src={image.url} alt={image.title} />
              <h4>
                {image.title}
              </h4>
              <h5>
                {image.photographer}
              </h5>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default App
