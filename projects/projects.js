// js is used to apply svg to each links so don't have to copy paste a bunch
// animation from https://codepen.io/aaroniker/pen/VwjexVy
const links = document.querySelectorAll('.project-links a');

for (let i=0;i<links.length; i++) {
    links[i].innerHTML += '<svg viewBox="0 0 70 36"><path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" /></svg>';
}