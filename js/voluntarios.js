// Simulación independiente con datos en memoria; no asigna turnos reales.
var voluntarios = [];
var posicionVoluntario = -1;

function errorVoluntario(campo, mensaje) {
    document.getElementById("error-" + campo).textContent = mensaje;
}
function limpiarErroresVoluntario() {
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++) { errores[i].textContent = ""; }
}
function textoVoluntarioValido(texto, minimo, maximo) {
    return /\S/.test(texto) && texto.length >= minimo && texto.length <= maximo;
}
function guardarVoluntario() {
    limpiarErroresVoluntario();
    var nombre = document.getElementById("nombre-voluntario").value;
    var correo = document.getElementById("correo-voluntario").value;
    var celular = document.getElementById("celular-voluntario").value;
    var sector = document.getElementById("sector-voluntario").value;
    var tarea = document.getElementById("tarea-voluntario").value;
    var disponibilidad = document.getElementById("disponibilidad-voluntario").value;
    var horas = document.getElementById("horas-voluntario").value;
    var experiencia = document.getElementById("experiencia-voluntario").value;
    var orientacion = document.getElementById("orientacion-voluntario").checked;
    var radios = document.getElementsByName("turno");
    var turno = "";
    var correcto = true;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) { turno = radios[i].value; }
    }
    if (!textoVoluntarioValido(nombre, 5, 80)) {
        errorVoluntario("nombre", "Escribe un nombre de 5 a 80 caracteres; no uses solo espacios."); correcto = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || correo.length > 120) {
        errorVoluntario("correo", "Escribe un correo válido de hasta 120 caracteres, como voluntario@example.com."); correcto = false;
    }
    if (!/^09\d{8}$/.test(celular)) {
        errorVoluntario("celular", "Escribe 10 dígitos que empiecen con 09, sin espacios ni otros signos."); correcto = false;
    }
    if (!textoVoluntarioValido(sector, 5, 120)) {
        errorVoluntario("sector", "Indica la ciudad y el sector en 5 a 120 caracteres; no uses solo espacios."); correcto = false;
    }
    if (tarea !== "Recepción" && tarea !== "Clasificación" && tarea !== "Preparación") {
        errorVoluntario("tarea", "Selecciona Recepción, Clasificación o Preparación."); correcto = false;
    }
    if (disponibilidad !== "Entre semana" && disponibilidad !== "Fin de semana") {
        errorVoluntario("disponibilidad", "Selecciona Entre semana o Fin de semana."); correcto = false;
    }
    if (turno !== "Mañana" && turno !== "Tarde") {
        errorVoluntario("turno", "Selecciona un turno de mañana o tarde."); correcto = false;
    }
    if (!/^\d+$/.test(horas) || horas * 1 < 1 || horas * 1 > 4) {
        errorVoluntario("horas", "Escribe un número entero de 1 a 4 horas por jornada, sin letras ni decimales."); correcto = false;
    }
    if (!textoVoluntarioValido(experiencia, 15, 300)) {
        errorVoluntario("experiencia", "Describe tu experiencia o disposición en 15 a 300 caracteres; no uses solo espacios."); correcto = false;
    }
    var estado = document.getElementById("estado-voluntario");
    if (!correcto) { estado.textContent = "Revisa los campos señalados. No se guardaron cambios.";
        mostrarPrimerErrorVoluntario(); return; }
    var voluntario = {nombre: nombre, correo: correo, celular: celular, sector: sector, tarea: tarea, disponibilidad: disponibilidad, turno: turno, horas: horas * 1, experiencia: experiencia, orientacion: orientacion};
    var mensaje;
    if (posicionVoluntario === -1) {
        voluntarios.push(voluntario); mensaje = "Voluntario registrado correctamente.";
    } else {
        voluntarios[posicionVoluntario] = voluntario; mensaje = "Datos del voluntario actualizados.";
    }
    limpiarVoluntario();
    mostrarVoluntarios();
    estado.textContent = mensaje;
}
function limpiarVoluntario() {
    var campos = ["nombre", "correo", "celular", "sector", "tarea", "disponibilidad", "horas", "experiencia"];
    for (var i = 0; i < campos.length; i++) { document.getElementById(campos[i] + "-voluntario").value = ""; }
    var radios = document.getElementsByName("turno");
    for (var j = 0; j < radios.length; j++) { radios[j].checked = false; }
    document.getElementById("orientacion-voluntario").checked = false;
    posicionVoluntario = -1;
    limpiarErroresVoluntario();
    document.getElementById("titulo-voluntario").textContent = "Registrar voluntario";
    document.getElementById("guardar-voluntario").textContent = "Registrar voluntario";
    document.getElementById("cancelar-voluntario").style.display = "none";
    document.getElementById("estado-voluntario").textContent = "";
}
function agregarDatoVoluntario(contenedor, etiqueta, contenido, clase, rotulo) {
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
function mostrarVoluntarios() {
    var lista = document.getElementById("lista-voluntarios");
    lista.innerHTML = "";
    document.getElementById("total-voluntarios").textContent = voluntarios.length + " voluntarios";
    if (voluntarios.length === 1) { document.getElementById("total-voluntarios").textContent = "1 voluntario"; }
    if (voluntarios.length === 0) { document.getElementById("sin-voluntarios").style.display = "block"; }
    else { document.getElementById("sin-voluntarios").style.display = "none"; }
    var horasRegistradas = 0;
    var pendientes = 0;
    for (var i = 0; i < voluntarios.length; i++) {
        var voluntario = voluntarios[i];
        horasRegistradas = horasRegistradas + voluntario.horas;
        if (!voluntario.orientacion) { pendientes = pendientes + 1; }
        var tarjeta = document.createElement("article");
        tarjeta.setAttribute("class", "registro-campana registro-voluntario");
        agregarDatoVoluntario(tarjeta, "p", voluntario.tarea + " · " + voluntario.turno, "etiqueta");
        agregarDatoVoluntario(tarjeta, "h3", voluntario.nombre, "nombre-voluntario");
        agregarDatoVoluntario(tarjeta, "p", voluntario.experiencia, "");
        agregarDatoVoluntario(tarjeta, "p", voluntario.correo, "", "Correo: ");
        agregarDatoVoluntario(tarjeta, "p", voluntario.celular, "", "Celular: ");
        agregarDatoVoluntario(tarjeta, "p", voluntario.sector, "", "Ciudad y sector: ");
        agregarDatoVoluntario(tarjeta, "p", voluntario.disponibilidad, "", "Días disponibles: ");
        agregarDatoVoluntario(tarjeta, "p", voluntario.horas, "", "Horas por jornada: ");
        var orientacion = "Orientación pendiente";
        if (voluntario.orientacion) { orientacion = "Orientación recibida"; }
        agregarDatoVoluntario(tarjeta, "p", orientacion, "estado-orientacion");
        var acciones = document.createElement("div");
        acciones.setAttribute("class", "acciones-registro");
        var editar = document.createElement("button");
        editar.setAttribute("type", "button"); editar.setAttribute("class", "boton boton-secundario");
        editar.setAttribute("onclick", "editarVoluntario(" + i + ")"); editar.textContent = "Editar";
        var eliminar = document.createElement("button");
        eliminar.setAttribute("type", "button"); eliminar.setAttribute("class", "boton boton-eliminar");
        eliminar.setAttribute("onclick", "eliminarVoluntario(" + i + ")"); eliminar.textContent = "Eliminar";
        acciones.appendChild(editar); acciones.appendChild(eliminar); tarjeta.appendChild(acciones); lista.appendChild(tarjeta);
    }
    document.getElementById("resumen-voluntarios").textContent = "Suma de horas por jornada registradas: " + horasRegistradas + ". Personas con orientación pendiente: " + pendientes + ".";
    if (voluntarios.length === 0) { document.getElementById("resumen-voluntarios").textContent = "Todavía no hay voluntarios registrados."; }
}
function editarVoluntario(posicion) {
    limpiarVoluntario();
    var voluntario = voluntarios[posicion];
    var campos = ["nombre", "correo", "celular", "sector", "tarea", "disponibilidad", "horas", "experiencia"];
    for (var i = 0; i < campos.length; i++) { document.getElementById(campos[i] + "-voluntario").value = voluntario[campos[i]]; }
    var radios = document.getElementsByName("turno");
    for (var j = 0; j < radios.length; j++) { radios[j].checked = radios[j].value === voluntario.turno; }
    document.getElementById("orientacion-voluntario").checked = voluntario.orientacion;
    posicionVoluntario = posicion;
    document.getElementById("titulo-voluntario").textContent = "Editar voluntario";
    document.getElementById("guardar-voluntario").textContent = "Guardar cambios";
    document.getElementById("cancelar-voluntario").style.display = "inline-block";
    document.getElementById("estado-voluntario").textContent = "Estás editando los datos de " + voluntario.nombre + ".";
    window.location.href = "#titulo-voluntario";
}
function eliminarVoluntario(posicion) {
    if (!confirm("¿Eliminar el registro de " + voluntarios[posicion].nombre + "?")) { return; }
    var restantes = [];
    for (var i = 0; i < voluntarios.length; i++) { if (i !== posicion) { restantes.push(voluntarios[i]); } }
    voluntarios = restantes;
    if (posicionVoluntario === posicion) { limpiarVoluntario(); }
    else if (posicionVoluntario > posicion) { posicionVoluntario = posicionVoluntario - 1; }
    mostrarVoluntarios();
    document.getElementById("estado-voluntario").textContent = "Registro del voluntario eliminado.";
}
function cargarTareaVoluntario() {
    var partes = window.location.href.split("#");
    if (partes.length !== 2) { return; }
    var tareas = ["Recepción", "Clasificación", "Preparación"];
    for (var i = 0; i < tareas.length; i++) {
        if (partes[1] === "tarea-" + i) {
            document.getElementById("tarea-voluntario").value = tareas[i];
            document.getElementById("estado-voluntario").textContent = "Tarea seleccionada: " + tareas[i] + ". Completa los demás datos para registrar al voluntario.";
        }
    }
}
function impedirEnvioVoluntario() { return false; }
document.getElementById("formulario-voluntario").onsubmit = impedirEnvioVoluntario;
document.getElementById("guardar-voluntario").onclick = guardarVoluntario;
document.getElementById("cancelar-voluntario").onclick = limpiarVoluntario;
mostrarVoluntarios();
cargarTareaVoluntario();

function mostrarPrimerErrorVoluntario() {
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++) {
        if (errores[i].textContent !== "") {
            window.location.href = "#campo-" + errores[i].id;
            return;
        }
    }
}
