document.addEventListener('DOMContentLoaded', function() {
    const param1 = document.getElementById('param1');
    const param2 = document.getElementById('param2');
    const svg = document.getElementById('mysvg');
  
    function updateSVG() {
        const A = parseFloat(param1.value);
        const d = parseFloat(param2.value);
        const f = parseFloat(param3.value);
        const w = parseFloat(param4.value);
        const phi = parseFloat(param5.value);

        const pathString = generatePathFromParams(A, d, f, w, phi);

        svg.innerHTML = `<path d="${pathString}" stroke="black" fill="none" stroke-width="1"/>`;
    }
  
    param1.addEventListener('input', updateSVG);
    param2.addEventListener('input', updateSVG);
    param3.addEventListener('input', updateSVG);
    param4.addEventListener('input', updateSVG);
    param5.addEventListener('input', updateSVG);
  
    updateSVG();
});

const N_SAMPLES = 500;

function generatePathFromParams(A, d, f, w, phi) {
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

