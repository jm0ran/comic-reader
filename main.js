const express = require("express"); //Imports express
const path = require("path"); //Node js module to deal with file paths
const fs = require("fs"); //fs is used to work with the file system
const ejs = require("ejs")//

const grabThumbs = require("./grabThumbs");
const routes = require("./router")

grabThumbs.run();

const app = express(); //Initializes a new app variable with express


//Set a Static folder, kind of like default folder
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.use("/", routes);







//Keep near bottom
const PORT = process.env.PORT || 5000; //Look for an enviornment variable named PORT or if it doesnt exist default to 5000

app.listen(PORT, () => {console.log(`Started Server on Port ${PORT}`)}) //Starts server, then runs a callback function to log what port server has started on