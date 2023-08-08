const bodiesToModels = {
    earth: { model: './models/earth.glb', axialTilt: '0deg 0deg 0deg' },
    moon: { model: './models/moon.glb', axialTilt: '0deg 0deg 0deg' },
    mercury: { model: './models/mercury.glb', axialTilt: '0deg 0deg 0deg' },
    venus: { model: './models/venus.glb', axialTilt: '0deg 0deg 0deg' },
    mars: { model: './models/mars.glb', axialTilt: '0deg 0deg 0deg' },
    jupiter: { model: './models/jupiter.glb', axialTilt: '0deg 0deg 0deg' },
    saturn: { model: './models/saturn.glb', axialTilt: '0deg 0deg 0deg' },
    uranus: { model: './models/uranus.glb', axialTilt: '0deg 0deg 0deg' },
    neptune: { model: './models/neptune.glb', axialTilt: '0deg 0deg 0deg' },
    sun: { model: './models/sun.glb', axialTilt: '0deg 0deg 0deg' },
}

const modelViewer = document.querySelector('model-viewer');
let wasPaused = false;
modelViewer.addEventListener('load', () => {
    if(wasPaused) modelViewer.pause();
})

document.querySelectorAll('#celestialBodies .dropdown-item').forEach(el => el.addEventListener('click', () => {
    // Unselect selected
    document.querySelector('#celestialBodies .dropdown-item.active')?.classList.remove('active');
    // Select myself and change model
    el.classList.add('active');
    wasPaused = modelViewer.paused;
    modelViewer.src = bodiesToModels[el.dataset.body].model;
}))

// Dropdowns 
document.querySelectorAll('.dropdown, .dropend').forEach(dropdown => {
    console.log("Configuring!")
    const toggle = dropdown.querySelector('.dropdown-toggle > .bi');
    console.log({toggle, dropdown});
    // Active Icon
    dropdown.addEventListener('shown.bs.dropdown', (e) => {
        if (toggle.parentElement !== e.target) return; // Not me (for some reason these fire for all dropdowns)
        toggle.classList.remove(dropdown.dataset.inactiveIcon);
        toggle.classList.add(dropdown.dataset.activeIcon);
    });

    dropdown.addEventListener('hidden.bs.dropdown', (e) => {
        if (toggle.parentElement !== e.target) return; // Not me (for some reason these fire for all dropdowns)
        toggle.classList.add(dropdown.dataset.inactiveIcon);
        toggle.classList.remove(dropdown.dataset.activeIcon);
    });
    
});

// Toggles
document.querySelectorAll('.dropdown-item.toggle').forEach(el => {
    const icon = el.querySelector('.bi');
    el.addEventListener('click', () => {
        icon.classList.toggle('bi-circle');
        icon.classList.toggle('bi-check-circle-fill');
        el.dispatchEvent(new CustomEvent('toggle', {detail: icon.classList.contains('bi-check-circle-fill')}));
    });
});

document.getElementById('axialTilt').addEventListener('toggle', () => console.error("NOT IMPLEMENTED!"));
document.getElementById('spin').addEventListener('toggle', () => modelViewer.paused ? modelViewer.play() : modelViewer.pause());
document.getElementById('viewInAR').addEventListener('click', (e) => {
    if(modelViewer.canActivateAR) {
        modelViewer.querySelector('.ar-button').click();
        return;
    }
    Swal.fire({
        title: 'Abrílo en tu celular para verlo en Realidad Aumentada',
        html: '<div id="qr-code"></div>',
        confirmButtonText: 'OK!',
        customClass: {
            confirmButton: 'btn',
        }
    });
    const qrcode = new QRCode(document.getElementById('qr-code'), {
        text: window.location.href,
        width: 256,
        height: 256,
        colorDark : '#202327',
        colorLight : '#e1e5eb',
        correctLevel : QRCode.CorrectLevel.H
      });
});
