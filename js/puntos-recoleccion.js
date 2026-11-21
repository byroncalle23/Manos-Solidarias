// Directorio fijo de ejemplo; los registros del gestor no lo modifican.
function filtrarPuntos(categoria) {
    var tarjetas = document.querySelectorAll(".tarjeta-punto");
    var visibles = document.querySelectorAll(".punto-" + categoria);
    var botones = ["puntos-todos", "puntos-alimentos", "puntos-ropa", "puntos-juguetes"];
    for (var i = 0; i < tarjetas.length; i++) {
        tarjetas[i].style.display = "none";
    }
    if (categoria === "todos") { visibles = tarjetas; }
    for (var j = 0; j < visibles.length; j++) { visibles[j].style.display = "block"; }
    for (var k = 0; k < botones.length; k++) {
        document.getElementById(botones[k]).setAttribute("class", "filtro");
        document.getElementById(botones[k]).setAttribute("aria-pressed", "false");
    }
    document.getElementById("puntos-" + categoria).setAttribute("class", "filtro filtro-activo");
    document.getElementById("puntos-" + categoria).setAttribute("aria-pressed", "true");
    document.getElementById("cantidad-puntos").textContent = visibles.length + " puntos";
}
function consultarTodosPuntos() { filtrarPuntos("todos"); }
function consultarPuntosAlimentos() { filtrarPuntos("alimentos"); }
function consultarPuntosRopa() { filtrarPuntos("ropa"); }
function consultarPuntosJuguetes() { filtrarPuntos("juguetes"); }
function cambiarDetallePunto(numero) {
    var detalle = document.getElementById("detalle-punto-" + numero);
    var boton = document.getElementById("consultar-punto-" + numero);
    if (detalle.style.display === "none") {
        detalle.style.display = "block";
        boton.setAttribute("aria-expanded", "true");
        boton.textContent = "Ocultar detalles de acceso";
    } else {
        detalle.style.display = "none";
        boton.setAttribute("aria-expanded", "false");
        boton.textContent = "Ver detalles de acceso";
    }
}
function cambiarPuntoNorte() { cambiarDetallePunto(1); }
function cambiarPuntoCampus() { cambiarDetallePunto(2); }
function cambiarPuntoSur() { cambiarDetallePunto(3); }
document.getElementById("puntos-todos").onclick = consultarTodosPuntos;
document.getElementById("puntos-alimentos").onclick = consultarPuntosAlimentos;
document.getElementById("puntos-ropa").onclick = consultarPuntosRopa;
document.getElementById("puntos-juguetes").onclick = consultarPuntosJuguetes;
document.getElementById("consultar-punto-1").onclick = cambiarPuntoNorte;
document.getElementById("consultar-punto-2").onclick = cambiarPuntoCampus;
document.getElementById("consultar-punto-3").onclick = cambiarPuntoSur;
