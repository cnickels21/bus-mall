'use strict';

var imageElements =  document.getElementsByTagName('img');
var imageIndexOne = 0;
var imageIndexTwo = 1;
var imageIndexThree = 2;
var totalClicks = 0;
var allImages = [];

function Image(name, imageUrl) {
    this.name =  name;
    this.imageUrl = imageUrl;
    this.timesClicked = 0;
    allImages.push(this);
}

new Image('Bag', 'images/bag.jpg');
new Image('Banana', 'images/banana.jpg');
new Image('Bathroom', 'images/bathroom.jpg');
new Image('Boots', 'images/boots.jpg');
new Image('Breakfast', 'images/breakfast.jpg');
new Image('Bubblegum', 'images/bubblegum.jpg');
new Image('Chair', 'images/chair.jpg');
new Image('Cthulhu', 'images/cthulhu.jpg');
new Image('Dog-Duck', 'images/dog-duck.jpg');
new Image('Dragon', 'images/dragon.jpg');
new Image('Pen', 'images/pen.jpg');
new Image('Pet-Sweep', 'images/pet-sweep.jpg');
new Image('Scissors', 'images/scissors.jpg');
new Image('Shark', 'images/shark.jpg');
new Image('Sweep', 'images/sweep.png');
new Image('Tauntaun', 'images/tauntaun.jpg');
new Image('Unicorn', 'images/unicorn.jpg');
new Image('Usb', 'images/usb.gif');
new Image('Water-Can', 'images/water-can.jpg');
new Image('Wine-Glass', 'images/wine-glass.jpg');

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