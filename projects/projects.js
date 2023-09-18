// apply svg to each links so don't have to copy paste a bunch
// animation from https://codepen.io/aaroniker/pen/VwjexVy

function isSafari() {
    return /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
}

function render_links() {
    const links = document.querySelectorAll('.project-links a');

    for (let link of links) {
        const n_char_per_unit = 6;
        const length_per_unit = 66;
        const link_n_chars = link.innerText.length;
        const scale = link_n_chars / n_char_per_unit;

        const new_width = `${length_per_unit * scale}px`;
        const view_box_width = 70;

        // Create SVG and its child elements
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        // Set attributes
        svg.setAttribute('viewBox', `0 0 ${view_box_width * scale} 36`);
        svg.setAttribute('style', `width:${new_width}`);
        g.setAttribute('transform', `scale(${scale} 1)`);
        path.setAttribute('d', 'M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527');

        // Append child elements
        g.appendChild(path);
        svg.appendChild(g);
        
        // Append to link
        link.innerText = " " + link.innerText + " ";
        
        svg.getBoundingClientRect();
        svg.setAttribute('width', `${view_box_width * scale}`);
        svg.setAttribute('height', '36');
        var length = path.getTotalLength();
        console.log(link.innerText, link_n_chars, new_width);

        // // Change differently if safari.
        // // This is a hack that experimentally kind of works. TODO: figure out why?
        // if (isSafari()) {
        //     length *= 0.81;
        // }

        svg.style.setProperty('--path-length', `${length}px`);

        link.appendChild(svg);

    }
}

if (isSafari()) {
    // Set all link's to have text-decoration: underline !important, the underline color, and the underline hover color.

    const links = document.querySelectorAll('.project-links a');
    for (let link of links) {

        link.setAttribute('style', 'text-decoration: underline !important; text-decoration-color: var(--line) !important');

        // Change active color on hover
        link.addEventListener('mouseover', () => {
            link.setAttribute('style', 'text-decoration: underline !important; text-decoration-color: var(--line-active) !important');
        });
        link.addEventListener('mouseout', () => {
            link.setAttribute('style', 'text-decoration: underline !important; text-decoration-color: var(--line) !important');
        });
    }
} else {
    render_links();
}
