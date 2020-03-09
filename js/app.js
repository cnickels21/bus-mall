'use strict';

// var firstImageClicked = 0;
// var secondImageClicked = 0;
var imageIndexOne = 0;
var imageIndexTwo = 1;
var totalClicks = 0;
var allImages = [];

function Image(name, imageUrl) {
    this.name =  name;
    this.imageUrl = imageUrl;
}

new Image('', '')
new Image('', '')
new Image('', '')
new Image('', '')

function clickedImage() {
    if(event.srcElement.id === 'first-image') {
        firstImageClicked++;
    } else if (event.srcElement.id === 'second-image') {
        secondImageClicked++;
    }
    if(firstImageClicked + secondImageClicked >= 5) {
        var footerElement = document.getElementsByTagName('footer')[0];
        footerElement.textContent = `You picked the first image ${firstImageClicked} times and the second image ${secondImageClicked} times.`;
    }
}

var imageElements =  document.getElementsByTagName('img');
for (var i = 0; i < imageElements.length; i++) {
    imageElements[i].addEventListener('click', clickedImage);
}