require('dotenv').config();
const express = require('express');
const app = express();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const port  = process.env.PORT;

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// app.use(cors(corsOptions)); //dung cho tat ca route

const onLoadServer = ()=>{
    const time = new Date();
    console.log('Server started, time:', time.getMinutes(), time.getSeconds());
    console.log('Username:', process.env.DB_USERNAME);
    console.log('Password:', process.env.DB_PASSWORD);
}

// app.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

//app.use(cors()) se app dung cors cho tat ca route
// chi dinh cors o 1 route nhat dinh thi dung kieu middleware
// app.get('/', cors, ()=>{
//     //dosomething...
// });
app.get('/product', cors(corsOptions),(req, res, next)=>{
    res.json({msg: 'this is cors-enabled for single route'});
})

app.get('/', (req, res)=>{

    fs.readdir('./files', (err, filenames)=>{
        if(err){
            console.log(err);
            // return;
        }
        console.log(filenames);
    });

    res.sendFile(__dirname + '/view/uploadForm.html');
});

const uploadFolder = path.join(__dirname, 'files');
const formidableOptions = {
    multiples: true,
    maxFileSize: 50*1024*1024,
    uploadDir: uploadFolder
}
app.post('/uploadFile', (req, res)=>{
    const form = new formidable.IncomingForm(formidableOptions);

    form.parse(req, async (err, fields, files)=>{
        if(err){
            console.log("Error parsing the files");
            return res.status(404).json({
                status: "Fail",
                message: "There was an error parsing the files",
                error: err
            });
        }
        const file = files.myFile;
        const fileName = file.originalFilename;
        const oldPath = file.filepath;
        const newPath = path.join(uploadFolder, fileName);
        try{
            //form parse se luu file upload vao thu muc theo path uploadDir
            //nhung se luu ten theo dang ma so
            //nen can rename lai theo dinh dang chu cai + duoi file (dinh dang file)
            //rename tu ma so thanh ten + dinh dang file
            fs.renameSync(oldPath, newPath);
            res.send(`File ${fileName} uploaded successfully!`);
            console.log("Got new file:", path.basename(fileName));
        }
        catch(error){
            console.log(error);
            res.send(`Fail to load ${fileName}, try again!`);
        }
    });  
});

app.get('/*', (req, res)=>{
    res.send('lost your way ?');
});

app.listen(port, onLoadServer);