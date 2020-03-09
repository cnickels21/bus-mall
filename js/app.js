'use strict';

// var firstImageClicked = 0;
// var secondImageClicked = 0;
var imageElements =  document.getElementsByTagName('img');
var imageIndexOne = 0;
var imageIndexTwo = 1;
var totalClicks = 0;
var allImages = [];

function Image(name, imageUrl) {
    this.name =  name;
    this.imageUrl = imageUrl;
    this.timesClicked = 0;
    allImages.push(this);
}

// new Image('', '')
// new Image('', '')
// new Image('', '')
// new Image('', '')

function clickedImage(event) {
    totalClicks++;
    if(event.srcElement.id === 'first-image') {
        allImages[imageIndexOne].timesClicked++;
    } else if (event.srcElement.id === 'second-image') {
        allImages[imageIndexTwo].timesClicked++;
    }
    if(imageIndexOne + imageIndexTwo >= 25) {
        var footerElement = document.getElementsByTagName('footer')[0];
        footerElement.textContent = `You picked the first image ${imageIndexOne} times and the second image ${imageIndexTwo} times.`;
    }
}

for (var i = 0; i < imageElements.length; i++) {
    imageElements[i].addEventListener('click', clickedImage);
}