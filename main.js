const express = require("express"); //Imports express
const path = require("path"); //Node js module to deal with file paths
const fs = require("fs"); //fs is used to work with the file system
const ejs = require("ejs")//

const grabThumbs = require("./grabThumbs");

grabThumbs.run();

const app = express(); //Initializes a new app variable with express


//Set a Static folder, kind of like default folder
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

app.get("/home", (req, res) => {
    res.render("mainPage", {})
})



//Returns comic directory to user, only returns folders
app.get("/api/comics", (req, res) => { //When going to a website your computer is performing a get request, / is root of website, followed by function with request and response
    let comicFolders = new Array;
    fs.readdir(path.join(__dirname, "public", "comics"), (err, files) =>{ //Read all files in /public/comics 
        if (err) throw err; //If error throw error
        let results = [];
        files.forEach((file, index) => { //For each file
            if (fs.lstatSync(path.join(__dirname, "public", "comics", file)).isDirectory()){ //If the given file is a directory
                results.push(file)//Push folder name to comicFolders Array
            }
        })
        res.json({results: results});    
    })
});

app.get("/api/comics/:id/", (req,res) => {
    let formatId = req.params.id.replace("&", ' ');
    let comicPath = path.join("comics", formatId);
    let results = new Array;
    fs.readdir(path.join(__dirname, "public", "comics", formatId), (err, files) =>{
        if (err) throw err;
        files.forEach((file)=>{
            if (file.endsWith(".jpg") || file.endsWith(".png") || file.endsWith(".jpeg")){
                results.push(file);
            }
        })
        res.json({parent: comicPath, results: results});
    })
})

app.get("/api/comics/:id/:fileName", (req, res) => {
    formatFolder = req.params.id.replace('&', ' ');
    formatFile = req.params.fileName.replace('&', ' ');
    console.log("request");
    let filePath = path.join(__dirname, "public",  "comics", formatFolder, formatFile);
    res.sendFile(filePath);

})

app.get("/:comicName", (req, res) => {
    res.render("reader", {data: {message : req.params.comicName}});
    //res.json(req.params.comicName);
})






//Keep near bottom
const PORT = process.env.PORT || 5000; //Look for an enviornment variable named PORT or if it doesnt exist default to 5000

app.listen(PORT, () => {console.log(`Started Server on Port ${PORT}`)}) //Starts server, then runs a callback function to log what port server has started on