// Navegación compartida. Se carga después del JavaScript propio de cada página.
var menuAbierto = false;
var gestionAbierta = false;
function cambiarGestion() {
    gestionAbierta = !gestionAbierta;
    var panel = document.getElementById("enlaces-gestion");
    if (gestionAbierta) { panel.style.display = "block"; }
    else { panel.style.display = "none"; }
    document.getElementById("boton-gestion").setAttribute("aria-expanded", gestionAbierta + "");
}
function cambiarMenu() {
    menuAbierto = !menuAbierto;
    var boton = document.getElementById("boton-menu");
    if (menuAbierto) {
        document.getElementById("menu-sitio").setAttribute("class", "menu menu-abierto");
        boton.textContent = "Cerrar menú";
    } else {
        document.getElementById("menu-sitio").setAttribute("class", "menu");
        boton.textContent = "Menú";
        if (gestionAbierta) { cambiarGestion(); }
    }
    boton.setAttribute("aria-expanded", menuAbierto + "");
}

// Se compara con los valores al abrir: una campaña o tarea preseleccionada
// desde otra página no cuenta, por sí sola, como un borrador nuevo.
var camposSalida = [];
var valoresSalida = [];
var opcionesSalida = [];
var formulariosSalida = ["formulario-campana", "formulario-donacion", "formulario-donante", "formulario-voluntario", "formulario-punto"];
for (var n = 0; n < formulariosSalida.length; n++) {
    if (document.getElementById(formulariosSalida[n])) {
        var selectorSalida = "#" + formulariosSalida[n];
        camposSalida = document.querySelectorAll(selectorSalida + " input, " + selectorSalida + " select, " + selectorSalida + " textarea");
        for (var j = 0; j < camposSalida.length; j++) {
            valoresSalida.push(camposSalida[j].value);
            opcionesSalida.push(camposSalida[j].checked);
        }
    }
}
function hayRegistrosTemporales() {
    if (document.getElementById("formulario-campana") && campanas.length > 0) { return true; }
    if (document.getElementById("formulario-donacion") && donaciones.length > 0) { return true; }
    if (document.getElementById("formulario-donante") && donantes.length > 0) { return true; }
    if (document.getElementById("formulario-voluntario") && voluntarios.length > 0) { return true; }
    if (document.getElementById("formulario-punto") && puntos.length > 0) { return true; }
    return false;
}
function hayBorradorNuevo() {
    for (var i = 0; i < camposSalida.length; i++) {
        if (camposSalida[i].value !== "" && camposSalida[i].value !== valoresSalida[i]) { return true; }
        if (camposSalida[i].checked && camposSalida[i].checked !== opcionesSalida[i]) { return true; }
    }
    return false;
}
function confirmarSalida() {
    if (hayRegistrosTemporales()) {
        return confirm("Si sales de esta página se borrarán sus registros temporales y los datos del formulario. ¿Quieres salir?");
    }
    if (hayBorradorNuevo()) {
        return confirm("Hay datos nuevos sin guardar en el formulario. Si sales se perderán. ¿Quieres salir?");
    }
    return true;
}
document.getElementById("boton-menu").onclick = cambiarMenu;
document.getElementById("boton-gestion").onclick = cambiarGestion;
