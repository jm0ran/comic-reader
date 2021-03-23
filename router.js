const routes = require("express").Router();
const fs = require("fs");

routes.get("/home", (req, res) => {
    res.render("mainPage", {})
})



//Returns comic directory to user, only returns folders
routes.get("/api/comics", (req, res) => { //When going to a website your computer is performing a get request, / is root of website, followed by function with request and response
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

routes.get("/api/comics/:id/", (req,res) => {
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

routes.get("/api/comics/:id/thumb", (req, res) => {
    let formatId = req.params.id.replace("&", ' ');
    let thumbPath = path.join(__dirname, "public", "assets", "thumbnails", formatId + ".jpg");
    res.sendFile(thumbPath);
})

routes.get("/api/comics/:id/:fileName", (req, res) => {
    formatFolder = req.params.id.replace('&', ' ');
    formatFile = req.params.fileName.replace('&', ' ');
    console.log("request");
    let filePath = path.join(__dirname, "public",  "comics", formatFolder, formatFile);
    res.sendFile(filePath);

})

routes.get("/:comicName", (req, res) => {
    res.render("reader", {data: {message : req.params.comicName}});
    //res.json(req.params.comicName);
})


module.exports = routes;