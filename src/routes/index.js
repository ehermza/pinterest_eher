const { render } = require("ejs");
const { Router } = require("express");

// MODELS
const Image  = require('../models/Image');

const router = Router();

router.get("/", async (req, res) => {
    const imagenes = await Image.find();
    imagenes.forEach(function(img) {
        console.log(img.title);
    });
    console.log('wait a moment..');
    res.render('index');
});

router.get("/upload", (req, res) => {
    res.render("uploader");
});

router.post("/upload", async (req, res) => {
    const image = new Image();

    image.title = req.body.title;
    image.description = req.body.description;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    // image.created_at
    await image.save();

    console.log("you're going to upload a file...");
    console.log(req.file);
    res.redirect('/');
});
module.exports = router;