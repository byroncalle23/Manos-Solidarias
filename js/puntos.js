// Gestor de lugares ficticios, independiente del directorio y sin persistencia.
var puntos = [];
var posicionPunto = -1;
function errorPunto(campo, mensaje) { document.getElementById("error-" + campo).textContent = mensaje; }
function limpiarErroresPunto() {
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++) { errores[i].textContent = ""; }
}
function textoPuntoValido(texto, minimo, maximo) {
    return /\S/.test(texto) && texto.length >= minimo && texto.length <= maximo;
}
function horaPuntoValida(hora) { return /^([01]\d|2[0-3]):[0-5]\d$/.test(hora); }
function guardarPunto() {
    limpiarErroresPunto();
    var nombre = document.getElementById("nombre-punto").value;
    var sector = document.getElementById("sector-punto").value;
    var direccion = document.getElementById("direccion-punto").value;
    var responsable = document.getElementById("responsable-punto").value;
    var correo = document.getElementById("correo-punto").value;
    var celular = document.getElementById("celular-punto").value;
    var articulos = document.getElementById("articulos-punto").value;
    var dias = document.getElementById("dias-punto").value;
    var apertura = document.getElementById("apertura-punto").value;
    var cierre = document.getElementById("cierre-punto").value;
    var indicaciones = document.getElementById("indicaciones-punto").value;
    var acceso = document.getElementById("acceso-punto").checked;
    var correcto = true;
    if (!textoPuntoValido(nombre, 5, 100)) { errorPunto("nombre", "Escribe un nombre de 5 a 100 caracteres; no uses solo espacios."); correcto = false; }
    if (!textoPuntoValido(sector, 5, 120)) { errorPunto("sector", "Indica ciudad y sector en 5 a 120 caracteres; no uses solo espacios."); correcto = false; }
    if (!textoPuntoValido(direccion, 10, 160)) { errorPunto("direccion", "Escribe una dirección de 10 a 160 caracteres; no uses solo espacios."); correcto = false; }
    if (!textoPuntoValido(responsable, 5, 80)) { errorPunto("responsable", "Escribe el nombre del responsable en 5 a 80 caracteres; no uses solo espacios."); correcto = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || correo.length > 120) { errorPunto("correo", "Escribe un correo válido de hasta 120 caracteres, como punto@example.com."); correcto = false; }
    if (!/^09\d{8}$/.test(celular)) { errorPunto("celular", "Escribe 10 dígitos que empiecen con 09, sin espacios ni otros signos."); correcto = false; }
    if (articulos !== "Alimentos" && articulos !== "Ropa" && articulos !== "Juguetes" && articulos !== "Mixto") { errorPunto("articulos", "Selecciona Alimentos, Ropa, Juguetes o Mixto."); correcto = false; }
    if (dias !== "Lunes a viernes" && dias !== "Sábados" && dias !== "Domingos") { errorPunto("dias", "Selecciona una de las opciones de días de recepción."); correcto = false; }
    if (!horaPuntoValida(apertura)) { errorPunto("apertura", "Escribe la apertura en formato HH:MM, de 00:00 a 23:59."); correcto = false; }
    if (!horaPuntoValida(cierre)) { errorPunto("cierre", "Escribe el cierre en formato HH:MM, de 00:00 a 23:59."); correcto = false; }
    if (horaPuntoValida(apertura) && horaPuntoValida(cierre) && cierre <= apertura) {
        errorPunto("cierre", "El cierre debe ser posterior a la apertura dentro del mismo día."); correcto = false;
    }
    if (!textoPuntoValido(indicaciones, 15, 300)) { errorPunto("indicaciones", "Describe la entrega y el acceso en 15 a 300 caracteres; no uses solo espacios."); correcto = false; }
    var estado = document.getElementById("estado-punto");
    if (!correcto) { estado.textContent = "Revisa los campos señalados. No se guardaron cambios.";
        mostrarPrimerErrorPunto(); return; }
    var punto = {nombre: nombre, sector: sector, direccion: direccion, responsable: responsable, correo: correo, celular: celular, articulos: articulos, dias: dias, apertura: apertura, cierre: cierre, indicaciones: indicaciones, acceso: acceso};
    var mensaje;
    if (posicionPunto === -1) { puntos.push(punto); mensaje = "Punto registrado correctamente."; }
    else { puntos[posicionPunto] = punto; mensaje = "Datos del punto actualizados."; }
    limpiarPunto(); mostrarPuntos(); estado.textContent = mensaje;
}
function limpiarPunto() {
    var campos = ["nombre", "sector", "direccion", "responsable", "correo", "celular", "articulos", "dias", "apertura", "cierre", "indicaciones"];
    for (var i = 0; i < campos.length; i++) { document.getElementById(campos[i] + "-punto").value = ""; }
    document.getElementById("acceso-punto").checked = false;
    posicionPunto = -1; limpiarErroresPunto();
    document.getElementById("titulo-punto").textContent = "Registrar punto";
    document.getElementById("guardar-punto").textContent = "Registrar punto";
    document.getElementById("cancelar-punto").style.display = "none";
    document.getElementById("estado-punto").textContent = "";
}
function agregarDatoPunto(contenedor, etiqueta, contenido, clase, rotulo) {
    var elemento = document.createElement(etiqueta); if (rotulo) {
        var etiquetaDato = document.createElement("strong");
        etiquetaDato.textContent = rotulo;
        var valorDato = document.createElement("span");
        valorDato.textContent = contenido;
        elemento.appendChild(etiquetaDato);
        elemento.appendChild(valorDato);
    } else { elemento.textContent = contenido; }
    if (clase !== "") { elemento.setAttribute("class", clase); }
    contenedor.appendChild(elemento);
}
function mostrarPuntos() {
    var lista = document.getElementById("lista-puntos"); lista.innerHTML = "";
    document.getElementById("total-puntos").textContent = puntos.length + " puntos";
    if (puntos.length === 1) { document.getElementById("total-puntos").textContent = "1 punto"; }
    if (puntos.length === 0) { document.getElementById("sin-puntos").style.display = "block"; }
    else { document.getElementById("sin-puntos").style.display = "none"; }
    var mixtos = 0; var accesos = 0;
    for (var i = 0; i < puntos.length; i++) {
        var punto = puntos[i];
        if (punto.articulos === "Mixto") { mixtos = mixtos + 1; }
        if (punto.acceso) { accesos = accesos + 1; }
        var tarjeta = document.createElement("article"); tarjeta.setAttribute("class", "registro-campana registro-punto");
        agregarDatoPunto(tarjeta, "p", punto.articulos + " · " + punto.dias, "etiqueta");
        agregarDatoPunto(tarjeta, "h3", punto.nombre, "nombre-punto");
        agregarDatoPunto(tarjeta, "p", punto.sector, "", "Ciudad y sector: ");
        agregarDatoPunto(tarjeta, "p", punto.direccion, "", "Dirección: ");
        agregarDatoPunto(tarjeta, "p", punto.responsable, "", "Responsable: ");
        agregarDatoPunto(tarjeta, "p", punto.correo, "", "Correo: ");
        agregarDatoPunto(tarjeta, "p", punto.celular, "", "Celular: ");
        agregarDatoPunto(tarjeta, "p", punto.apertura + " a " + punto.cierre, "", "Horario: ");
        agregarDatoPunto(tarjeta, "p", punto.indicaciones, "");
        var acceso = "Acceso sin escalones sin confirmar";
        if (punto.acceso) { acceso = "Acceso sin escalones indicado"; }
        agregarDatoPunto(tarjeta, "p", acceso, "estado-acceso");
        var acciones = document.createElement("div"); acciones.setAttribute("class", "acciones-registro");
        var editar = document.createElement("button"); editar.setAttribute("type", "button"); editar.setAttribute("class", "boton boton-secundario"); editar.setAttribute("onclick", "editarPunto(" + i + ")"); editar.textContent = "Editar";
        var eliminar = document.createElement("button"); eliminar.setAttribute("type", "button"); eliminar.setAttribute("class", "boton boton-eliminar"); eliminar.setAttribute("onclick", "eliminarPunto(" + i + ")"); eliminar.textContent = "Eliminar";
        acciones.appendChild(editar); acciones.appendChild(eliminar); tarjeta.appendChild(acciones); lista.appendChild(tarjeta);
    }
    document.getElementById("resumen-puntos").textContent = "Puntos mixtos: " + mixtos + ". Con acceso sin escalones indicado: " + accesos + ".";
    if (puntos.length === 0) { document.getElementById("resumen-puntos").textContent = "Todavía no hay puntos registrados."; }
}
function editarPunto(posicion) {
    limpiarPunto(); var punto = puntos[posicion];
    var campos = ["nombre", "sector", "direccion", "responsable", "correo", "celular", "articulos", "dias", "apertura", "cierre", "indicaciones"];
    for (var i = 0; i < campos.length; i++) { document.getElementById(campos[i] + "-punto").value = punto[campos[i]]; }
    document.getElementById("acceso-punto").checked = punto.acceso; posicionPunto = posicion;
    document.getElementById("titulo-punto").textContent = "Editar punto";
    document.getElementById("guardar-punto").textContent = "Guardar cambios";
    document.getElementById("cancelar-punto").style.display = "inline-block";
    document.getElementById("estado-punto").textContent = "Estás editando los datos de " + punto.nombre + ".";
    window.location.href = "#titulo-punto";
}
function eliminarPunto(posicion) {
    if (!confirm("¿Eliminar el punto " + puntos[posicion].nombre + "?")) { return; }
    var restantes = [];
    for (var i = 0; i < puntos.length; i++) { if (i !== posicion) { restantes.push(puntos[i]); } }
    puntos = restantes;
    if (posicionPunto === posicion) { limpiarPunto(); }
    else if (posicionPunto > posicion) { posicionPunto = posicionPunto - 1; }
    mostrarPuntos(); document.getElementById("estado-punto").textContent = "Punto eliminado correctamente.";
}
function impedirEnvioPunto() { return false; }
document.getElementById("formulario-punto").onsubmit = impedirEnvioPunto;
document.getElementById("guardar-punto").onclick = guardarPunto;
document.getElementById("cancelar-punto").onclick = limpiarPunto;
mostrarPuntos();

function mostrarPrimerErrorPunto() {
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++) {
        if (errores[i].textContent !== "") {
            window.location.href = "#campo-" + errores[i].id;
            return;
        }
    }
}
