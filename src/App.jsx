import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [images, setImages] = useState([])


  // Get data from server - will be in a separated file
  const fetchData = async () => {
    try {
      const response = await (await fetch("http://localhost:7767/images")).json()
      return response
    }
    catch (error) {
      return error.response
      // console.error(error)
    }           // !! Consider adding an error boundary to your tree to customize error handling behavior.
  } // ** returns with an object array


  // Call Fetch function and set database state
  const getImagesDatabase = async () => {
    const imagesData = await fetchData()
    console.log(imagesData)
    setImages(imagesData)
  }


  // Kick in logic on mount
  useEffect(() => {
    getImagesDatabase()
  }, [])





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
        Image Grid
        {
          images.map(image => (
            <div key={image.id} id={"card-" + image.id} class="imageCard">
              <div class="removeButton">
                <span class="material-symbols-outlined">
                  delete
                </span>
              </div>
              <img src={movie.url} alt={movie.title} />
              <h4>
                {movie.title}
              </h4>
              <h5>
                {movie.photographer}
              </h5>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default App
