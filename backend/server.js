const express = require("express")
const fs = require("fs")
const fileUpload = require('express-fileupload')
const cors = require("cors")
const app = express()
const port = 7767

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static(`${__dirname}/../frontend/`));       // Mivel az index.html ebben a mappában van, nem kell külön kiszolgálni így: app.get("/", (req, res) => {res.sendFile(path.join(`${__dirname}/../frontend/index.html`))})
app.use("/images/", express.static(`${__dirname}/images/`));


app.get("/images", (req, res) => {
    const imagesJson = fs.readFileSync("./images/images.json")
    const imagesObj = JSON.parse(imagesJson)
    res.status(200).json(imagesObj)
}) // ** WORKS


app.post("/images", (req, res) => {
    // GET and SET counter
    const counterFilePath = `${__dirname}/images/counter.json`
    let counterJson = fs.readFileSync(counterFilePath)
    let counterObj = JSON.parse(counterJson)
    counterActual = counterObj.counter + 1
    // Check if file uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.")
    }
    // The name of the input field (i.e. "fileinput") is used to retrieve the uploaded file
    const sampleFile = req.files.fileinput;
    const uploadPath = `${__dirname}/images/image_${counterActual}.jpg`
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
        res.sendStatus(201)
    });
    // WRITE counter with new value
    counterObj.counter = counterActual
    counterJson = JSON.stringify(counterObj)
    fs.writeFile(counterFilePath, counterJson, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    })
    // LOAD, update and write images' database
    const dataBaseFilePath = `${__dirname}/images/images.json`
    let imagesJson = fs.readFileSync(dataBaseFilePath)
    let imagesObj = JSON.parse(imagesJson)
    const dateAndTime = JSON.stringify(new Date()).replaceAll(":", "-").replaceAll("T", "_").replaceAll('"', '').slice(0, 19)     // Format: 2022-10-27_16-09-16
    const uploadedData = {
        id: counterActual,
        url: `/backend/images/image_${counterActual}.jpg`,
        title: req.body.titleinput,
        photographer: req.body.authorinput,
        uploaded: dateAndTime
    }
    imagesObj.push(uploadedData)
    imagesJson = JSON.stringify(imagesObj)
    fs.writeFile(dataBaseFilePath, imagesJson, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err)
        }
    })
}) // ** WORKS


app.delete("/images", (req, res) => {
    const picturePath = `${__dirname}/images/image_${req.body.id}.jpg`
    fs.unlinkSync(picturePath, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    });
    // LOAD, update and write images' database
    const dataBaseFilePath = `${__dirname}/images/images.json`
    let imagesJson = fs.readFileSync(dataBaseFilePath)
    let imagesObj = JSON.parse(imagesJson)
    //Images ID equals to jamges.json array index
    delete imagesObj[req.body.id]
    imagesJson = JSON.stringify(imagesObj)
    fs.writeFile(dataBaseFilePath, imagesJson, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err)
        }
    })
    res.sendStatus(200)
}) //** WORKS


app.listen(port, () => {
    console.log(`Server is listening to port ${port}.\nCtrl + C to stop process.`);
})
