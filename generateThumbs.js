const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');


module.exports = {
    async run(){ //notice the unique syntax for a shorthand function in an object literal
        const files = await imagemin(["public/assets/testCompression/*.{jpg,png}"], {
            destination: "public/assets/thumbnails",
            plugins: [
                imageminMozjpeg({
                    quality: 30
                })
            ]
        })
        console.log(files);
    }
}

const files = await imagemin(["public/assets/temporary/*.{jpg,png}"], {
    destination: "public/assets/thumbnails",
    plugins: [
        imageminMozjpeg({
            quality: 30
        })
    ]
})
console.log(files)