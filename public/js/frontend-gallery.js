// Author: Yin Dong

// Date: July 12, 2020

// Course module: CPRG 210

// Assignment: Assignment #2


// Menu Toggle button on home page

// fetch('http://localhost:3000/api/destinations')
fetch('https://assignment3-travel-expert.herokuapp.com/api/destinations')
  .then(function (response) {
    return response.json();
  })

  .then(function (destinations) {

    const imgList = destinations;

    let imgTemplate = '';

    const gallery = document.querySelector('.gallery-section');

    imgList.forEach(function (item) {
      imgTemplate +=
        `<figure>
        <a href="${item.url}">
          <img src="https://picsum.photos/id/${item.id}/250" alt="${item.fileName}">
        </a>
        
        <figcaption> <h3>${item.title} Awaits</h3></figcaption>
        <p class="">${item.detail}</p>
        </figure>`;
    });

    gallery.innerHTML = imgTemplate;

  });

