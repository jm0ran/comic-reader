const express = require("express"); //Imports express
const path = require("path"); //Node js module to deal with file paths

const app = express(); //Initializes a new app variable with express
const filePath = path.join(__dirname, "comics", "1", "vid.mp4");

/*
app.get("/", (req, res) => { //When going to a website your computer is performing a get request, / is root of website, followed by function with request and response
    res.sendFile(path.join(__dirname, "public", "index.html"))
});
*/ 

//Set a Static folder, kind of like default folder
app.use(express.static(path.join(__dirname, 'public')));




//Keep near bottom
const PORT = process.env.PORT || 5000; //Look for an enviornment variable named PORT or if it doesnt exist default to 5000

app.listen(PORT, () => {console.log(`Started Server on Port ${PORT}`)}) //Starts server, then runs a callback function to log what port server has started on