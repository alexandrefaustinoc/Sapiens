//Código js do carrossel na página Palestras

var counter = 1;
setInterval(function () {
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if (counter > 4) {
      counter = 1;
  }
}, 5000);

function changeSlide(slidePosition) {
    counter = slidePosition;
}

