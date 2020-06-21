"use strict"

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var elem = document.createElement('div');
var avatarPath = ["img/avatars/user01.png", "img/avatars/user02.png", "img/avatars/user03.png", "img/avatars/user04.png", "img/avatars/user05.png", "img/avatars/user06.png", "img/avatars/user07.png", "img/avatars/user08.png",];
var offerType = ["palace", "flat", "house", "bungalo"];
var offerCheckin = ["12:00", "13:00", "14:00"];
var offerRooms = [1, 2, 3];
var offerFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var offerPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var arr = [];
var template = document.querySelector('#pin').content;
var templateButton = document.querySelector('#pin').content.querySelector('button');
var templateImg = document.querySelector('#pin').content.querySelector('img');

function getRandom(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function getRandomNumber(min, max) {
  var randNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randNumber);
}

map.classList.remove('map--faded');

var createData = function (value) {
  for (var i = 0; i < value; i++) {
    arr[i] = {
      author: {
        avatar: avatarPath[i]
      },
      offer: {
        title: "Заголовок",
        address: "600, 350",
        price: 1000,
        type: getRandom(offerType),
        rooms: getRandom(offerRooms),
        guests: 1,
        checkin: getRandom(offerCheckin),
        checkout: getRandom(offerCheckin),
        features: [offerFeatures.slice(0,getRandomNumber(1,offerFeatures.length))],
        description: "Описание",
        photos: [offerPhotos.slice(0,getRandomNumber(1,offerPhotos.length))],
      },
      location: {
        x: getRandomNumber(100, 1000),
        y: getRandomNumber(130, 600)
      }
    }
  }
};

createData(8);

var createButton = function (data) {
  for (var i = 0; i < data.length; i++) {
    templateImg.alt = data[i].offer.title;
    templateImg.src = data[i].author.avatar;
    var button = templateButton.cloneNode(true);
    button.style = "left: " + data[i].location.x + "px;" + "top:" + data[i].location.y + "px;";
    mapPins.appendChild(button);
  }
};
createButton(arr);
console.log(arr);



