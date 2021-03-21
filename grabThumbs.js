fs = require("fs");
path = require("path");
jimp = require("jimp");
const { readdir } = require("fs");
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const Jimp = require("jimp");


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
                            thumbs.push([path.join(__dirname, "public", "comics", folder, result[i]), folder])
                        }
                        else{
                            break;
                        }
                    }
                });
            }
            return thumbs;

        })
        .then(async thumbs => {
            for (thumb of thumbs){
                const destination = path.join(__dirname, "public", "assets", "temporary", thumb[1] + ".jpg");
                if(thumb[0].toLowerCase().endsWith(".jpg")){
                    await fs.copyFile(thumb[0], destination, (err) => {
                        if (err) throw err;
                    });
                }else if(thumb[0].toLowerCase().endsWith(".png")){
                    await Jimp.read(thumb[0])
                        .then(image => image.write(destination))
                        .catch(err => console.log(err.message));
                }else{
                    console.log("Very Bad big issue, will be big problem")
                }
                console.log("done")
            }
            
            return thumbs;
        })
        .then(async result => {
            const files = await imagemin(["public/assets/temporary/*.{jpg,png}"], {
                destination: "public/assets/thumbnails",
                plugins: [
                    imageminMozjpeg({
                        quality: 30
                    })
                ]
            })
        })
        .catch(err => console.log(err.message));
    }
}