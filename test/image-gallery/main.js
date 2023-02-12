const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const images = ['1.jpg', `2.jpg`, `3.jpg`, `4.jpg`, `5.jpg`];
const alts = {
    '1.jpg' : 'Closeup of a human eye',
    '2.jpg' : 'Rock that looks like a wave',
    '3.jpg' : 'Purple and white pansies',
    '4.jpg' : 'Section of wall from a pharoah\'s tomb',
    '5.jpg' : 'Large moth on a leaf'
}

/* Looping through images */

for (const image of images) {
    const newImage = document.createElement('img');
    // newImage.setAttribute('src', `images/${image}`);
    // https://cdn.freecodecamp.org/curriculum/css-photo-gallery/1.jpg
    // newImage.setAttribute('src', `https://cdn.freecodecamp.org/curriculum/css-photo-gallery/${image}`);
    newImage.setAttribute('src', 'https://cdn.freecodecamp.org/curriculum/css-photo-gallery/' + image);
    newImage.setAttribute('alt', alts[image]);
    thumbBar.appendChild(newImage);
    newImage.addEventListener('click', e => {
        displayedImage.src = e.target.src;
        displayedImage.alt = e.target.alt;
    });
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
        btn.setAttribute('class','light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        btn.setAttribute('class','dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
});


function random(number) {
    return Math.floor(Math.random()*number);
}