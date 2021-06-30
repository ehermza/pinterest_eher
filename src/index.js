const { render } = require('ejs');
const express = require('express');
const multer = require('multer');
const path = require('path');
// const uuid = require('uuid/v4');
const { v4 } = require('uuid');

const morgan= require('morgan');

// Iniciando...
const app = express();
require('./database');

// Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, "/views"));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));

//Global Variables

const dir= path.join(__dirname + "/upload/images/");

const st= multer.diskStorage({
    destination: dir,
    filename: (req, file, cb) =>{
        const fn= v4() + path.extname(file.originalname);
        // console.log(`filename: ${fn}`);
        cb(null, path.join(fn));
    }
});
app.use(multer({storage:st}).single('pk'));

app.use(require('./routes/index'));

//
app.listen(app.get('port'), () => {
    console.log("Server: listen port " + app.get('port'));
    const tl = path.join(__dirname + "upload/images/");
    console.log(tl);
});
