// Collection of SVG paths and their configurations
const svgCollection = [
    {
        name: 'vine',
        path: 'M51.12,51.68c-2-.83-5.52.26-8.52,1.58,4.28-3.06,9.67-7.17,11.74-9l.16-.14c5.88-1.6,6.53-.62,10.8,0,4.6.62,7.47-4.31,7.47-4.31a15.86,15.86,0,0,0-7.17-3c-2.09-.31-5.06,1.45-7.59,3.37,3.11-3.83,6.87-9,8.33-11,6.27-2.8,6.93-1.84,11.42-1.87,4.64,0,6.8-5.31,6.8-5.31A15.84,15.84,0,0,0,77,20.1c-3.36,0-8.21,5.46-10.33,8.07l0,0c1.88-2.76,5.78-9,4.78-12.25a15.83,15.83,0,0,0-4-6.64s-4.44,3.58-3.13,8c1.19,4.05,2.24,4.6,1.63,10.33l-.07,0c-.05.07-3.11,4.34-6.28,8.46a7.23,7.23,0,0,0,1.05-4.14,15.83,15.83,0,0,0-3.05-7.13s-4.89,2.93-4.21,7.53c.64,4.32,1.65,4.91,0,11.06-1.5,1.28-4.76,3.81-8,6.25a7.46,7.46,0,0,0,2.15-3.91A15.85,15.85,0,0,0,46.28,38s-5.46,1.66-5.91,6.28c-.43,4.33.4,5.16-2.61,10.65l-.81.49a26.64,26.64,0,0,0-10,11.42c.18-2.29,0-4.46-.87-5.7a15.86,15.86,0,0,0-6-5s-3,4.83-.34,8.62c2.49,3.51,3.66,3.64,5,9.57C24,77,20.7,82.58,15.44,90l1.09.77c3.75-5.27,8.21-12,9.37-15.65,4.71-4.33,5.7-3.71,9.84-5.16,4.38-1.54,4.7-7.23,4.7-7.23a15.84,15.84,0,0,0-7.74.62c-2.42.82-4.62,4.92-6,8.23a25.86,25.86,0,0,1,11-14.95l.85-.51c6.21-.15,6.59,1,10.62,2.56,4.32,1.72,8.29-2.37,8.29-2.37A15.84,15.84,0,0,0,51.12,51.68Z',
        viewBox: '0 0 100 125',
        size: { min: 30, max: 60 }
    },
    {
        name: 'bee',
        path: 'M66.01,41.32c2.6-.88,5.21-2.24,7.4-4.35,2.26-2.16,3.4-5.07,3.39-7.96,0-2.75-1.02-5.5-3.07-7.64-2.16-2.26-5.07-3.4-7.96-3.39-2.75,0-5.5,1.02-7.64,3.07-2.96,2.84-4.65,6.26-5.6,9.46,0,0,0,.02,0,.02-.05-.19-.09-.38-.14-.58-.83-3.17-2.3-6.49-4.89-9.19-2.16-2.26-5.07-3.4-7.96-3.39-2.75,0-5.5,1.02-7.64,3.07-2.26,2.16-3.4,5.07-3.39,7.96,0,2.75,1.02,5.5,3.07,7.64,2.44,2.55,5.31,4.15,8.1,5.15-9.04.46-16.51,6.8-18.66,15.29l-7.32,4.15c-.31.18-.51.51-.51.87s.19.69.51.87l7.32,4.16c2.24,8.81,10.2,15.33,19.71,15.33h23.71c.11,0,.22-.03.32-.06,10.65-.66,19.08-9.48,19.08-20.3h0c0-10.39-7.78-18.94-17.83-20.19ZM49.18,43.15h9.71v36.72h-9.71v-36.72ZM54.45,31.08c.88-2.96,2.41-6.04,5.07-8.59,1.75-1.68,4-2.52,6.25-2.52,2.38,0,4.74.93,6.52,2.78,1.68,1.75,2.52,4,2.52,6.25,0,2.38-.93,4.74-2.78,6.52l.69.72-.69-.72c-2.37,2.28-5.37,3.63-8.31,4.4-2.94.77-5.83.96-7.91.96-.97,0-1.77-.04-2.32-.08-.02,0-.03,0-.05,0-.02-.26-.04-.58-.05-.96.02-.44.03-.93.03-1.48,0-.3,0-.61-.01-.93.09-1.81.36-4.05,1.05-6.36ZM30.49,28.41c0-2.38.93-4.74,2.78-6.52,1.75-1.68,4-2.52,6.25-2.52,2.38,0,4.74.93,6.52,2.78,2.28,2.37,3.63,5.37,4.4,8.31.66,2.53.9,5,.95,6.97-.02.5-.04.98-.04,1.41,0,.35,0,.67.02.98-.01.33-.03.62-.05.87,0,.02,0,.03,0,.05-.47.04-1.14.07-1.96.07-1.98,0-4.81-.21-7.77-1.08-2.96-.88-6.04-2.41-8.59-5.07-1.68-1.75-2.52-4-2.52-6.25ZM22.36,61.51h0c0-5,2-9.52,5.24-12.83v25.67c-3.24-3.31-5.24-7.83-5.24-12.83ZM34.14,78.64v-34.25c2.04-.79,4.26-1.24,6.58-1.24h1.92v36.72h-1.92c-2.32,0-4.54-.45-6.58-1.24ZM81.84,61.51c0,5.07-2.05,9.66-5.38,12.98-2.89,2.89-6.74,4.82-11.03,5.27v-36.51c4.29.45,8.14,2.38,11.03,5.27,3.32,3.33,5.38,7.91,5.38,12.98h0Z M72.91,53.09c-1.4,0-2.54,1.14-2.54,2.54,0,1.4,1.14,2.54,2.54,2.54,1.4,0,2.54-1.14,2.54-2.54,0-1.4-1.14-2.54-2.54-2.54Z',
        viewBox: '0 0 100 125',
        size: { min: 30, max: 60 }
    },
    {
        name: 'snail',
        path: 'm93.066 21.629c-2.4492 0.36328-3.5664 2.5898-4.3867 4.2109l-3.4453 6.8438c-0.23047 0.46094-0.49609 0.98828-0.90234 1.2734-0.60938 0.42969-1.4141 0.31641-2.3477 0.1875-0.42969-0.0625-0.875-0.125-1.3203-0.13281-0.42578-0.007813-0.77344-0.23828-0.91406-0.60547-1.8008-4.7656-5.1758-8.8477-9.5-11.488-0.65234-0.39844-1.3672-0.75-2.1562-0.63281-0.67969 0.10547-1.2188 0.54688-1.5156 1.2383-0.39453 0.91797-0.27344 2.1328 0.29297 2.9492 0.62891 0.90625 1.5469 1.4648 2.4375 2.0078 0.34375 0.21094 0.6875 0.41797 1.0117 0.64453 4.2461 3 4.4883 9.1836 4.3945 11.703-0.13281 3.5352-0.85547 6.3633-2.2188 8.6484-1.4453 2.4258-4.2148 5.0352-6.9023 5.6328-0.019531-0.66797-0.089844-1.3242-0.18359-1.9336-0.30078-1.9609-0.75-3.8945-1.3242-5.7852-0.003907-0.023437-0.011719-0.042969-0.019532-0.0625-0.46094-1.5156-1.0078-3.0039-1.6367-4.457-0.007813-0.019532-0.015626-0.039063-0.023438-0.058594-0.67188-1.5469-1.4297-3.0547-2.2773-4.5117-0.011718-0.019531-0.019531-0.035156-0.03125-0.050781-1.6016-2.75-3.5078-5.3203-5.6875-7.6445-0.007812-0.011719-0.023437-0.023438-0.03125-0.035157-0.29297-0.30859-0.58594-0.62109-0.88672-0.92187-0.74219-0.74219-1.7305-1.6758-2.9023-2.5391-0.011719-0.007813-0.015625-0.019531-0.027344-0.027344-0.007812-0.003906-0.011719-0.003906-0.019531-0.007812-0.80469-0.58984-1.6914-1.1484-2.6523-1.5898-0.95703-0.4375-1.957-0.74219-2.9727-0.97266-0.003907 0-0.003907-0.003907-0.007813-0.003907-0.0625-0.027343-0.13281-0.039062-0.19531-0.039062-1.9062-0.41016-3.8633-0.53516-5.7188-0.60156h-0.003906c-0.35156-0.011719-0.70313-0.023438-1.0469-0.035157l-7.625-0.23047c-2.7695-0.085937-5.625-0.16406-8.418 0.33984-0.015625 0-0.03125 0.007813-0.046875 0.007813-0.26172 0.046875-0.51953 0.09375-0.78125 0.15234-1.4336 0.32031-2.8242 0.83594-4.1523 1.5039-0.027344 0.007812-0.050781 0.007812-0.078125 0.019531s-0.042969 0.03125-0.066406 0.046875c-1.5977 0.81641-3.0898 1.8789-4.4609 3.1172-0.007812 0.003907-0.011718 0.003907-0.019531 0.003907-0.10156 0.046875-0.17578 0.12891-0.22656 0.21875-1.3945 1.2969-2.6406 2.7891-3.707 4.4297-0.058593 0.058594-0.10547 0.125-0.12891 0.20312-0.94922 1.5-1.7461 3.1133-2.3555 4.8203-0.015625 0.03125-0.023437 0.0625-0.035156 0.09375-0.42188 1.1875-0.75781 2.4141-0.98828 3.6719-0.1875 1.0273-0.28516 2.0547-0.33203 3.0742-0.019532 0.066406-0.023438 0.13281-0.011719 0.20312-0.24609 6.6016 2.3203 12.934 6.7109 16.91 0.046875 0.070312 0.10547 0.12891 0.17969 0.16406 0.53125 0.46875 1.0898 0.90625 1.6758 1.3047-4.4453 2.3555-8.1523 6.8711-9.1562 11.254-0.40234 1.7578-0.17188 3.0586 0.6875 3.8555 0.61328 0.57031 1.4102 0.74219 2.2109 0.74219 0.51172 0 1.0195-0.070312 1.4844-0.15234 2.8438-0.51172 5.668-1.2891 8.3984-2.0391 3.1094-0.85547 6.3203-1.7383 9.5469-2.2227 5.3477-0.80469 10.863-0.54297 16.195-0.28516l25.77 1.2344c1.6914 0.082031 3.6094 0.17578 5.3906-0.38281 2.5078-0.78516 4.4336-2.7344 6.1875-4.6641 1.8008-1.9805 3.5273-4.0508 5.1289-6.1484 1.0312-1.3555 2.0039-2.6992 2.5742-4.25 0.95703-2.6055 0.65625-5.3984 0.36719-8.1016-0.074219-0.68359-0.14844-1.3672-0.19922-2.0469-0.64844-8.2969 2.0469-16.711 7.4297-23.125 0.64844-0.77344 1.457-1.7344 1.0625-3.0625-0.375-1.2656-1.707-2.0625-3.0938-1.8555z',
        viewBox: '-5.0 -10.0 110.0 135.0',
        size: { min: 40, max: 80 }
    },
    {
        name: 'monstera',
        path: monsteraPath,
        viewBox: '-5.0 -10.0 110.0 135.0',
        size: { min: 40, max: 80 }
    },
    // Letter SVGs
    {
        name: 'S',
        path: 'M70,20 C60,20 40,20 40,35 C40,50 70,45 70,60 C70,75 50,75 40,75',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    },
    {
        name: 'a',
        path: 'M90,75 L90,55 C90,45 110,45 110,55 L110,75 M90,60 C90,70 110,70 110,60',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    },
    {
        name: 'm',
        path: 'M130,75 L130,45 C140,45 150,45 150,60 C150,75 150,75 150,75 M150,75 L150,45 C160,45 170,45 170,60 C170,75 170,75 170,75',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    },
    {
        name: 'apostrophe',
        path: 'M190,30 C188,32 186,34 185,36',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    },
    {
        name: 's',
        path: 'M225,45 C215,45 205,45 205,55 C205,65 225,60 225,70 C225,80 215,75 205,75',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    },
    {
        name: 'w',
        path: 'M280,45 L290,75 L300,45 L310,75 L320,45',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    },
    {
        name: 'e',
        path: 'M340,60 C350,60 360,60 360,45 C360,30 340,30 330,45 C320,60 340,75 360,75',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    },
    {
        name: 'b',
        path: 'M380,20 L380,75 C390,75 400,75 400,60 C400,45 390,45 380,45',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    },
    {
        name: 's2',
        path: 'M435,45 C425,45 415,45 415,55 C415,65 435,60 435,70 C435,80 425,75 415,75',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    },
    {
        name: 'i',
        path: 'M455,45 L455,75 M455,35 L455,25',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    },
    {
        name: 't',
        path: 'M475,25 L475,75 M465,35 L485,35',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    },
    {
        name: 'e2',
        path: 'M505,60 C515,60 525,60 525,45 C525,30 505,30 495,45 C485,60 505,75 525,75',
        viewBox: '0 0 600 100',
        size: { min: 30, max: 60 }
    }
];

class BackgroundSVG {
    constructor(container) {
        this.container = container;
        this.svgs = [];
        this.addSnail();
        this.addBee();
        this.addMonstera();
    }

    // Keep addCustomSVG method for potential future use
    addCustomSVG(name, pathData, viewBox, sizeRange) {
        svgCollection.push({
            name: name,
            path: pathData,
            viewBox: viewBox,
            size: sizeRange || { min: 30, max: 60 }
        });
    }

    morphToRandomShape(svg) {
        // Get current and target path data
        const currentPath = svg.querySelector('path');
        const currentPathData = currentPath.getAttribute('d');
        const targetSvgData = svgCollection[Math.floor(Math.random() * svgCollection.length)];
        
        // Create temporary path elements to get path commands
        const startPath = this.decomposePath(currentPathData);
        const endPath = this.decomposePath(targetSvgData.path);
        
        // Interpolate between paths
        this.animatePath(currentPath, startPath, endPath);
        
        // Update viewBox
        svg.setAttribute("viewBox", targetSvgData.viewBox);
    }

    decomposePath(pathData) {
        // Convert path data to normalized command array
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', pathData);
        const commands = [];
        const pathLength = path.getTotalLength();
        
        for (let i = 0; i < 50; i++) {
            const point = path.getPointAtLength(i * pathLength / 49);
            commands.push({ x: point.x, y: point.y });
        }
        return commands;
    }

    animatePath(pathElement, startPoints, endPoints) {
        const duration = 500; // Animation duration in ms
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Interpolate between start and end points
            const currentPoints = startPoints.map((start, i) => ({
                x: start.x + (endPoints[i].x - start.x) * progress,
                y: start.y + (endPoints[i].y - start.y) * progress
            }));
            
            // Convert points back to path data
            const pathData = 'M ' + currentPoints.map(p => `${p.x},${p.y}`).join(' L ');
            pathElement.setAttribute('d', pathData);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    addMonstera() {
        const numLeaves = 5;
        const radius = 100; // Distance from center
        const staggerDelay = 500; // 0.5 seconds
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2 - 80;

        for (let i = 0; i < numLeaves; i++) {
            setTimeout(() => {
                // Calculate position on upper semicircle (180 degrees = π radians)
                const angle = (Math.PI * i) / (numLeaves - 1);
                const x = centerX + radius * Math.cos(angle);
                const y = centerY - radius * Math.sin(angle); // Subtract to go up

                const monsteraSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                monsteraSvg.setAttribute("viewBox", "-5.0 -10.0 110.0 135.0");
                monsteraSvg.style.width = "60px";
                monsteraSvg.style.height = "auto";
                monsteraSvg.style.position = "absolute";
                monsteraSvg.style.left = `${x}px`;
                monsteraSvg.style.top = `${y}px`;
                
                // Rotate to face outward (convert angle to degrees and add 90 to align properly)
                const rotation = (angle * 180 / Math.PI) + 90;
                monsteraSvg.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
                
                this.container.appendChild(monsteraSvg);

                const monsteraPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                const monsteraData = svgCollection.find(s => s.name === 'monstera');
                monsteraPath.setAttribute("d", monsteraData.path);
                monsteraPath.setAttribute("class", "sketch-path");
                monsteraSvg.appendChild(monsteraPath);
                this.svgs.push(monsteraSvg);

                // Gentle swaying animation
                const duration = 4000;
                const swayKeyframes = [
                    { transform: `translate(-50%, -50%) rotate(${rotation - 2}deg)` },
                    { transform: `translate(-50%, -50%) rotate(${rotation + 2}deg)` },
                    { transform: `translate(-50%, -50%) rotate(${rotation - 2}deg)` }
                ];

                monsteraSvg.animate(swayKeyframes, {
                    duration: duration,
                    easing: 'ease-in-out',
                    iterations: Infinity
                });
            }, i * staggerDelay);
        }
    }

    addSnail() {
        const snailSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        snailSvg.setAttribute("viewBox", "0 0 100 100");
        snailSvg.style.width = "60px";
        snailSvg.style.height = "auto";
        snailSvg.style.position = "absolute";
        snailSvg.style.left = "-60px";
        snailSvg.style.bottom = "0px";
        this.container.appendChild(snailSvg);

        const snailPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const snailData = svgCollection.find(s => s.name === 'snail');
        snailPath.setAttribute("d", snailData.path);
        snailPath.setAttribute("class", "sketch-path");
        snailSvg.appendChild(snailPath);
        this.svgs.push(snailSvg);

        // Animate the snail
        const animate = () => {
            const duration = 30 * 1000; // Base duration: 30 seconds
            const scaleKeyframes = [];
            const speedKeyframes = [];
            
            let currentPosition = -60;
            const totalDistance = window.outerWidth * 2 + 120; // Add extra distance to ensure full crossing
 
            // Create natural-looking movement keyframes
            for (let i = 0; i <= 100; i++) {
                const progress = i / 100;
                
                // Create lurching effect - slow down every second
                const lurchFactor = Math.pow(Math.sin(progress * Math.PI * 20), 2);
                const speedMultiplier = 0.2 + (1 - lurchFactor) * 0.8;
                
                // Calculate position based on varying speed
                const step = (totalDistance / 100) * speedMultiplier;
                currentPosition += step;
                
                const stretchAmount = 0.8 + (1 - lurchFactor) * 0.4;
                scaleKeyframes.push({ 
                    transform: `scaleX(${stretchAmount}) scaleY(1)`
                });
                
                speedKeyframes.push({ left: `${currentPosition}px` });
            }

            // Animate stretching
            snailSvg.animate(scaleKeyframes, {
                duration: duration,
                easing: 'linear',
                iterations: 1
            });

            // Animate movement with lurching
            snailSvg.animate(speedKeyframes, {
                duration: duration,
                easing: 'linear',
                fill: 'forwards'
            }).onfinish = () => {
                // Reset position and start again
                snailSvg.style.left = '-60px';
                requestAnimationFrame(() => animate());
            };
        };

        // Start the animation
        animate();
    }

    addBee() {
        const beeSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        beeSvg.setAttribute("viewBox", "0 0 100 100");
        beeSvg.style.width = "60px";
        beeSvg.style.height = "auto";
        beeSvg.style.position = "absolute";
        beeSvg.style.left = "-40px";
        beeSvg.style.top = "80%";
        beeSvg.style.transformOrigin = "center";
        this.container.appendChild(beeSvg);

        const beePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const beeData = svgCollection.find(s => s.name === 'bee');
        beePath.setAttribute("d", beeData.path);
        beePath.setAttribute("class", "sketch-path");
        beeSvg.appendChild(beePath);
        this.svgs.push(beeSvg);

        let position = -40;
        let startTime = performance.now();
        let lastY = 0;
        let currentAngle = 0;
        
        const animate = (currentTime) => {
            position += 1.5;
            const elapsed = currentTime - startTime;
            
            const baseVerticalOffset = -position * 0.3;
            const waveOffset = Math.sin(elapsed / 500) * 30;
            const noiseOffset = Math.sin(elapsed / 200) * 10;
            const verticalOffset = baseVerticalOffset + waveOffset + noiseOffset;
            
            const deltaY = (verticalOffset - lastY) * 0.3;
            const targetAngle = Math.atan2(deltaY, 1) * (180 / Math.PI);
            
            currentAngle = currentAngle * 0.95 + targetAngle * 0.05;
            
            const wobble = Math.sin(elapsed / 100) * 2;
            
            lastY = verticalOffset;
            
            beeSvg.style.left = position + 'px';
            beeSvg.style.top = `calc(50% + ${verticalOffset}px)`;
            beeSvg.style.transform = `rotate(${currentAngle + wobble}deg)`;
            
            if (position < window.innerWidth) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
}

class TitleSVG {
    constructor() {
        this.container = document.getElementById('title-container');
        this.letterSvgs = [];
        this.init();
    }

    init() {
        // Create SVG container
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        
        // Use a viewBox but let width/height be responsive
        svg.setAttribute("viewBox", "0 0 600 100");

        // Instead, use responsive styling
        svg.style.width = "100%";
        svg.style.height = "auto";
        svg.style.display = "block"; // prevents inline-SVG quirks in some browsers
 
        this.container.appendChild(svg);

        // Add each letter
        const letterNames = ['S', 'a', 'm', 'apostrophe', 's', 'w', 'e', 'b', 's2', 'i', 't', 'e2'];
        letterNames.forEach((name, index) => {
            const letterData = svgCollection.find(s => s.name === name);
            if (letterData) {
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", letterData.path);
                path.setAttribute("class", "sketch-path");
                path.style.animationDelay = `calc(${0.3 * index}s + var(--animation-start))`;
                svg.appendChild(path);
                this.letterSvgs.push(path);
            }
        });
    }

    morphPath(pathElement, targetSvg) {
        // Get current and target path data
        const currentPathData = pathElement.getAttribute('d');
        
        // Create temporary path elements to get path commands
        const startPath = this.decomposePath(currentPathData);
        const endPath = this.decomposePath(targetSvg.path);
        
        // Interpolate between paths
        this.animatePath(pathElement, startPath, endPath);
    }

    decomposePath(pathData) {
        // Convert path data to normalized command array
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute('d', pathData);
        const commands = [];
        const pathLength = path.getTotalLength();
        
        for (let i = 0; i < 50; i++) {
            const point = path.getPointAtLength(i * pathLength / 49);
            commands.push({ x: point.x, y: point.y });
        }
        return commands;
    }

    animatePath(pathElement, startPoints, endPoints) {
        const duration = 500; // Animation duration in ms
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Interpolate between start and end points
            const currentPoints = startPoints.map((start, i) => ({
                x: start.x + (endPoints[i].x - start.x) * progress,
                y: start.y + (endPoints[i].y - start.y) * progress
            }));
            
            // Convert points back to path data
            const pathData = 'M ' + currentPoints.map(p => `${p.x},${p.y}`).join(' L ');
            pathElement.setAttribute('d', pathData);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.splash-container');
    const backgroundSVGs = new BackgroundSVG(container);
    const titleSVG = new TitleSVG();
}); 


import { monsteraPath } from './svg-paths.js';