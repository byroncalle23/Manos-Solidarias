// Datos ficticios del catálogo, en el mismo orden que las opciones del formulario.
var nombresCampanas = ["Una despensa compartida", "Abrigos para la comunidad", "Juguetes para compartir", "Apoyo a la cocina comunitaria", "Ropa para volver a empezar", "Un espacio para jugar"];
var categoriasCampanas = ["Alimentos", "Ropa", "Juguetes", "Alimentos", "Ropa", "Juguetes"];
var fechasCampanas = ["2027-02-28", "2027-03-15", "2027-03-31", "2027-04-15", "2027-04-30", "2027-05-15"];
var donaciones = [];
var posicionDonacion = -1;

function errorDonacion(campo, mensaje) {
    document.getElementById("error-" + campo).textContent = mensaje;
}
function limpiarErroresDonacion() {
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++) { errores[i].textContent = ""; }
}
function textoDonacionValido(texto, minimo, maximo) {
    return /\S/.test(texto) && texto.length >= minimo && texto.length <= maximo;
}
function fechaDonacionValida(fecha) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) { return false; }
    var partes = fecha.split("-");
    var anio = partes[0] * 1;
    var mes = partes[1] * 1;
    var dia = partes[2] * 1;
    var diasMes = 31;
    if (anio < 2026 || anio > 2100 || mes < 1 || mes > 12) { return false; }
    if (mes === 4 || mes === 6 || mes === 9 || mes === 11) { diasMes = 30; }
    if (mes === 2) {
        diasMes = 28;
        if (anio % 400 === 0 || (anio % 4 === 0 && anio % 100 !== 0)) { diasMes = 29; }
    }
    return dia >= 1 && dia <= diasMes;
}
function guardarDonacion() {
    limpiarErroresDonacion();
    var nombre = document.getElementById("nombre-donacion").value;
    var correo = document.getElementById("correo-donacion").value;
    var campana = document.getElementById("campana-donacion").value;
    var categoria = document.getElementById("categoria-donacion").value;
    var cantidad = document.getElementById("cantidad-donacion").value;
    var fecha = document.getElementById("fecha-donacion").value;
    var detalle = document.getElementById("detalle-donacion").value;
    var entregada = document.getElementById("entregada-donacion").checked;
    var radios = document.getElementsByName("modalidad");
    var modalidad = "";
    var correcto = true;
    var campanaCorrecta = /^[0-5]$/.test(campana);
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) { modalidad = radios[i].value; }
    }
    if (!textoDonacionValido(nombre, 5, 80)) {
        errorDonacion("nombre", "Escribe un nombre de 5 a 80 caracteres; no uses solo espacios."); correcto = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || correo.length > 120) {
        errorDonacion("correo", "Escribe un correo válido de hasta 120 caracteres, como nombre@ejemplo.com."); correcto = false;
    }
    if (!campanaCorrecta) {
        errorDonacion("campana", "Selecciona una de las campañas del catálogo."); correcto = false;
    }
    if (categoria !== "Alimentos" && categoria !== "Ropa" && categoria !== "Juguetes") {
        errorDonacion("categoria", "Selecciona el tipo de donación."); correcto = false;
    } else if (campanaCorrecta && categoria !== categoriasCampanas[campana * 1]) {
        errorDonacion("categoria", "Esta campaña acepta " + categoriasCampanas[campana * 1] + ". Revisa la categoría del aporte."); correcto = false;
    }
    if (!/^\d+$/.test(cantidad) || cantidad * 1 < 1 || cantidad * 1 > 10000) {
        errorDonacion("cantidad", "Escribe una cantidad entera entre 1 y 10000, sin letras ni decimales."); correcto = false;
    }
    if (!fechaDonacionValida(fecha)) {
        errorDonacion("fecha", "Selecciona una fecha válida entre 2026 y 2100."); correcto = false;
    } else if (campanaCorrecta && fecha > fechasCampanas[campana * 1]) {
        errorDonacion("fecha", "La fecha de entrega debe ser anterior o igual al cierre de la campaña: " + fechasCampanas[campana * 1] + "."); correcto = false;
    }
    if (!textoDonacionValido(detalle, 15, 300)) {
        errorDonacion("detalle", "Describe los artículos en 15 a 300 caracteres; no uses solo espacios."); correcto = false;
    }
    if (modalidad !== "Entrega directa" && modalidad !== "Coordinar entrega") {
        errorDonacion("modalidad", "Indica cómo entregarás tu aporte."); correcto = false;
    }
    var estado = document.getElementById("estado-donacion");
    if (!correcto) { estado.textContent = "Revisa los campos señalados. No se guardaron cambios.";
        mostrarPrimerErrorDonacion(); return; }
    var donacion = {nombre: nombre, correo: correo, campana: campana, categoria: categoria, cantidad: cantidad * 1, fecha: fecha, detalle: detalle, modalidad: modalidad, entregada: entregada};
    var mensaje;
    if (posicionDonacion === -1) {
        donaciones.push(donacion); mensaje = "Donación registrada.";
    } else {
        donaciones[posicionDonacion] = donacion; mensaje = "Donación actualizada.";
    }
    limpiarDonacion(); mostrarDonaciones(); estado.textContent = mensaje;
}
function limpiarDonacion() {
    var campos = ["nombre", "correo", "campana", "categoria", "cantidad", "fecha", "detalle"];
    for (var i = 0; i < campos.length; i++) { document.getElementById(campos[i] + "-donacion").value = ""; }
    var radios = document.getElementsByName("modalidad");
    for (var j = 0; j < radios.length; j++) { radios[j].checked = false; }
    document.getElementById("entregada-donacion").checked = false;
    posicionDonacion = -1;
    limpiarErroresDonacion();
    document.getElementById("titulo-donacion").textContent = "Registrar donación";
    document.getElementById("guardar-donacion").textContent = "Registrar donación";
    document.getElementById("cancelar-donacion").style.display = "none";
    document.getElementById("estado-donacion").textContent = "";
}
function agregarDatoDonacion(contenedor, etiqueta, contenido, clase, rotulo) {
    var elemento = document.createElement(etiqueta);
    if (rotulo) {
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
function mostrarDonaciones() {
    var lista = document.getElementById("lista-donaciones");
    lista.innerHTML = "";
    document.getElementById("total-donaciones").textContent = donaciones.length + " donaciones";
    if (donaciones.length === 1) { document.getElementById("total-donaciones").textContent = "1 donación"; }
    document.getElementById("resumen-total").textContent = donaciones.length;
    var entregadas = 0;
    if (donaciones.length === 0) {
        document.getElementById("sin-donaciones").style.display = "block";
    } else { document.getElementById("sin-donaciones").style.display = "none"; }
    for (var i = 0; i < donaciones.length; i++) {
        var donacion = donaciones[i];
        var tarjeta = document.createElement("article");
        tarjeta.setAttribute("class", "registro-campana registro-donacion");
        agregarDatoDonacion(tarjeta, "p", donacion.categoria, "etiqueta");
        agregarDatoDonacion(tarjeta, "h3", nombresCampanas[donacion.campana * 1], "nombre-donacion");
        agregarDatoDonacion(tarjeta, "p", donacion.detalle, "");
        agregarDatoDonacion(tarjeta, "p", donacion.nombre, "", "Donante: ");
        agregarDatoDonacion(tarjeta, "p", donacion.correo, "", "Contacto: ");
        agregarDatoDonacion(tarjeta, "p", donacion.cantidad + " artículos", "", "Cantidad: ");
        var partes = donacion.fecha.split("-");
        agregarDatoDonacion(tarjeta, "p", partes[2] + "/" + partes[1] + "/" + partes[0], "", "Entrega prevista: ");
        agregarDatoDonacion(tarjeta, "p", donacion.modalidad, "", "Modalidad: ");
        var estado = "Pendiente de entrega";
        if (donacion.entregada) { estado = "Entregada, según el registro del donante"; entregadas = entregadas + 1; }
        agregarDatoDonacion(tarjeta, "p", estado, "estado-entrega");
        var acciones = document.createElement("div"); acciones.setAttribute("class", "acciones-registro");
        var editar = document.createElement("button"); editar.setAttribute("type", "button"); editar.setAttribute("class", "boton boton-secundario"); editar.setAttribute("onclick", "editarDonacion(" + i + ")"); editar.textContent = "Editar";
        var eliminar = document.createElement("button"); eliminar.setAttribute("type", "button"); eliminar.setAttribute("class", "boton boton-eliminar"); eliminar.setAttribute("onclick", "eliminarDonacion(" + i + ")"); eliminar.textContent = "Eliminar";
        acciones.appendChild(editar); acciones.appendChild(eliminar); tarjeta.appendChild(acciones); lista.appendChild(tarjeta);
    }
    document.getElementById("resumen-texto").textContent = "Entregadas: " + entregadas + ". Pendientes: " + (donaciones.length - entregadas) + ". Según tus registros.";
    if (donaciones.length === 0) { document.getElementById("resumen-texto").textContent = "Todavía no has registrado donaciones."; }
}
function editarDonacion(posicion) {
    limpiarDonacion();
    var donacion = donaciones[posicion];
    var campos = ["nombre", "correo", "campana", "categoria", "cantidad", "fecha", "detalle"];
    for (var i = 0; i < campos.length; i++) { document.getElementById(campos[i] + "-donacion").value = donacion[campos[i]]; }
    var radios = document.getElementsByName("modalidad");
    for (var j = 0; j < radios.length; j++) { radios[j].checked = radios[j].value === donacion.modalidad; }
    document.getElementById("entregada-donacion").checked = donacion.entregada;
    posicionDonacion = posicion;
    document.getElementById("titulo-donacion").textContent = "Editar donación";
    document.getElementById("guardar-donacion").textContent = "Guardar cambios";
    document.getElementById("cancelar-donacion").style.display = "inline-block";
    document.getElementById("estado-donacion").textContent = "Estás editando el aporte de " + donacion.nombre + ".";
    window.location.href = "#titulo-donacion";
}
function eliminarDonacion(posicion) {
    if (!confirm("¿Eliminar el aporte de " + donaciones[posicion].nombre + "?")) { return; }
    var restantes = [];
    for (var i = 0; i < donaciones.length; i++) { if (i !== posicion) { restantes.push(donaciones[i]); } }
    donaciones = restantes;
    if (posicionDonacion === posicion) { limpiarDonacion(); }
    else if (posicionDonacion > posicion) { posicionDonacion = posicionDonacion - 1; }
    mostrarDonaciones();
    document.getElementById("estado-donacion").textContent = "Donación eliminada.";
}
function impedirEnvioDonacion() { return false; }
document.getElementById("formulario-donacion").onsubmit = impedirEnvioDonacion;
document.getElementById("guardar-donacion").onclick = guardarDonacion;
document.getElementById("cancelar-donacion").onclick = limpiarDonacion;
mostrarDonaciones();

// El enlace del catálogo lleva solo el número de una campaña de ejemplo.
var partesEnlace = window.location.href.split("#campana-");
if (partesEnlace.length === 2 && /^[0-5]$/.test(partesEnlace[1])) {
    document.getElementById("campana-donacion").value = partesEnlace[1];
    document.getElementById("categoria-donacion").value = categoriasCampanas[partesEnlace[1] * 1];
}

function mostrarPrimerErrorDonacion() {
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++) {
        if (errores[i].textContent !== "") {
            window.location.href = "#campo-" + errores[i].id;
            return;
        }
    }
}
