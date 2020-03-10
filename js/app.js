'use strict';

var imageElements = document.getElementsByClassName('clickers');
var imageIndexOne = 0;
var imageIndexTwo = 1;
var imageIndexThree = 2;
var rounds = 25;
var totalClicks = 0;
var allImages = [];

function Image(name, imageUrl) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.timesClicked = 0;
    this.timesShown = 0;
    allImages.push(this);
}

new Image('R2D2 Bag', 'images/bag.jpg');
new Image('Banana Slicer', 'images/banana.jpg');
new Image('TP Stand', 'images/bathroom.jpg');
new Image('Mud Boots', 'images/boots.jpg');
new Image('Breakfast Appliance', 'images/breakfast.jpg');
new Image('Meatball Bubblegum', 'images/bubblegum.jpg');
new Image('Chair', 'images/chair.jpg');
new Image('Cthulhu', 'images/cthulhu.jpg');
new Image('Doggy Duck Beak', 'images/dog-duck.jpg');
new Image('Dragon Meat', 'images/dragon.jpg');
new Image('Pen Utensils', 'images/pen.jpg');
new Image('Pet Broom Boots', 'images/pet-sweep.jpg');
new Image('Pizza Scissors', 'images/scissors.jpg');
new Image('Shark', 'images/shark.jpg');
new Image('Baby Broom Onsey', 'images/sweep.png');
new Image('Tauntaun Sleeping Bag', 'images/tauntaun.jpg');
new Image('Unicorn Meat', 'images/unicorn.jpg');
new Image('Tentacle Usb', 'images/usb.gif');
new Image('Water Can', 'images/water-can.jpg');
new Image('Wine Glass', 'images/wine-glass.jpg');

function clickedImage(event) {
    totalClicks++;

    if (event.srcElement.id === 'first-image') {
        allImages[imageIndexOne].timesClicked++;
    } else if (event.srcElement.id === 'second-image') {
        allImages[imageIndexTwo].timesClicked++;
    } else if (event.srcElement.id === 'third-image') {
        allImages[imageIndexThree].timesClicked++;
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
    allImages[imageIndexOne].timesShown++;
    imageElements[1].src = allImages[imageIndexTwo].imageUrl;
    allImages[imageIndexTwo].timesShown++;
    imageElements[2].src = allImages[imageIndexThree].imageUrl;
    allImages[imageIndexThree].timesShown++;

    if (totalClicks >= rounds) {
        for (var j = 0; j < imageElements.length; j++) {
            imageElements[j].removeEventListener('click', clickedImage);
        }
        var unorderedList = document.getElementById('results');
        for (var x = 0; x < allImages.length; x++) {
            var listItems = document.createElement('li');
            listItems.textContent = (allImages[x].name + ' had ' + allImages[x].timesClicked + ' votes and was shown ' + allImages[x].timesShown + ' times');
            unorderedList.appendChild(listItems);
        }
    }
}

for (var i = 0; i < imageElements.length; i++) {
    imageElements[i].addEventListener('click', clickedImage);
}