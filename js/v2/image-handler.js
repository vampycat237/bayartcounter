//handles fetching and displaying images
const imagedisplay = document.getElementById("image-display");

//sets the displayed image to the one found at the given url
function setImage(url) {
    imagedisplay.src = url;
}