fs = require("fs");
path = require("path");
jimp = require("jimp");

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
                            let extension = ".jpg";
                            source = path.join(__dirname, "public", "comics", folder, cover);
                            destination = path.join(__dirname, "public", "assets", "testCompression", folder + extension);
                            if (cover.endsWith(".png")){
                               jimp.read(source, (err, image) => {
                                   if (err){
                                       throw err;
                                   }else{
                                       image.write(destination);
                                   }
                               }) 
                            }
                            else{
                                fs.copyFile(source, destination, (err) =>{
                                    if (err) throw err;
                                })
                            }
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