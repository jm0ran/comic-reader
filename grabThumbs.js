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
        .then(async directories => {
            const thumbs = new Array;
            for (const folder of directories){
                await fs.promises.readdir(path.join(__dirname, "public", "comics", folder))
                .then(result => {
                    for(let i = 0; i < result.length; i++){
                        if (i == 0){
                            thumbs.push(path.join(__dirname, "public", "comics", folder, result[i]))
                        }
                        else{
                            break;
                        }
                    }
                });
            }
            return thumbs;

        })
        .then(thumbs => console.log(thumbs))
        .catch(err => console.log(err.message));
    }
}