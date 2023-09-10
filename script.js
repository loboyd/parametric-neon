document.addEventListener('DOMContentLoaded', function() {
    const svg = document.getElementById('mysvg');
  
    function updateSVG() {
        const A = parseFloat(param1.value);
        const d = parseFloat(param2.value);
        const f = parseFloat(param3.value);
        const w = parseFloat(param4.value);
        const phi = parseFloat(param5.value);
        const theta = parseFloat(param6.value);

        const pathString1 = generatePathFromParams(A, d, f, w, phi, theta);
        const pathString2 = generatePathFromParams(A, d, f, w, phi - Math.PI, theta);

        svg.innerHTML = `
            <path id="curve1" d="${pathString1}" stroke="hsl(60, 51%, 55%)" fill="none" stroke-width="4" stroke-linecap="round"/>
            <path d="${pathString1}" stroke="white" fill="none" stroke-width="2" stroke-linecap="round"/>
            <path id="curve2" d="${pathString2}" stroke="hsl(294, 46%, 59%)" fill="none" stroke-width="4" stroke-linecap="round"/>
            <path d="${pathString2}" stroke="white" fill="none" stroke-width="2" stroke-linecap="round"/>
        `;
    }
  
    param1.addEventListener('input', updateSVG);
    param2.addEventListener('input', updateSVG);
    param3.addEventListener('input', updateSVG);
    param4.addEventListener('input', updateSVG);
    param5.addEventListener('input', updateSVG);
    param6.addEventListener('input', updateSVG);
  
    updateSVG();
});

const N_SAMPLES = 1024;

function generatePathFromParams(A, d, f, w, phi, theta) {
    const samples = Array.from({ length: N_SAMPLES }, (_, r) => r)
        .map(r => 0 + (2 * Math.PI - 0) * r / (N_SAMPLES - 1));

    const z = (r) => A * Math.sin(f * r - phi) * d * Math.exp(-w * (r - Math.PI)**2) + d;

    let points = samples
        .map(r => ({
            x: z(r) * Math.sin(r - theta),
            y: z(r) * Math.cos(r - theta),
        }));

    points = points
        .map(point => ({
            x: (point.x*500/2.44 + 250),
            y: (point.y*500/2.44 + 250),
        }));

    let path = points.map(point => `${point.x} ${point.y}`).join(' L ');

    return `M ${path} Z`;
}

