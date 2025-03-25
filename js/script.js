document.addEventListener("DOMContentLoaded", () => {
    let audio = document.getElementById("audio");
    let progressBar = document.getElementById("progress");
    let waveContainer = document.getElementById("waveContainer");

    if (!audio || !progressBar || !waveContainer) {
        console.error("Elementos del reproductor no encontrados.");
        return;
    }

    let playing = false;
    let songs = ["./assets/music/every.mp3"]; // Ruta al archivo .mp3
    let songIndex = 0;

    let waves = document.querySelectorAll(".wave");

    function togglePlay() {
        if (playing) {
            audio.pause();
            stopWaves();
        } else {
            audio.play().then(() => {
                startWaves();
            }).catch((error) => {
                console.error("Error al reproducir el audio:", error);
            });
        }
        playing = !playing;
    }

    function nextSong() {
        songIndex = (songIndex + 1) % songs.length;
        audio.src = songs[songIndex];
        audio.play().then(() => {
            startWaves();
        }).catch((error) => {
            console.error("Error al reproducir el audio:", error);
        });
        playing = true;
    }

    function prevSong() {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        audio.src = songs[songIndex];
        audio.play().then(() => {
            startWaves();
        }).catch((error) => {
            console.error("Error al reproducir el audio:", error);
        });
        playing = true;
    }

    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            let progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + "%";
        }
    });

    function startWaves() {
        waves.forEach((wave) => {
            wave.style.animation = `wave-animation ${0.3 + Math.random() * 0.7}s infinite ease-in-out alternate`;
        });
    }

    function stopWaves() {
        waves.forEach((wave) => {
            wave.style.animation = "none";
        });
    }

    // Exponer funciones al ámbito global
    window.togglePlay = togglePlay;
    window.nextSong = nextSong;
    window.prevSong = prevSong;
});



//carousel


document.addEventListener("DOMContentLoaded", () => {
    const carruselContenedor = document.querySelector(".carrusel-contenedor");
    let isDragging = false;
    let startX, scrollLeft;

    // Iniciar el arrastre
    carruselContenedor.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - carruselContenedor.offsetLeft;
        scrollLeft = carruselContenedor.scrollLeft;
    });

    // Mover el carrusel mientras se arrastra
    carruselContenedor.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carruselContenedor.offsetLeft;
        const walk = (x - startX) * 2; // Ajusta la sensibilidad del arrastre
        carruselContenedor.scrollLeft = scrollLeft - walk;
    });

    // Detener el arrastre
    carruselContenedor.addEventListener("mouseup", () => {
        isDragging = false;
    });

    carruselContenedor.addEventListener("mouseleave", () => {
        isDragging = false;
    });
});




//google maps 

// Función para abrir el modal
function openModal() {
    document.getElementById("mapsModal").style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("mapsModal").style.display = "none";
}

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function (event) {
    const modal = document.getElementById("mapsModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};





//Emailjs
// Inicializar EmailJS
emailjs.init("JDRyrb9Zf1ih345pL"); // Reemplaza con tu User ID de EmailJS

// Funciones para abrir/cerrar modales
function openConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "block";
}

function closeConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "none";
}

function closeModal() {
    document.getElementById("mapsModal").style.display = "none";
}

// Enviar formulario
document.getElementById("confirmationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener el valor seleccionado del radio button
    const attendance = document.querySelector('input[name="attendance"]:checked');
    if (!attendance) {
        alert("Por favor, selecciona si vas a asistir.");
        return;
    }
    const attendanceValue = attendance.value;

    // Obtener el valor del campo de nombre
    const name = document.getElementById("name").value;
    if (!name) {
        alert("Por favor, ingresa tu nombre y apellido.");
        return;
    }

    // Crear el mensaje basado en la asistencia
    const message = `El invitado ${name} ha confirmado: ${attendanceValue}.`;

    // Obtener la hora actual
    const time = new Date().toLocaleString();

    // Datos que se enviarán
    const templateParams = {
        name: name,          // Coincide con {{name}} en el template
        time: time,          // Coincide con {{time}} en el template
        message: message,    // Coincide con {{message}} en el template
    };

    console.log("Datos enviados:", templateParams); // Depuración

    // Enviar correo con EmailJS
    emailjs.send("service_ut8dawt", "template_wc66a5l", templateParams)
        .then(
            function (response) {
                alert("¡Gracias por confirmar tu asistencia!");
                closeConfirmationModal();
            },
            function (error) {
                console.error("Error al enviar el formulario:", error); // Depuración
                alert("Hubo un error al enviar el formulario. Inténtalo de nuevo.");
            }
        );
});





// Funciones para abrir/cerrar el modal de cuenta bancaria
function openBankModal() {
    document.getElementById("bankModal").style.display = "block";
}

function closeBankModal() {
    document.getElementById("bankModal").style.display = "none";
}

// Función para copiar al portapapeles
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Copiado al portapapeles: " + text);
        })
        .catch((error) => {
            console.error("Error al copiar: ", error);
        });
}

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function (event) {
    const modal = document.getElementById("bankModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

//sugerir regalo 
// Funciones para abrir/cerrar modal
function openSongsModal() {
    document.getElementById("songsModal").style.display = "block";
}

function closeSongsModal() {
    document.getElementById("songsModal").style.display = "none";
}

// Enviar sugerencia de canción
document.getElementById("songsForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    const songName = document.getElementById("songName").value;
    const guestName = document.getElementById("guestName").value;
    
    // Validación simple
    if(!songName || !guestName) {
        alert("Por favor completa todos los campos");
        return;
    }
    
    // Configuración para EmailJS
    const templateParams = {
        song_name: songName,
        guest_name: guestName,
        message: `${guestName} sugirió la canción: ${songName}`
    };
    
    // Enviar email (asegúrate de tener inicializado EmailJS)
    emailjs.send("service_ut8dawt", "template_ecr86a4", templateParams)
        .then(function() {
            alert("¡Gracias por tu sugerencia! La canción fue enviada.");
            closeSongsModal();
            document.getElementById("songsForm").reset();
        }, function(error) {
            console.error("Error al enviar:", error);
            alert("Hubo un error al enviar tu sugerencia. Intenta nuevamente.");
        });
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('songsModal')) {
        closeSongsModal();
    }
});




//modal iglesia 

// Funciones para abrir/cerrar el modal de la iglesia
function openChurchModal() {
    document.getElementById("churchMapsModal").style.display = "block";
}

function closeChurchModal() {
    document.getElementById("churchMapsModal").style.display = "none";
}

// Función para abrir en Google Maps app
function openDirections() {
    window.open("https://www.google.com/maps/dir/?api=1&destination=Parroquia+Inmaculado+Corazón+de+María&destination_place_id=YOUR_PLACE_ID");
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    if (event.target == document.getElementById('churchMapsModal')) {
        closeChurchModal();
    }
}