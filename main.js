const express = require("express"); //Imports express
const path = require("path"); //Node js module to deal with file paths
const fs = require("fs"); //fs is used to work with the file system

const app = express(); //Initializes a new app variable with express
class Comic {
    constructor(name){
        this.name = name;
        this.images = [];
        this.metadata = [];
    }
}
const comic1 = path.join(__dirname, "public", "comics", "1/");




app.get("/api/comics", (req, res) => { //When going to a website your computer is performing a get request, / is root of website, followed by function with request and response
    var returnData = new Array;
    var comicFolders = new Array;
    fs.readdir(path.join(__dirname, "public", "comics"), (err, files) =>{ //Read all files in /public/comics 
        if (err) throw err; //If error throw error
        files.forEach((file) => { //For each file
            if (fs.lstatSync(path.join(__dirname, "public", "comics", file)).isDirectory()){ //If the given file is a directory
                comicFolders.push(file)
            }
        })
        for (const comic of comicFolders){
            returnData.push(new Comic(comic))
        }

        res.json(returnData);
    })
    
    
    
    /*
    fs.readdir(comic1, (err, files) =>{
        if (err) throw err;
        console.log(files);
        (files.forEach((file) => {
            console.log(file);
        })
        res.json(files);
    })
    */
});


//Set a Static folder, kind of like default folder
app.use(express.static(path.join(__dirname, 'public')));




//Keep near bottom
const PORT = process.env.PORT || 5000; //Look for an enviornment variable named PORT or if it doesnt exist default to 5000

app.listen(PORT, () => {console.log(`Started Server on Port ${PORT}`)}) //Starts server, then runs a callback function to log what port server has started on