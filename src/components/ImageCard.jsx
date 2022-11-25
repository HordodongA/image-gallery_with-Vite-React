import makeDeleteImageFunction from "../api/MakeDeleteData.js"

function ImageCard({ image, initPage, setServerMessage }) {
    return (
        <div key={image.id} id={"card-" + image.id} className="imageCard">
            <div className="removeButton">
                <span className="material-symbols-outlined" onClick={makeDeleteImageFunction(image.id, initPage, setServerMessage)}>
                    delete
                </span>
            </div>
            <img src={image.url} alt={image.title} />
            <h4>{image.title}</h4>
            <h5>{image.photographer}</h5>
        </div>
    )
}

export default ImageCard