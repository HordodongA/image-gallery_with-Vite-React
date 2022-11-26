function ImageCard({ image, onClickFunction }) {
    return (
        <div id={"card-" + image.id} className="imageCard">
            <div className="removeButton" onClick={onClickFunction(image.id)}>
                <span className="material-symbols-outlined">
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