import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const URL = "http://localhost:7767/images"
  const [images, setImages] = useState([])

  // Get data from server - will be in a separated file
  const fetchData = async () => {
    try {
      const responseJson = await fetch(URL)
      const responseObject = responseJson.json()
      return responseObject
    }
    catch (error) {
      console.error(error)
      return error
    }
  } // ** returns with an object array


  // Call Fetch function and set database state
  const getImagesDatabase = async () => {
    const imagesData = await fetchData()
    // console.log(imagesData)
    setImages(imagesData)
  }


  // Kick in onMount
  useEffect(() => {
    getImagesDatabase()
  }, [])


  // DELETE image: HTTP request and re-render
  const makeDeleteImageFunction = (imageId) => async (event) => {
    console.log(imageId)
    const deleteRequestObject = { id: imageId }
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteRequestObject)
    }
    const response = await fetch(URL, options)
    getImagesDatabase()
  }


  return (
    <div className="App">

      {/*       <div id='upload-section'>
        Input section
        <form ref='uploadForm' id='uploadForm' action='http://localhost:7767/images' method='post'
          encType="multipart/form-data">
          <input type="file" name="fileinput" id="file-input" required />
          <input type="text" name="titleinput" id="title-input" placeholder="title" maxlength="40" required />
          <input type="text" name="authorinput" id="author-input" placeholder="author" maxlength="30" required />
          <input type='submit' id="uploadButton" value='Upload!' />
          <p style="display: inline-block" id="server-message"></p>
        </form>
      </div> */}


      <div id='imageGridContainer'>
        {
          images.map(image => ( image &&
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
