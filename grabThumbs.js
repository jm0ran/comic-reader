fs = require("fs");
path = require("path");
jimp = require("jimp");
const { dir } = require("console");
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

/* const compressPNG = async (oPath, newName) => {
    console.log(oPath);
    const dest = path.join(__dirname, "public", "assets", "thumbnails", newName + ".jpg");
    const file = await imagemin([oPath], {
        destination: dest,
        plugins: [
            imageminMozjpeg({
                quality: 30
            })
        ]
    })
    console.log(file);
    //console.log(`Compressed to ${dest} from ${oPath}`)
} */



module.exports = {
    async run(){
        fs.promises.readdir(path.join(__dirname, "public", "comics"))
        
        .then(returnedFiles => {
            let directories = returnedFiles.filter(file => {
                let isDirectory = false;
                if (fs.lstatSync(path.join(__dirname, "public", "comics", file)).isDirectory()){
                    isDirectory = true;
                }
                return isDirectory;
            })
            return(directories);
        })
        .then(directories => {
            directories.forEach(folder => console.log(folder));
        })
        .catch(err => console.log(err.message));
    }
}