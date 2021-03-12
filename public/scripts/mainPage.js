const loadComics = (data) => {
    for (const item of data.results){
        const comicName = item.replace("&", " ");
        document.getElementById("bookCase").innerHTML += 
        `<figure class="book"><img src="assets/1.jpg" height="100%"> <figcaption> ${comicName} </figcaption></figure>`;
    }
}

fetch("http://192.168.1.2:5000/api/comics/")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        loadComics(data)
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });