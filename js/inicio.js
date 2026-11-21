// Selección por ID, evento click, cambio de estilo y contenido con DOM.
function cambiarProposito() {
    var detalle = document.getElementById("detalle-proposito");
    var boton = document.getElementById("boton-proposito");
    if (detalle.style.display === "none") {
        detalle.style.display = "block";
        boton.textContent = "Ocultar nuestro compromiso";
        boton.setAttribute("aria-expanded", "true");
    } else {
        detalle.style.display = "none";
        boton.textContent = "Conocer nuestro compromiso +";
        boton.setAttribute("aria-expanded", "false");
    }
}

document.getElementById("boton-proposito").onclick = cambiarProposito;

// Selección de pasos: querySelectorAll, ciclo for, atributos y eventos de clase.
function seleccionarPaso(posicion) {
    var pasos = document.querySelectorAll(".paso");
    for (var i = 0; i < pasos.length; i++) {
        pasos[i].setAttribute("class", "paso");
        pasos[i].setAttribute("aria-pressed", "false");
        document.getElementById("detalle-paso-" + (i + 1)).style.display = "none";
    }
    pasos[posicion].setAttribute("class", "paso paso-activo");
    pasos[posicion].setAttribute("aria-pressed", "true");
    document.getElementById("detalle-paso-" + (posicion + 1)).style.display = "block";
}

function seleccionarPrimerPaso() {
    seleccionarPaso(0);
}

function seleccionarSegundoPaso() {
    seleccionarPaso(1);
}

function seleccionarTercerPaso() {
    seleccionarPaso(2);
}

document.getElementById("paso-1").onclick = seleccionarPrimerPaso;
document.getElementById("paso-2").onclick = seleccionarSegundoPaso;
document.getElementById("paso-3").onclick = seleccionarTercerPaso;
