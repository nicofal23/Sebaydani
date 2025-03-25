document.addEventListener("DOMContentLoaded", () => {
    // Configuración global de SweetAlert
    const swalCustom = Swal.mixin({
        background: '#f8f4e9',
        color: '#5e4a3a',
        confirmButtonColor: '#a08a5a',
        cancelButtonColor: '#d08c5c',
        buttonsStyling: true,
        customClass: {
            confirmButton: 'swal-confirm-btn',
            cancelButton: 'swal-cancel-btn',
            title: 'swal-title',
            htmlContainer: 'swal-html'
        }
    });

    // ============ REPRODUCTOR DE MÚSICA ============
    let audio = document.getElementById("audio");
    let progressBar = document.getElementById("progress");
    let waveContainer = document.getElementById("waveContainer");

    if (!audio || !progressBar || !waveContainer) {
        console.error("Elementos del reproductor no encontrados.");
        return;
    }

    let playing = false;
    let songs = ["./assets/music/every.mp3"];
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
                swalCustom.fire({
                    title: 'Error de reproducción',
                    text: 'No se pudo reproducir la música: ' + error.message,
                    icon: 'error',
                    iconColor: '#d08c5c'
                });
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
            swalCustom.fire({
                title: 'Error',
                text: 'No se pudo cambiar la canción',
                icon: 'error'
            });
        });
        playing = true;
    }

    function prevSong() {
        songIndex = (songIndex - 1 + songs.length) % songs.length;
        audio.src = songs[songIndex];
        audio.play().then(() => {
            startWaves();
        }).catch((error) => {
            swalCustom.fire({
                title: 'Error',
                text: 'No se pudo cambiar la canción',
                icon: 'error'
            });
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

    // ============ CARRUSEL ============
    const carruselContenedor = document.querySelector(".carrusel-contenedor");
    let isDragging = false;
    let startX, scrollLeft;

    carruselContenedor.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - carruselContenedor.offsetLeft;
        scrollLeft = carruselContenedor.scrollLeft;
    });

    carruselContenedor.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carruselContenedor.offsetLeft;
        const walk = (x - startX) * 2;
        carruselContenedor.scrollLeft = scrollLeft - walk;
    });

    carruselContenedor.addEventListener("mouseup", () => {
        isDragging = false;
    });

    carruselContenedor.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    // ============ GOOGLE MAPS ============
    function openModal() {
        document.getElementById("mapsModal").style.display = "block";
    }

    function closeModal() {
        document.getElementById("mapsModal").style.display = "none";
    }

    // ============ EMAILJS - CONFIRMACIÓN ASISTENCIA ============
    emailjs.init("JDRyrb9Zf1ih345pL");

    function openConfirmationModal() {
        document.getElementById("confirmationModal").style.display = "block";
    }

    function closeConfirmationModal() {
        document.getElementById("confirmationModal").style.display = "none";
    }

    document.getElementById("confirmationForm").addEventListener("submit", function (e) {
        e.preventDefault();
    
        const attendance = document.querySelector('input[name="attendance"]:checked');
        if (!attendance) {
            swalCustom.fire({
                title: 'Falta información',
                text: 'Por favor, selecciona si vas a asistir.',
                icon: 'warning',
                iconColor: '#d08c5a'
            });
            return;
        }
    
        const name = document.getElementById("name").value;
        if (!name) {
            swalCustom.fire({
                title: 'Falta información',
                text: 'Por favor, ingresa tu nombre y apellido.',
                icon: 'warning'
            });
            return;
        }
    
        const message = `El invitado ${name} ha confirmado: ${attendance.value}.`;
        const time = new Date().toLocaleString();
    
        const templateParams = {
            name: name,
            time: time,
            message: message
        };
    
        emailjs.send("service_ut8dawt", "template_wc66a5l", templateParams)
            .then(() => {
                if (attendance.value.includes("Sí") || attendance.value.includes("Asistiré")) {
                    // Mensaje para quienes SI van a asistir
                    swalCustom.fire({
                        title: '¡Confirmación exitosa!',
                        html: `<p style="color:#5e4a3a;">Gracias por confirmar tu asistencia, ${name}.</p>
                               <p style="font-style:italic; margin-top:10px;">Nos emociona compartir este día especial contigo</p>`,
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 3000,
                        background: '#f8f4e9'
                    });
                } else {
                    // Mensaje para quienes NO van a asistir
                    swalCustom.fire({
                        title: 'Agradecemos tu respuesta',
                        html: `<p style="color:#5e4a3a;">${name}, lamentamos que no puedas acompañarnos.</p>
                               <p style="font-style:italic; margin-top:10px;">Agradecemos que nos hayas avisado y te enviaremos fotos de nuestro día especial</p>`,
                        icon: 'info',
                        showConfirmButton: true,
                        confirmButtonText: 'Entendido',
                        background: '#f8f4e9'
                    });
                }
                closeConfirmationModal();
            })
            .catch(error => {
                swalCustom.fire({
                    title: 'Error',
                    text: 'Hubo un error al enviar el formulario. Por favor inténtalo nuevamente.',
                    icon: 'error'
                });
            });
    });
    // ============ CUENTA BANCARIA ============
    function openBankModal() {
        document.getElementById("bankModal").style.display = "block";
    }

    function closeBankModal() {
        document.getElementById("bankModal").style.display = "none";
    }

    function copyToClipboard(elementId) {
        const text = document.getElementById(elementId).innerText;
        navigator.clipboard.writeText(text)
            .then(() => {
                swalCustom.fire({
                    position: 'top-end',
                    title: '¡Copiado!',
                    text: `"${text}" ha sido copiado al portapapeles`,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    background: '#f0e6d8'
                });
            })
            .catch((error) => {
                swalCustom.fire({
                    title: 'Error',
                    text: 'No se pudo copiar el texto: ' + error,
                    icon: 'error'
                });
            });
    }

    // ============ SUGERENCIA DE CANCIONES ============
    function openSongsModal() {
        document.getElementById("songsModal").style.display = "block";
    }

    function closeSongsModal() {
        document.getElementById("songsModal").style.display = "none";
    }

    document.getElementById("songsForm").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const songName = document.getElementById("songName").value;
        const guestName = document.getElementById("guestName").value;
        
        if(!songName || !guestName) {
            swalCustom.fire({
                title: 'Campos incompletos',
                text: 'Por favor completa todos los campos',
                icon: 'warning'
            });
            return;
        }
        
        const templateParams = {
            song_name: songName,
            guest_name: guestName,
            message: `${guestName} sugirió la canción: ${songName}`
        };
        
        emailjs.send("service_ut8dawt", "template_ecr86a4", templateParams)
            .then(() => {
                swalCustom.fire({
                    title: '¡Gracias!',
                    html: `<p>Tu sugerencia de <strong>${songName}</strong> ha sido enviada.</p>
                           <p style="font-size:14px; margin-top:10px;">"La música es el lenguaje del amor"</p>`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500
                });
                closeSongsModal();
                document.getElementById("songsForm").reset();
            })
            .catch(error => {
                swalCustom.fire({
                    title: 'Error',
                    text: 'Hubo un problema al enviar tu sugerencia',
                    icon: 'error'
                });
            });
    });

    // ============ IGLESIA ============
    function openChurchModal() {
        document.getElementById("churchMapsModal").style.display = "block";
    }

    function closeChurchModal() {
        document.getElementById("churchMapsModal").style.display = "none";
    }

    function openDirections() {
        window.open("https://www.google.com/maps/dir/?api=1&destination=Parroquia+Inmaculado+Corazón+de+María");
    }

    // Cerrar modales al hacer clic fuera
    window.onclick = function(event) {
        ['mapsModal', 'bankModal', 'songsModal', 'churchMapsModal'].forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    };

    // Exponer funciones globales
    window.togglePlay = togglePlay;
    window.nextSong = nextSong;
    window.prevSong = prevSong;
    window.openModal = openModal;
    window.closeModal = closeModal;
    window.openConfirmationModal = openConfirmationModal;
    window.closeConfirmationModal = closeConfirmationModal;
    window.openBankModal = openBankModal;
    window.closeBankModal = closeBankModal;
    window.copyToClipboard = copyToClipboard;
    window.openSongsModal = openSongsModal;
    window.closeSongsModal = closeSongsModal;
    window.openChurchModal = openChurchModal;
    window.closeChurchModal = closeChurchModal;
    window.openDirections = openDirections;
});

// Estilos CSS para SweetAlert
const style = document.createElement('style');
style.textContent = `
    .swal-confirm-btn {
        background-color: #a08a5a !important;
        color: white !important;
        border: none !important;
        padding: 10px 25px !important;
        border-radius: 5px !important;
        font-family: 'Lato', sans-serif !important;
        transition: all 0.3s ease !important;
    }
    
    .swal-confirm-btn:hover {
        background-color: #7d6b4f !important;
        transform: translateY(-2px) !important;
    }
    
    .swal-title {
        font-family: 'Great Vibes', cursive !important;
        color: #a08a5a !important;
        font-size: 2rem !important;
    }
    
    .swal-html {
        font-family: 'Lato', sans-serif !important;
        color: #5e4a3a !important;
    }
    
    .swal2-popup {
        border: 1px solid #d08c5c !important;
        box-shadow: 0 0 20px rgba(160, 138, 90, 0.3) !important;
    }
    
    .swal2-toast {
        background: #f0e6d8 !important;
        border: 1px solid #d08c5c !important;
    }
`;
document.head.appendChild(style);