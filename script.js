const bodiesToModels = {
    earth: '/models/earth.glb',
    moon: '/models/moon.glb',
    mercury: '/models/mercury.glb',
    venus: '/models/venus.glb',
    mars: '/models/mars.glb',
    jupiter: '/models/jupiter.glb',
    saturn: '/models/saturn.glb',
    uranus: '/models/uranus.glb',
    neptune: '/models/neptune.glb',
    sun: '/models/sun.glb',
}

const modelViewer = document.querySelector('model-viewer');

document.getElementById('celestial-body').addEventListener('change', e => modelViewer.src = bodiesToModels[e.target.value])