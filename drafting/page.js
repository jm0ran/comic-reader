mainContainer = document.getElementById("mainContainer");
console.log(mainContainer.innerHTML)

resizeDiv = () => {
	document.getElementById("mainContainer").style.height = `${window.innerHeight}px`;
	console.log(window.innerHeight);
}


resizeDiv()
window.addEventListener("resize", resizeDiv);