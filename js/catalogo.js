// Contenido fijo del HTML; el filtro solo muestra u oculta las tarjetas.
function filtrarCampanas(categoria, posicion) {
    var tarjetas = document.querySelectorAll(".campana-catalogo");
    for (var i = 0; i < tarjetas.length; i++) {
        tarjetas[i].style.display = "none";
    }
    var visibles = tarjetas;
    if (categoria !== "todas") {
        visibles = document.querySelectorAll(".campana-" + categoria);
    }
    for (var j = 0; j < visibles.length; j++) {
        visibles[j].style.display = "flex";
    }
    var filtros = document.querySelectorAll(".filtro");
    for (var k = 0; k < filtros.length; k++) {
        filtros[k].setAttribute("class", "filtro");
        filtros[k].setAttribute("aria-pressed", "false");
    }
    filtros[posicion].setAttribute("class", "filtro filtro-activo");
    filtros[posicion].setAttribute("aria-pressed", "true");
    document.getElementById("cantidad-catalogo").textContent = visibles.length + " campañas";
}
function mostrarTodas() { filtrarCampanas("todas", 0); }
function mostrarAlimentos() { filtrarCampanas("alimentos", 1); }
function mostrarRopa() { filtrarCampanas("ropa", 2); }
function mostrarJuguetes() { filtrarCampanas("juguetes", 3); }
function cambiarConsejos() {
    var detalle = document.getElementById("consejos-entrega");
    var boton = document.getElementById("boton-consejos");
    if (detalle.style.display === "none") {
        detalle.style.display = "block";
        boton.textContent = "Ocultar recomendaciones";
        boton.setAttribute("aria-expanded", "true");
    } else {
        detalle.style.display = "none";
        boton.textContent = "Ver recomendaciones";
        boton.setAttribute("aria-expanded", "false");
    }
}
document.getElementById("filtro-todas").onclick = mostrarTodas;
document.getElementById("filtro-alimentos").onclick = mostrarAlimentos;
document.getElementById("filtro-ropa").onclick = mostrarRopa;
document.getElementById("filtro-juguetes").onclick = mostrarJuguetes;
document.getElementById("boton-consejos").onclick = cambiarConsejos;
