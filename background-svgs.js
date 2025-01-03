// Collection of SVG paths and their configurations

import Network from './space-colonization/js/Network.js';
import Node from './space-colonization/js/Node.js';
import { getGridOfAttractors } from './space-colonization/js/AttractorPatterns.js';
import { random } from './space-colonization/js/Utilities.js';
import defaults from './space-colonization/js/Defaults.js';
import { setupKeyListeners } from './space-colonization/js/KeyboardInteractions.js';

const svgCollection = [
    {
        name: 'vine',
        path: 'M51.12,51.68c-2-.83-5.52.26-8.52,1.58,4.28-3.06,9.67-7.17,11.74-9l.16-.14c5.88-1.6,6.53-.62,10.8,0,4.6.62,7.47-4.31,7.47-4.31a15.86,15.86,0,0,0-7.17-3c-2.09-.31-5.06,1.45-7.59,3.37,3.11-3.83,6.87-9,8.33-11,6.27-2.8,6.93-1.84,11.42-1.87,4.64,0,6.8-5.31,6.8-5.31A15.84,15.84,0,0,0,77,20.1c-3.36,0-8.21,5.46-10.33,8.07l0,0c1.88-2.76,5.78-9,4.78-12.25a15.83,15.83,0,0,0-4-6.64s-4.44,3.58-3.13,8c1.19,4.05,2.24,4.6,1.63,10.33l-.07,0c-.05.07-3.11,4.34-6.28,8.46a7.23,7.23,0,0,0,1.05-4.14,15.83,15.83,0,0,0-3.05-7.13s-4.89,2.93-4.21,7.53c.64,4.32,1.65,4.91,0,11.06-1.5,1.28-4.76,3.81-8,6.25a7.46,7.46,0,0,0,2.15-3.91A15.85,15.85,0,0,0,46.28,38s-5.46,1.66-5.91,6.28c-.43,4.33.4,5.16-2.61,10.65l-.81.49a26.64,26.64,0,0,0-10,11.42c.18-2.29,0-4.46-.87-5.7a15.86,15.86,0,0,0-6-5s-3,4.83-.34,8.62c2.49,3.51,3.66,3.64,5,9.57C24,77,20.7,82.58,15.44,90l1.09.77c3.75-5.27,8.21-12,9.37-15.65,4.71-4.33,5.7-3.71,9.84-5.16,4.38-1.54,4.7-7.23,4.7-7.23a15.84,15.84,0,0,0-7.74.62c-2.42.82-4.62,4.92-6,8.23a25.86,25.86,0,0,1,11-14.95l.85-.51c6.21-.15,6.59,1,10.62,2.56,4.32,1.72,8.29-2.37,8.29-2.37A15.84,15.84,0,0,0,51.12,51.68Z',
        viewBox: '0 0 100 125',
        size: { min: 30, max: 60 }
    },
    {
        name: 'bee',
        path: beePath,
        viewBox: '0 0 100 125',
        size: { min: 30, max: 60 }
    },
    {
        name: 'snail',
        path: snailPath,
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
        
        // Initialize multiple networks
        this.initSpaceColonization();
        // this.initCircularNetwork();

        // Add other background elements
        this.addSnail();
        this.addBee();
        this.addMonstera();
    }

    initSpaceColonization() {
        // Use existing canvas
        const canvas = document.getElementById('sketch');
        canvas.style.position = 'absolute';  
        canvas.style.top = '0';             
        canvas.style.left = '0';            
        canvas.style.zIndex = '0';          
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize network
        const network = new Network(ctx, defaults);

        // Create a circle in the center as an obstacle
        const cx = window.innerWidth / 1.3;
        const cy = window.innerHeight / 1.3;
        const obstacleRadius = Math.min(window.innerWidth, window.innerHeight) * 0.7;
        const resolution = 100;
        const obstaclePoints = this.createCircleOfPoints(cx, cy, obstacleRadius, resolution);
        // Close the shape
        const obstacleShape = [...obstaclePoints, obstaclePoints[0]];

        // Create attractors on a grid, then remove those inside the obstacle circle
        const gridAttractors = getGridOfAttractors(150, 100, ctx, 100).filter(
            ({ position: { x, y } }) => !this.isPointInPolygon({ x, y }, obstacleShape)
        );
        network.attractors = gridAttractors;

        // Add an initial node at the bottom center
        network.addNode(new Node(null, { x: 0, y: 0 }, true, ctx, defaults));

        // Add frame rate control
        const frameInterval = 50; // Milliseconds between frames (adjust this value to control speed)
        let lastFrameTime = 0;

        // Modified animation loop
        const animate = (currentTime) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Only update if enough time has passed
            if (currentTime - lastFrameTime > frameInterval) {
                if (!defaults.IsPaused) {
                    network.update();
                }
                lastFrameTime = currentTime;
            }

            network.draw();
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    initCircularNetwork() {
        // Use existing canvas
        const canvas = document.getElementById('circular-network');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = Math.max(document.documentElement.scrollHeight - window.innerHeight, window.innerHeight);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize network with custom green colors that override defaults
        const greenSettings = {
            Colors: {
                BackgroundColor: 'rgb(0, 0, 0)',
                BranchColor: 'rgba(0, 255, 0, 1)',
                TipColor: 'rgba(0, 255, 0, .8)',
                AttractionZoneColor: 'rgba(0, 255, 0, .008)',
                KillZoneColor: 'rgba(0, 255, 0, .02)',
                InfluenceLinesColor: 'rgba(0, 255, 0, .1)',
                BoundsFillColor: 'rgba(0, 255, 0, .1)',
                BoundsBorderColor: 'rgba(0, 255, 0, .3)',
                ObstacleFillColor: 'rgba(0, 255, 0, .1)',
                ObstacleBorderColor: 'rgba(0, 255, 0, .3)'
            }
        };
        const network = new Network(ctx, { ...defaults, ...greenSettings });

        // Create a circle in the center as an obstacle (same as space colonization)
        const cx = window.innerWidth / 1.3;
        const cy = window.innerHeight - window.innerHeight / 1.3;
        const obstacleRadius = Math.min(window.innerWidth, window.innerHeight) * 0.7;
        const resolution = 100;
        const obstaclePoints = this.createCircleOfPoints(cx, cy, obstacleRadius, resolution);
        const obstacleShape = [...obstaclePoints, obstaclePoints[0]];

        // Create attractors on a grid, filtering those inside the obstacle (same as space colonization)
        const gridAttractors = getGridOfAttractors(150, 100, ctx, 100).filter(
            ({ position: { x, y } }) => !this.isPointInPolygon({ x, y }, obstacleShape)
        );
        network.attractors = gridAttractors;

        // Add an initial node at the bottom center
        network.addNode(new Node(null, { x: 0, y: 0 }, true, ctx, defaults));

        // Add frame rate control
        const frameInterval = 5;
        let lastFrameTime = 0;

        // Animation loop
        const animate = (currentTime) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (currentTime - lastFrameTime > frameInterval) {
                if (!defaults.IsPaused) {
                    network.update();
                }
                lastFrameTime = currentTime;
            }

            network.draw();
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    /**
     * Create a polygon of points approximating a circle.
     */
    createCircleOfPoints(cx, cy, radius, resolution = 50) {
        const points = [];
        for (let i = 0; i < resolution; i++) {
            const theta = (2 * Math.PI * i) / resolution;
            const x = cx + Math.cos(theta) * radius;
            const y = cy + Math.sin(theta) * radius;
            points.push({ x, y });
        }
        return points;
    }

    /**
     * Standard "point in polygon" check using ray casting.
     */
    isPointInPolygon(point, polygon) {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].x, yi = polygon[i].y;
            const xj = polygon[j].x, yj = polygon[j].y;
            const intersect =
                (yi > point.y) !== (yj > point.y) &&
                point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
            if (intersect) inside = !inside;
        }
        return inside;
    }

    // ------------------------------------------------------------------
    // New fractal river method
    // ------------------------------------------------------------------
    addFractalRiver() {
        
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
        const vectors = []; // Store vectors for drawing
        const baseX = window.innerWidth - 150;  // Store base position
        const baseY = window.innerHeight - 100;

        const createBranch = (startX, startY, angle, length, depth, maxDepth) => {
            if (depth >= maxDepth) return;

            // Add some natural variation to the branch
            const branchAngle = angle + (Math.random() * 0.2 - 0.1);
            const branchLength = length * (0.8 + Math.random() * 0.6);
            
            // Calculate end point with some natural curve
            const endX = startX + Math.cos(branchAngle) * branchLength;
            const endY = startY + Math.sin(branchAngle) * branchLength;

            // // Create branch vector
            // const branchVector = document.createElementNS("http://www.w3.org/2000/svg", "line");
            // branchVector.setAttribute("x1", startX);
            // branchVector.setAttribute("y1", startY);
            // branchVector.setAttribute("x2", endX);
            // branchVector.setAttribute("y2", endY);
            // branchVector.setAttribute("stroke", "#fff");
            // branchVector.setAttribute("stroke-width", "1");
            // vectors.push(branchVector);

            // // Create base-to-leaf vector
            // const baseVector = document.createElementNS("http://www.w3.org/2000/svg", "line");
            // baseVector.setAttribute("x1", baseX);
            // baseVector.setAttribute("y1", baseY);
            // baseVector.setAttribute("x2", endX);
            // baseVector.setAttribute("y2", endY);
            // baseVector.setAttribute("stroke", "#fff");
            // baseVector.setAttribute("stroke-width", "1");
            // vectors.push(baseVector);

            // Create monstera leaf
            const monsteraSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            monsteraSvg.setAttribute("viewBox", "-5.0 -10.0 110.0 135.0");
            
            // Scale leaves based on depth and add some random variation
            // const scale = (1 - depth/maxDepth) * (0.8 + Math.random() * 0.4);
            // const scale = 0.8 * Math.random() + 0.6;
            const scale = 1;
            monsteraSvg.style.width = `${80 * scale}px`;
            monsteraSvg.style.height = "auto";
            monsteraSvg.style.position = "absolute";
            monsteraSvg.style.left = `${endX}px`;
            monsteraSvg.style.top = `${endY}px`;
            
            // Rotate leaf with some random variation
            const rotation = (branchAngle * 180 / Math.PI) - 90 + (Math.random() * 20 - 10) + 180;
            monsteraSvg.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
            
            this.container.appendChild(monsteraSvg);

            const monsteraPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const monsteraData = svgCollection.find(s => s.name === 'monstera');
            monsteraPath.setAttribute("d", monsteraData.path);
            monsteraPath.setAttribute("class", "sketch-path");
            monsteraSvg.appendChild(monsteraPath);
            this.svgs.push(monsteraSvg);

            // Gentle swaying animation with random timing
            const swayAmount = 3 * scale;
            const swayDuration = 3000 + Math.random() * 2000;
            const swayDelay = Math.random() * -2000;
            
            const swayKeyframes = [
                { transform: `translate(-50%, -50%) rotate(${rotation - swayAmount}deg)` },
                { transform: `translate(-50%, -50%) rotate(${rotation + swayAmount}deg)` },
                { transform: `translate(-50%, -50%) rotate(${rotation - swayAmount}deg)` }
            ];

            monsteraSvg.animate(swayKeyframes, {
                duration: swayDuration,
                delay: swayDelay,
                easing: 'ease-in-out',
                iterations: Infinity
            });

            // Create sub-branches with natural variation
            setTimeout(() => {
                const numBranches = Math.floor(2 + Math.random() * 2);
                const angleSpread = Math.PI / 3;
                
                for (let i = 0; i < numBranches; i++) {
                    if (Math.random() < 0.6) {
                        const newAngle = branchAngle - (angleSpread/2) + (angleSpread * i/(numBranches-1));
                        const newLength = branchLength;
                        createBranch(endX, endY, newAngle, newLength, depth + 1, maxDepth);
                    }
                }
            }, 300 + Math.random() * 200);
        };

        // Create SVG container for vectors
        const vectorContainer = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        vectorContainer.style.position = "absolute";
        vectorContainer.style.top = "0";
        vectorContainer.style.left = "0";
        vectorContainer.style.width = "100%";
        vectorContainer.style.height = "100%";
        vectorContainer.style.pointerEvents = "none"; // Don't interfere with interactions
        this.container.appendChild(vectorContainer);

        // Start the first branch
        const startX = window.innerWidth - 150;
        const startY = window.innerHeight - 100;
        const startAngle = -2*Math.PI/3;
        const startLength = 60;
        createBranch(startX, startY, startAngle, startLength, 0, 4);

        // Add all vectors to the container
        vectors.forEach(vector => vectorContainer.appendChild(vector));
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
            
            // Reset when bee exits screen
            if (position > window.innerWidth) {
                position = -40;
                lastY = 0;
                currentAngle = 0;
                startTime = performance.now();
            }
            
            requestAnimationFrame(animate);
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
    let titleSVG = new TitleSVG();


    setTimeout(() => {
        const animatedGif = document.querySelector('.animated-gif');
        const backgroundGif = document.querySelector('.background-gif');
 
        if (!animatedGif.classList.contains('loaded')) {
            // Initially hide scroll indicator
            const scrollIndicator = document.querySelector('.scroll-indicator');
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.5s ease-in-out';

            // First set opacity to 0 on elements that will be revealed
            const content = document.querySelector('.content');
            content.style.opacity = '0';
            content.style.transition = 'opacity 1s ease-in-out';
            
            // Change z-index and fade in the content
            backgroundGif.style.zIndex = '1';
            
            // Use requestAnimationFrame to ensure the opacity transition takes effect
            requestAnimationFrame(() => {
                content.style.opacity = '1';
                
                // Fade in scroll indicator after a short delay
                setTimeout(() => {
                    scrollIndicator.style.opacity = '1';
                }, 5000); // Half second delay after content fades in
            });
            
            // Destroy and recreate title
            const titleContainer = document.getElementById('title-container');
            titleContainer.innerHTML = ''; // Clear existing title
            titleSVG = new TitleSVG(); // Create new instance
        }
    }, 2000);
}); 


import { monsteraPath, snailPath, beePath } from './svg-paths.js';