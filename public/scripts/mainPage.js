fetch(`http://${window.location.hostname}:5000/api/comics/`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        loadComics(data)
    })
    .catch((err) => {
        console.log(err);
    });

const loadComics = (data) => {
    for (const item of data.results){
        const comicName = item.replace("&", " ");
        document.getElementById("bookCase").innerHTML += 
        `<a href="http://${window.location.hostname}:5000/${comicName}"><figure class="book"><img src="http://${window.location.hostname}:5000/api/comics/${comicName}/thumb" height="100%"> <figcaption> ${comicName} </figcaption></figure></a>`;
    }
}

