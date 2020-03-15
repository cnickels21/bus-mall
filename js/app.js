'use strict';

// Global variables used in multiple places throughout script

var imageElements = document.getElementsByClassName('clickers');
var imageIndexOne = 0;
var imageIndexTwo = 1;
var imageIndexThree = 2;
var rounds = 25;
var totalClicks = 0;
var allImages = [];

// Constructor function used to create interactive images on our page

function Image(name, imageUrl, timesClicked, timesShown) {
    this.name = name;
    this.imageUrl = imageUrl;
    if(timesClicked) {          // Used to layover previous data stored in local storage
        this.timesClicked = timesClicked;
    } else {                    // Used if there is no local storage data
    this.timesClicked = 0;
    }
    if(timesShown) {            // Same method as times clicked is used here
        this.timesShown = timesShown;
    } else {
    this.timesShown = 0;
    }
    allImages.push(this);       // Populates the empty array for use in other functions
}

// get items out of storage and turn them back into objects not strings
// for loop to set them back as new Images to collect new data for future storage

var savedImagesString = localStorage.getItem('savedImages');

if (savedImagesString) {
    var stringedImagesArray = JSON.parse(savedImagesString);
    for (var y = 0; y < stringedImagesArray.length; y++) {
        new Image(stringedImagesArray[y].name,
            stringedImagesArray[y].imageUrl,
            stringedImagesArray[y].timesClicked,
            stringedImagesArray[y].timesShown);
    }
} else {        // Creates our objects if no local storage exists
    new Image('R2D2 Bag', 'images/bag.jpg');
    new Image('Banana Slicer', 'images/banana.jpg');
    new Image('Mud Boots', 'images/boots.jpg');
    new Image('TP Stand', 'images/bathroom.jpg');
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
}

// Adds 1 to the images that are shown on initial loading of the page
allImages[0].timesShown++;
allImages[1].timesShown++;
allImages[2].timesShown++;

// Function used to generate the individual data for the chart
function getAllImages(propertyAnalyzed) {
    var answer = [];
    for (var k = 0; k < allImages.length; k++) {
        answer[k] = allImages[k][propertyAnalyzed];
    }
    return answer;
}

// Event listener function
function clickedImage(event) {

    totalClicks++; // Increment to limit the number of rounds in voting

    // Incrementation of individual object's times clicked when voted on
    if (event.srcElement.id === 'first-image') {
        allImages[imageIndexOne].timesClicked++;
    } else if (event.srcElement.id === 'second-image') {
        allImages[imageIndexTwo].timesClicked++;
    } else if (event.srcElement.id === 'third-image') {
        allImages[imageIndexThree].timesClicked++;
    }

    /* These 3 while loops generate the logic that guarantees no two images will appear twice in a row.  Creates a random generation of options to  be voted on */
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
    // Used in logic above to generate random selections
    imageIndexOne = nextFirstImage;
    imageIndexTwo = nextSecondImage;
    imageIndexThree = nextThirdImage;

    // Increments times shown for each image that appears in the voting process
    imageElements[0].src = allImages[imageIndexOne].imageUrl;
    allImages[imageIndexOne].timesShown++;
    imageElements[1].src = allImages[imageIndexTwo].imageUrl;
    allImages[imageIndexTwo].timesShown++;
    imageElements[2].src = allImages[imageIndexThree].imageUrl;
    allImages[imageIndexThree].timesShown++;

    // Ends voting when total clicks reaches the set amount of rounds
    if (totalClicks >= rounds) {

        //set image objects into local storage here as strings
        localStorage.setItem('savedImages', JSON.stringify(allImages));

        // Removes event listener at the end of the voting process
        for (var j = 0; j < imageElements.length; j++) {
            imageElements[j].removeEventListener('click', clickedImage);
            showMyChart();
        }

        // Renders our list to the page after voting has ended
        var unorderedList = document.getElementById('results');
        for (var x = 0; x < allImages.length; x++) {
            var listItems = document.createElement('li');
            listItems.textContent = (allImages[x].name + ' had ' + allImages[x].timesClicked + ' votes and was shown ' + allImages[x].timesShown + ' times.');
            unorderedList.appendChild(listItems);
        }
    }
}

// Event listener is created here to be called when the voting begins
for (var i = 0; i < imageElements.length; i++) {
    imageElements[i].addEventListener('click', clickedImage);
}

// Function to create and render the chart based on our data
function showMyChart() {
    var ctx = document.getElementById('show-chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: getAllImages('name'),
            fontColor: 'black',
            datasets: [{
                label: 'Number of Votes',
                data: getAllImages('timesClicked'),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1,
                order: 1,
            },
            {
                label: 'Times Viewed',
                data: getAllImages('timesShown'),
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
                order: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}