document.addEventListener('DOMContentLoaded', function() {
    const param1 = document.getElementById('param1');
    const param2 = document.getElementById('param2');
    const svg = document.getElementById('mysvg');
  
    function updateSVG() {
        const p1 = parseFloat(param1.value);
        const p2 = parseFloat(param2.value);
    
        const pathString = generatePathFromParams(p1, p2);
    
        svg.innerHTML = `<path d="${pathString}" stroke="black" fill="none" stroke-width="1"/>`;
    }
  
    param1.addEventListener('input', updateSVG);
    param2.addEventListener('input', updateSVG);
  
    updateSVG();
});

const N_SAMPLES = 500;

function generatePathFromParams(p1, p2) {
    let A = 0.13
    let d = 1
    let f = 7
    let w = 0.8
    let phi = 34.3

    const samples = Array.from({ length: N_SAMPLES }, (_, r) => r)
        .map(r => 0 + (2 * Math.PI - 0) * r / (500 - 1));

    const z = (r) => A * Math.sin(f * r - phi) * d * Math.exp(-w * (r - Math.PI)**2) + d;

    let points = samples
        .map(r => ({
            x: z(r) * Math.sin(r),
            y: z(r) * Math.cos(r),
        }));

    points = points
        .map(point => ({
            x: (point.x*200/2.24 + 100),
            y: (point.y*200/2.24 + 100),
        }));

    let path = points.map(point => `${point.x} ${point.y}`).join(' L ');

    return `M ${path} Z`;
}

