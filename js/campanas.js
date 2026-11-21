// Arreglo de objetos en memoria. Se reinicia al recargar o salir de la página.
var campanas = [];
var posicionEdicion = -1;

function escribirError(campo, mensaje) {
    document.getElementById("error-" + campo).textContent = mensaje;
}

function limpiarErrores() {
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++) {
        errores[i].textContent = "";
    }
}

// Detecta también textos que solo contienen espacios.
function textoValido(texto, minimo, maximo) {
    return /\S/.test(texto) && texto.length >= minimo && texto.length <= maximo;
}

// Comprueba formato, rango del año y días reales del calendario con operadores.
function fechaValida(fecha) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return false;
    }
    var partes = fecha.split("-");
    var anio = partes[0] * 1;
    var mes = partes[1] * 1;
    var dia = partes[2] * 1;
    var diasMes = 31;
    if (anio < 2026 || anio > 2100 || mes < 1 || mes > 12) {
        return false;
    }
    if (mes === 4 || mes === 6 || mes === 9 || mes === 11) {
        diasMes = 30;
    }
    if (mes === 2) {
        diasMes = 28;
        if (anio % 400 === 0 || (anio % 4 === 0 && anio % 100 !== 0)) {
            diasMes = 29;
        }
    }
    return dia >= 1 && dia <= diasMes;
}

function guardarCampana() {
    limpiarErrores();
    var nombre = document.getElementById("nombre-campana").value;
    var objetivo = document.getElementById("objetivo-campana").value;
    var beneficiarios = document.getElementById("beneficiarios-campana").value;
    var ubicacion = document.getElementById("ubicacion-campana").value;
    var correo = document.getElementById("correo-campana").value;
    var categoria = document.getElementById("categoria-campana").value;
    var meta = document.getElementById("meta-campana").value;
    var fecha = document.getElementById("fecha-campana").value;
    var voluntarios = document.getElementById("voluntarios-campana").checked;
    var radios = document.getElementsByName("alcance");
    var alcance = "";
    var correcto = true;
    var estado = document.getElementById("estado-formulario");
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            alcance = radios[i].value;
        }
    }
    if (!textoValido(nombre, 5, 80)) {
        escribirError("nombre", "Escribe un nombre de 5 a 80 caracteres; no puede contener solo espacios.");
        correcto = false;
    }
    if (!textoValido(objetivo, 15, 400)) {
        escribirError("objetivo", "Explica el objetivo en 15 a 400 caracteres; no uses solo espacios.");
        correcto = false;
    }
    if (!textoValido(beneficiarios, 5, 120)) {
        escribirError("beneficiarios", "Indica los beneficiarios en 5 a 120 caracteres; no uses solo espacios.");
        correcto = false;
    }
    if (!textoValido(ubicacion, 10, 160)) {
        escribirError("ubicacion", "Escribe una dirección de 10 a 160 caracteres; no uses solo espacios.");
        correcto = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || correo.length > 120) {
        escribirError("correo", "Escribe un correo válido de hasta 120 caracteres, por ejemplo nombre@ejemplo.com.");
        correcto = false;
    }
    if (categoria !== "Alimentos" && categoria !== "Ropa" && categoria !== "Juguetes") {
        escribirError("categoria", "Selecciona el tipo principal de donación.");
        correcto = false;
    }
    if (!/^\d+$/.test(meta) || meta * 1 < 1 || meta * 1 > 10000) {
        escribirError("meta", "Ingresa una cantidad entera entre 1 y 10000, sin letras ni decimales.");
        correcto = false;
    }
    if (!fechaValida(fecha)) {
        escribirError("fecha", "Selecciona una fecha válida entre 2026 y 2100.");
        correcto = false;
    }
    if (alcance !== "Barrial" && alcance !== "Universitario") {
        escribirError("alcance", "Selecciona el alcance de la campaña.");
        correcto = false;
    }
    if (!correcto) {
        estado.textContent = "Revisa los campos señalados. No se guardaron cambios.";
        mostrarPrimerErrorCampana();
        return;
    }
    var campana = {
        nombre: nombre, objetivo: objetivo, beneficiarios: beneficiarios,
        ubicacion: ubicacion, correo: correo, categoria: categoria,
        meta: meta * 1, fecha: fecha, alcance: alcance, voluntarios: voluntarios
    };
    var mensaje;
    if (posicionEdicion === -1) {
        campanas.push(campana);
        mensaje = "Campaña creada correctamente.";
    } else {
        campanas[posicionEdicion] = campana;
        mensaje = "Campaña actualizada correctamente.";
    }
    limpiarFormulario();
    mostrarCampanas();
    estado.textContent = mensaje;
}

function limpiarFormulario() {
    var campos = ["nombre", "objetivo", "beneficiarios", "ubicacion", "correo", "categoria", "meta", "fecha"];
    for (var i = 0; i < campos.length; i++) {
        document.getElementById(campos[i] + "-campana").value = "";
    }
    var radios = document.getElementsByName("alcance");
    for (var j = 0; j < radios.length; j++) {
        radios[j].checked = false;
    }
    document.getElementById("voluntarios-campana").checked = false;
    posicionEdicion = -1;
    limpiarErrores();
    document.getElementById("titulo-formulario").textContent = "Crear campaña";
    document.getElementById("guardar-campana").textContent = "Crear campaña";
    document.getElementById("cancelar-edicion").style.display = "none";
    document.getElementById("estado-formulario").textContent = "";
}

function agregarTexto(contenedor, etiqueta, contenido, clase, rotulo) {
    var elemento = document.createElement(etiqueta);
    if (rotulo) {
        var etiquetaDato = document.createElement("strong");
        etiquetaDato.textContent = rotulo;
        var valorDato = document.createElement("span");
        valorDato.textContent = contenido;
        elemento.appendChild(etiquetaDato);
        elemento.appendChild(valorDato);
    } else { elemento.textContent = contenido; }
    if (clase !== "") {
        elemento.setAttribute("class", clase);
    }
    contenedor.appendChild(elemento);
}

function mostrarCampanas() {
    var lista = document.getElementById("lista-campanas");
    // Se vacía solo el contenedor. Los valores del usuario se muestran como texto.
    lista.innerHTML = "";
    document.getElementById("total-campanas").textContent = campanas.length + " campañas";
    if (campanas.length === 0) {
        document.getElementById("sin-campanas").style.display = "block";
    } else {
        document.getElementById("sin-campanas").style.display = "none";
    }
    for (var i = 0; i < campanas.length; i++) {
        var campana = campanas[i];
        var tarjeta = document.createElement("article");
        tarjeta.setAttribute("class", "registro-campana");
        agregarTexto(tarjeta, "p", campana.categoria + " · " + campana.alcance, "etiqueta");
        agregarTexto(tarjeta, "h3", campana.nombre, "nombre-campana");
        agregarTexto(tarjeta, "p", campana.objetivo, "");
        agregarTexto(tarjeta, "p", campana.beneficiarios, "", "Beneficiarios: ");
        agregarTexto(tarjeta, "p", campana.ubicacion, "", "Recolección: ");
        agregarTexto(tarjeta, "p", campana.correo, "", "Contacto: ");
        agregarTexto(tarjeta, "p", campana.meta + " artículos", "", "Meta: ");
        var partesFecha = campana.fecha.split("-");
        agregarTexto(tarjeta, "p", partesFecha[2] + "/" + partesFecha[1] + "/" + partesFecha[0], "", "Fecha límite: ");
        var apoyo = "No solicita voluntarios";
        if (campana.voluntarios) {
            apoyo = "Recibe apoyo de voluntarios";
        }
        agregarTexto(tarjeta, "p", apoyo, "");
        var acciones = document.createElement("div");
        acciones.setAttribute("class", "acciones-registro");
        var editar = document.createElement("button");
        editar.setAttribute("type", "button");
        editar.setAttribute("class", "boton boton-secundario");
        editar.setAttribute("onclick", "editarCampana(" + i + ")");
        editar.textContent = "Editar";
        var eliminar = document.createElement("button");
        eliminar.setAttribute("type", "button");
        eliminar.setAttribute("class", "boton boton-eliminar");
        eliminar.setAttribute("onclick", "eliminarCampana(" + i + ")");
        eliminar.textContent = "Eliminar";
        acciones.appendChild(editar);
        acciones.appendChild(eliminar);
        tarjeta.appendChild(acciones);
        lista.appendChild(tarjeta);
    }
}

function editarCampana(posicion) {
    limpiarFormulario();
    var campana = campanas[posicion];
    var campos = ["nombre", "objetivo", "beneficiarios", "ubicacion", "correo", "categoria", "meta", "fecha"];
    for (var i = 0; i < campos.length; i++) {
        document.getElementById(campos[i] + "-campana").value = campana[campos[i]];
    }
    var radios = document.getElementsByName("alcance");
    for (var j = 0; j < radios.length; j++) {
        radios[j].checked = radios[j].value === campana.alcance;
    }
    document.getElementById("voluntarios-campana").checked = campana.voluntarios;
    posicionEdicion = posicion;
    document.getElementById("titulo-formulario").textContent = "Editar campaña";
    document.getElementById("guardar-campana").textContent = "Guardar cambios";
    document.getElementById("cancelar-edicion").style.display = "inline-block";
    document.getElementById("estado-formulario").textContent = "Estás editando: " + campana.nombre + ". Modifica los datos y guarda los cambios.";
    // El formulario aparece primero en la página, también al editar en un móvil.
    window.location.href = "#titulo-formulario";
}

function eliminarCampana(posicion) {
    if (!confirm("¿Eliminar la campaña " + campanas[posicion].nombre + "?")) {
        return;
    }
    // Se reconstruye el arreglo con for y push, sin métodos adicionales.
    var restantes = [];
    for (var i = 0; i < campanas.length; i++) {
        if (i !== posicion) {
            restantes.push(campanas[i]);
        }
    }
    campanas = restantes;
    if (posicionEdicion === posicion) {
        limpiarFormulario();
    } else if (posicionEdicion > posicion) {
        posicionEdicion = posicionEdicion - 1;
    }
    mostrarCampanas();
    document.getElementById("estado-formulario").textContent = "Campaña eliminada correctamente.";
}

// Evita que Enter envíe el formulario o active la validación del navegador.
function impedirEnvio() {
    return false;
}

document.getElementById("formulario-campana").onsubmit = impedirEnvio;
document.getElementById("guardar-campana").onclick = guardarCampana;
document.getElementById("cancelar-edicion").onclick = limpiarFormulario;
mostrarCampanas();

function mostrarPrimerErrorCampana() {
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++) {
        if (errores[i].textContent !== "") {
            window.location.href = "#campo-" + errores[i].id;
            return;
        }
    }
}
