const bodiesToModels = {
    earth: { 
        model: './models/earth.glb', 
        axialTilt: '0deg 0deg 0deg', 
        data:  {
            name: 'Tierra',
            mass: '5,97×10^24 kg',
            radius: '6.371 km',
            rotationTime: '24 horas',
            revolutionTime: '365.25 días',
        }
    },
    moon: { 
        model: './models/moon.glb', 
        axialTilt: '0deg 0deg 0deg', 
        data:  {
            name: 'Luna',
            mass: '7,34×10^22 kg / 0.01 Tierras',
            radius: '1.737 km / 0.27 Tierras',
            rotationTime: '28 días',
            revolutionTime: '28 días',
        }
    },
    mercury: { 
        model: './models/mercury.glb', 
        axialTilt: '0deg 0deg 0deg', 
        data:  {
            name: 'Mercurio',
            mass: '3,30×10^23 kg / 0.06 Tierras',
            radius: '2.439 km / 0.38 Tierras',
            rotationTime: '87.96 días',
            revolutionTime: '58.64 días',
        }
    },
    venus: { 
        model: './models/venus.glb', 
        axialTilt: '0deg 0deg 0deg', 
        data:  {
            name: 'Venus',
            mass: '4,86×10^24 kg / 0.81 Tierras',
            radius: '6.051 km / 0.95 Tierras',
            rotationTime: '243 días (retrógrado)',
            revolutionTime: '224.70 días',
        }
    },
    mars: { 
        model: './models/mars.glb', 
        axialTilt: '0deg 0deg 0deg', 
        data:  {
            name: 'Marte',
            mass: '6,42×10^23 kg / 0.11 Tierras',
            radius: '3.396 km / 0.53 Tierras',
            rotationTime: '24 horas 37 minutos',
            revolutionTime: '686.98 días',
        } 
    },
    jupiter: { 
        model: './models/jupiter.glb', 
        axialTilt: '0deg 0deg 0deg', 
        data:  {
            name: 'Júpiter',
            mass: '1,90×10^27 kg / 317.8 Tierras',
            radius: '71.492 km / 11.2 Tierras',
            rotationTime: '9 horas 55 minutos',
            revolutionTime: '11.86 años',
        } 
    },
    saturn: { 
        model: './models/saturn.glb', 
        axialTilt: '0deg 0deg 0deg', 
        data:  {
            name: 'Saturno',
            mass: '5.68×10^26 kg / 95.2 Tierras',
            radius: '60.268 km / 9.4 Tierras',
            rotationTime: '10 horas 33 minutos',
            revolutionTime: '29.45 años',
        }  },
    uranus: { 
        model: './models/uranus.glb', 
        axialTilt: '0deg 0deg 0deg', 
        data:  {
            name: 'Urano',
            mass: '8.68×10^25 kg / 14.5 Tierras',
            radius: '25.362 km / 4 Tierras',
            rotationTime: '17 horas 14 minutos (retrógrado)',
            revolutionTime: '84 años',
        } 
    },
    neptune: { 
        model: './models/neptune.glb', 
        axialTilt: '0deg 0deg 0deg', 
        data:  {
            name: 'Neptuno',
            mass: '1.02×10^26 kg / 17.1 Tierras',
            radius: '24.764 km / 3.88 Tierras',
            rotationTime: '16 horas 6 minutos',
            revolutionTime: '164.8 años',
        } 
    },
    sun: { 
        model: './models/sun.glb', 
        axialTilt: '0deg 0deg 0deg', 
        data:  {
            name: 'Sol',
            mass: '1.99×10^30 kg / 332.950 Tierras',
            radius: '696.342 km / 109 Tierras',
            rotationTime: '25 días',
        } 
    },
}

const modelViewer = document.querySelector('model-viewer');
const infoButton = document.getElementById('info');
let selectedBodyData = bodiesToModels.earth.data;
let wasPaused = false;
let defaultCameraOrbit, defaultFieldOfView;
modelViewer.addEventListener('load', () => {
    if(wasPaused) modelViewer.pause();
    defaultCameraOrbit = modelViewer.getCameraOrbit();
    defaultFieldOfView = modelViewer.getFieldOfView();
})

document.querySelectorAll('#celestialBodies .dropdown-item').forEach(el => el.addEventListener('click', () => {
    // Unselect selected
    document.querySelector('#celestialBodies .dropdown-item.active')?.classList.remove('active');
    // Select myself and change model
    el.classList.add('active');
    wasPaused = modelViewer.paused;
    modelViewer.src = bodiesToModels[el.dataset.body].model;
    selectedBodyData = bodiesToModels[el.dataset.body].data;
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

document.getElementById('axialTilt').addEventListener('toggle', () =>  Swal.fire({
        title: 'Ya viene! Estamos trabajando en esto...',
        confirmButtonText: 'OK!',
        customClass: {
            confirmButton: 'btn',
        }
    })
);
document.getElementById('spin').addEventListener('toggle', () => modelViewer.paused ? modelViewer.play() : modelViewer.pause());
document.getElementById('center').addEventListener('click', () => {
    modelViewer.cameraTarget = "0m 0m 0m";
    modelViewer.cameraOrbit = defaultCameraOrbit;
    modelViewer.fieldOfView = defaultFieldOfView;
});
infoButton.addEventListener('click', () => {
    const innerHTML = `<div><p><strong>Masa:</strong> ${selectedBodyData.mass}</p>
    <p><strong>Radio:</strong> ${selectedBodyData.radius}</p>
    <p><strong>Período de Rotación:</strong> ${selectedBodyData.rotationTime}</p>` +
    (selectedBodyData.revolutionTime ? `<p><strong>Período de Revolución:</strong> ${selectedBodyData.revolutionTime}</p>` : '') +
    '</div>';
    console.log(innerHTML);
    Swal.fire({
        title: selectedBodyData.name,
        html: innerHTML,
        confirmButtonText: 'OK!',
        customClass: {
            confirmButton: 'btn',
        }
    })
});
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
