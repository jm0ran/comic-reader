const { DESTRUCTION } = require("dns");

fs = require("fs");
path = require("path");

module.exports = {
    async run(){
        fs.readdir(path.join(__dirname, "public", "comics"), (err, folders) =>{ //Read all files in /public/comics 
            if (err) throw err; //If error throw error
            let results = [];
            folders.forEach((folder, index) => { //For each file
                if (fs.lstatSync(path.join(__dirname, "public", "comics", folder)).isDirectory()){ //If the given file is a directory
                    fs.readdir(path.join(__dirname, "public", "comics", folder), (err, files) =>{
                      files.forEach((cover, index)=>{
                          if (index === 0){
                              source = path.join(__dirname, "public", "comics", folder, cover);
                              let extension = null;
                              if (cover.endsWith(".jpg")){
                                extension = ".jpg";
                              }
                              else if (cover.endsWith(".png")){
                                extension = ".png";
                              }
                              destination = path.join(__dirname, "public", "assets", "testCompression", folder + extension);
                              fs.copyFile(source, destination, (err) =>{
                                  if (err) throw err;
                              })
                          }
                          else{
                              return false;
                          }
                      })  
                    })
                }
            })
        })
    }
}