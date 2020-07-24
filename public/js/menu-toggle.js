// Author: Yin Dong

// Date: July 12, 2020

// Course module: CPRG 210

// Assignment: Assignment #2


// Menu Toggle button on home page

const button = document.querySelector('.btn-navi');
const menu = document.querySelector('.menu ul');

// function statement
function eventHandler() {
  console.log('Menu is toggled');

  // This line of code runs only when `button` is clicked. The 'visible' class will the removed/added (or toggled) each time this event handler is invoked
  menu.classList.toggle('visible');
}

// The code in the `eventHandler` function (defined above) will be run (or "invoked") each time `button` is clicked
button.addEventListener('click', eventHandler);


