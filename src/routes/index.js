const { render } = require("ejs");
const { Router } = require("express");
const path = require('path');

// MODELS
const Image  = require('../models/Image');

const router = Router();

router.get("/", async (req, res) => {
    const imagenes = await Image.find();

    console.log('is moment to charge the images..');
    res.render('index', {imagenes});
});

router.get("/upload", (req, res) => {
    res.render("uploader");
});

router.post("/upload", async (req, res) => {
    const image = new Image();

    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = ("/upload/images/"+ req.file.filename);
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    
    // image.created_at
    await image.save();

    console.log("you're going to upload a file: ");
    console.log(image.path);
    res.redirect('/');
});
module.exports = router;