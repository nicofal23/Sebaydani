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