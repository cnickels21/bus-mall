'use strict';

var imageElements =  document.getElementsByClassName('clickers');
var imageIndexOne = 0;
var imageIndexTwo = 1;
var imageIndexThree = 2;
var rounds = 25;
var totalClicks = 0;
var allImages = [];

function Image(name, imageUrl) {
    this.name =  name;
    this.imageUrl = imageUrl;
    this.timesClicked = 0;
    this.timesShown = 0;
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
        allImages[imageIndexOne].timesShown++;
    } else if (event.srcElement.id === 'second-image') {
        allImages[imageIndexTwo].timesClicked++;
        allImages[imageIndexTwo].timesShown++;
    } else if (event.srcElement.id === 'third-image') {
        allImages[imageIndexThree].timesClicked++;
        allImages[imageIndexThree].timesShown++;
    }
    var nextFirstImage = Math.floor(Math.random() * allImages.length);
    while ((nextFirstImage === imageIndexOne) || (nextFirstImage === imageIndexTwo) || (nextFirstImage === imageIndexThree) || (nextSecondImage === nextFirstImage) || (nextThirdImage === nextFirstImage)) {
        nextFirstImage = Math.floor(Math.random() * allImages.length);
    }

    var nextSecondImage = Math.floor(Math.random() * allImages.length);
    while ((nextSecondImage === imageIndexTwo) || (nextSecondImage === imageIndexOne) || (nextSecondImage === imageIndexThree) || (nextSecondImage === nextFirstImage) || (nextSecondImage === nextThirdImage)) {
        nextSecondImage = Math.floor(Math.random() * allImages.length);
    }

    var nextThirdImage = Math.floor(Math.random() * allImages.length);
    while ((nextThirdImage === imageIndexThree) || (nextThirdImage === imageIndexOne) || (nextThirdImage === imageIndexTwo) || (nextThirdImage === nextFirstImage) || (nextThirdImage === nextSecondImage)) {
        nextThirdImage = Math.floor(Math.random() * allImages.length);
    }

    imageIndexOne = nextFirstImage;
    imageIndexTwo = nextSecondImage;
    imageIndexThree = nextThirdImage;

    imageElements[0].src = allImages[imageIndexOne].imageUrl;
    imageElements[1].src = allImages[imageIndexTwo].imageUrl;
    imageElements[2].src = allImages[imageIndexThree].imageUrl;

    console.log(imageIndexOne);

    if(totalClicks >= rounds) {

        var asideElement = document.getElementsByTagName('aside')[0];
        asideElement.textContent = ``;

        for (var j = 0; j < imageElements.length; j++) {
            imageElements[j].removeEventListener('click', clickedImage);
        }
    }
}

for (var i = 0; i < imageElements.length; i++) {
    imageElements[i].addEventListener('click', clickedImage);
}