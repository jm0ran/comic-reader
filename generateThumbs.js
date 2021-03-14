const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');


module.exports = {
    async run(){ //notice the unique syntax for a shorthand function in an object literal
        const files = await imagemin(["public/assets/testCompression/*.{jpg,png}"], {
            destination: "public/assets/thumbnails",
            plugins: [
                imageminMozjpeg({
                    quality: 10
                })
            ]
        })
        console.log(files);
    }
}