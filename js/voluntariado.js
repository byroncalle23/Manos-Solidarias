// Las tareas se consultan en la página; no se crean asignaciones reales.
function seleccionarTarea(posicion) {
    var botones = ["tarea-recepcion", "tarea-clasificacion", "tarea-preparacion"];
    var detalles = ["detalle-recepcion", "detalle-clasificacion", "detalle-preparacion"];
    var nombres = ["recepción", "clasificación", "preparación"];
    for (var i = 0; i < botones.length; i++) {
        document.getElementById(botones[i]).setAttribute("class", "opcion-tarea");
        document.getElementById(botones[i]).setAttribute("aria-pressed", "false");
        document.getElementById(detalles[i]).style.display = "none";
    }
    document.getElementById(botones[posicion]).setAttribute("class", "opcion-tarea tarea-activa");
    document.getElementById(botones[posicion]).setAttribute("aria-pressed", "true");
    document.getElementById(detalles[posicion]).style.display = "block";
    document.getElementById("estado-tareas").textContent = "Consultando la tarea de " + nombres[posicion] + ".";
}
function consultarRecepcion() { seleccionarTarea(0); }
function consultarClasificacion() { seleccionarTarea(1); }
function consultarPreparacion() { seleccionarTarea(2); }

function cambiarOrientacion() {
    var detalle = document.getElementById("orientacion-voluntariado");
    var boton = document.getElementById("consultar-orientacion");
    if (detalle.style.display === "none") {
        detalle.style.display = "block";
        boton.setAttribute("aria-expanded", "true");
        boton.textContent = "Ocultar las recomendaciones";
    } else {
        detalle.style.display = "none";
        boton.setAttribute("aria-expanded", "false");
        boton.textContent = "Ver qué conviene confirmar";
    }
}
document.getElementById("tarea-recepcion").onclick = consultarRecepcion;
document.getElementById("tarea-clasificacion").onclick = consultarClasificacion;
document.getElementById("tarea-preparacion").onclick = consultarPreparacion;
document.getElementById("consultar-orientacion").onclick = cambiarOrientacion;
