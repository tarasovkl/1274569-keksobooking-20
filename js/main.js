"use strict"

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPins = document.querySelector('.map__pins');

var elem = document.createElement('div');

var arr = [];

for (var i = 1; i < 9; i++) {
  arr[i] = {
    author: {
      avatar: "img/avatars/user0" + i + ".png",
    },
    offer: {
      title: "",
      address: "",
      price: 1000,
      type: "",
      rooms: 2,
      guests: 2,
      checkin: "",
      checkout: "",
      features: [],
      description: "",
      photos: [],
    },
    location: {
      x: 100 + 100 * i,
      y: 400
    }
  }
  var makeElement = function (tagName, className) {
    var element = document.createElement(tagName);
    if (className) {
    element.classList.add(className);
    }
    return element;
  };

  var createPin = function (map__pin) {
    var newButton = makeElement('button', 'map__pin');
    newButton.style = "left: " + map__pin.location.x + "px;" + "top: " + map__pin.location.y + "px;";
    newButton.type = "button";
    // newButton.setAttribute("type", "button")
    elem.appendChild(newButton);

    var picture = makeElement('img');
    picture.src = map__pin.author.avatar;
    picture.width = "40";
    picture.height = "40";
    picture.draggable = "";
    picture.alt = "Метка объявления"
    newButton.appendChild(picture);

    return newButton;
  }
  var pinItem = createPin(arr[i]);
}

arr.shift();

var template = document.querySelector('#pin').content;

var templateButton = document.querySelector('#pin').content.querySelector('button');

template.removeChild(templateButton);
template.appendChild(pinItem);
elem.append(pin.content.cloneNode(true));
mapPins.appendChild(elem);

console.log(template);
console.log(templateButton);
console.log(arr);



