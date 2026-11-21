// Las recomendaciones permanecen en HTML; los botones cambian su visibilidad.
function seleccionarArticulos(posicion) {
    var botones = ["articulo-alimentos", "articulo-ropa", "articulo-juguetes"];
    var detalles = ["detalle-alimentos", "detalle-ropa", "detalle-juguetes"];
    var nombres = ["alimentos", "ropa", "juguetes"];
    for (var i = 0; i < botones.length; i++) {
        document.getElementById(botones[i]).setAttribute("class", "filtro");
        document.getElementById(botones[i]).setAttribute("aria-pressed", "false");
        document.getElementById(detalles[i]).style.display = "none";
    }
    document.getElementById(botones[posicion]).setAttribute("class", "filtro filtro-activo");
    document.getElementById(botones[posicion]).setAttribute("aria-pressed", "true");
    document.getElementById(detalles[posicion]).style.display = "flex";
    document.getElementById("estado-articulos").textContent = "Mostrando recomendaciones de " + nombres[posicion] + ".";
}
function consultarAlimentos() { seleccionarArticulos(0); }
function consultarRopa() { seleccionarArticulos(1); }
function consultarJuguetes() { seleccionarArticulos(2); }

function cambiarPregunta(numero) {
    var respuesta = document.getElementById("respuesta-" + numero);
    var boton = document.getElementById("pregunta-" + numero);
    var signo = document.querySelectorAll("#pregunta-" + numero + " span");
    if (respuesta.style.display === "none") {
        respuesta.style.display = "block";
        boton.setAttribute("aria-expanded", "true");
        signo[0].textContent = "−";
    } else {
        respuesta.style.display = "none";
        boton.setAttribute("aria-expanded", "false");
        signo[0].textContent = "+";
    }
}
function cambiarPrimeraPregunta() { cambiarPregunta(1); }
function cambiarSegundaPregunta() { cambiarPregunta(2); }
function cambiarTerceraPregunta() { cambiarPregunta(3); }
function cambiarCuartaPregunta() { cambiarPregunta(4); }

document.getElementById("articulo-alimentos").onclick = consultarAlimentos;
document.getElementById("articulo-ropa").onclick = consultarRopa;
document.getElementById("articulo-juguetes").onclick = consultarJuguetes;
document.getElementById("pregunta-1").onclick = cambiarPrimeraPregunta;
document.getElementById("pregunta-2").onclick = cambiarSegundaPregunta;
document.getElementById("pregunta-3").onclick = cambiarTerceraPregunta;
document.getElementById("pregunta-4").onclick = cambiarCuartaPregunta;
