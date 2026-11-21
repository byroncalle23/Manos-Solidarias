// Registro independiente en memoria, sin cuentas ni envíos de información.
var donantes = [];
var posicionDonante = -1;

function errorDonante(campo, mensaje) {
    document.getElementById("error-" + campo).textContent = mensaje;
}
function limpiarErroresDonante() {
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++) { errores[i].textContent = ""; }
}
function textoDonanteValido(texto, minimo, maximo) {
    return /\S/.test(texto) && texto.length >= minimo && texto.length <= maximo;
}
function guardarDonante() {
    limpiarErroresDonante();
    var nombre = document.getElementById("nombre-donante").value;
    var tipo = document.getElementById("tipo-donante").value;
    var correo = document.getElementById("correo-donante").value;
    var celular = document.getElementById("celular-donante").value;
    var sector = document.getElementById("sector-donante").value;
    var interes = document.getElementById("interes-donante").value;
    var detalle = document.getElementById("detalle-donante").value;
    var contacto = document.getElementById("contacto-donante").checked;
    var radios = document.getElementsByName("frecuencia");
    var frecuencia = "";
    var correcto = true;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) { frecuencia = radios[i].value; }
    }
    if (!textoDonanteValido(nombre, 5, 100)) {
        errorDonante("nombre", "Escribe un nombre de 5 a 100 caracteres; no uses solo espacios."); correcto = false;
    }
    if (tipo !== "Persona" && tipo !== "Organización") {
        errorDonante("tipo", "Selecciona Persona u Organización."); correcto = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) || correo.length > 120) {
        errorDonante("correo", "Escribe un correo válido de hasta 120 caracteres, como donante@example.com."); correcto = false;
    }
    if (!/^09\d{8}$/.test(celular)) {
        errorDonante("celular", "Escribe 10 dígitos que empiecen con 09, sin espacios ni otros signos."); correcto = false;
    }
    if (!textoDonanteValido(sector, 5, 120)) {
        errorDonante("sector", "Indica la ciudad y el sector en 5 a 120 caracteres; no uses solo espacios."); correcto = false;
    }
    if (interes !== "Alimentos" && interes !== "Ropa" && interes !== "Juguetes") {
        errorDonante("interes", "Selecciona el principal tipo de artículo con el que desea colaborar."); correcto = false;
    }
    if (frecuencia !== "Ocasional" && frecuencia !== "Mensual") {
        errorDonante("frecuencia", "Selecciona una frecuencia de colaboración."); correcto = false;
    }
    if (!textoDonanteValido(detalle, 15, 300)) {
        errorDonante("detalle", "Describe el aporte previsto en 15 a 300 caracteres; no uses solo espacios."); correcto = false;
    }
    var estado = document.getElementById("estado-donante");
    if (!correcto) { estado.textContent = "Revisa los campos señalados. No se guardaron cambios.";
        mostrarPrimerErrorDonante(); return; }
    var donante = {nombre: nombre, tipo: tipo, correo: correo, celular: celular, sector: sector, interes: interes, frecuencia: frecuencia, detalle: detalle, contacto: contacto};
    var mensaje;
    if (posicionDonante === -1) {
        donantes.push(donante); mensaje = "Donante registrado correctamente.";
    } else {
        donantes[posicionDonante] = donante; mensaje = "Datos del donante actualizados.";
    }
    limpiarDonante();
    mostrarDonantes();
    estado.textContent = mensaje;
}
function limpiarDonante() {
    var campos = ["nombre", "tipo", "correo", "celular", "sector", "interes", "detalle"];
    for (var i = 0; i < campos.length; i++) { document.getElementById(campos[i] + "-donante").value = ""; }
    var radios = document.getElementsByName("frecuencia");
    for (var j = 0; j < radios.length; j++) { radios[j].checked = false; }
    document.getElementById("contacto-donante").checked = false;
    posicionDonante = -1;
    limpiarErroresDonante();
    document.getElementById("titulo-donante").textContent = "Registrar donante";
    document.getElementById("guardar-donante").textContent = "Registrar donante";
    document.getElementById("cancelar-donante").style.display = "none";
    document.getElementById("estado-donante").textContent = "";
}
function agregarDatoDonante(contenedor, etiqueta, contenido, clase, rotulo) {
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
function mostrarDonantes() {
    var lista = document.getElementById("lista-donantes");
    lista.innerHTML = "";
    document.getElementById("total-donantes").textContent = donantes.length + " donantes";
    if (donantes.length === 1) { document.getElementById("total-donantes").textContent = "1 donante"; }
    if (donantes.length === 0) {
        document.getElementById("sin-donantes").style.display = "block";
    } else { document.getElementById("sin-donantes").style.display = "none"; }
    var personas = 0;
    var organizaciones = 0;
    for (var i = 0; i < donantes.length; i++) {
        var donante = donantes[i];
        if (donante.tipo === "Persona") { personas = personas + 1; }
        else { organizaciones = organizaciones + 1; }
        var tarjeta = document.createElement("article");
        tarjeta.setAttribute("class", "registro-campana registro-donante");
        agregarDatoDonante(tarjeta, "p", donante.tipo + " · " + donante.interes, "etiqueta");
        agregarDatoDonante(tarjeta, "h3", donante.nombre, "nombre-donante");
        agregarDatoDonante(tarjeta, "p", donante.detalle, "");
        agregarDatoDonante(tarjeta, "p", donante.correo, "", "Correo: ");
        agregarDatoDonante(tarjeta, "p", donante.celular, "", "Celular: ");
        agregarDatoDonante(tarjeta, "p", donante.sector, "", "Ciudad y sector: ");
        agregarDatoDonante(tarjeta, "p", donante.frecuencia, "", "Frecuencia: ");
        var permiso = "Sin permiso de contacto registrado";
        if (donante.contacto) { permiso = "Permite contacto por su aporte"; }
        agregarDatoDonante(tarjeta, "p", permiso, "permiso-contacto");
        var acciones = document.createElement("div");
        acciones.setAttribute("class", "acciones-registro");
        var editar = document.createElement("button");
        editar.setAttribute("type", "button"); editar.setAttribute("class", "boton boton-secundario");
        editar.setAttribute("onclick", "editarDonante(" + i + ")"); editar.textContent = "Editar";
        var eliminar = document.createElement("button");
        eliminar.setAttribute("type", "button"); eliminar.setAttribute("class", "boton boton-eliminar");
        eliminar.setAttribute("onclick", "eliminarDonante(" + i + ")"); eliminar.textContent = "Eliminar";
        acciones.appendChild(editar); acciones.appendChild(eliminar); tarjeta.appendChild(acciones); lista.appendChild(tarjeta);
    }
    document.getElementById("resumen-donantes").textContent = "Personas: " + personas + ". Organizaciones: " + organizaciones + ".";
    if (donantes.length === 0) { document.getElementById("resumen-donantes").textContent = "Todavía no hay personas u organizaciones registradas."; }
}
function editarDonante(posicion) {
    limpiarDonante();
    var donante = donantes[posicion];
    var campos = ["nombre", "tipo", "correo", "celular", "sector", "interes", "detalle"];
    for (var i = 0; i < campos.length; i++) { document.getElementById(campos[i] + "-donante").value = donante[campos[i]]; }
    var radios = document.getElementsByName("frecuencia");
    for (var j = 0; j < radios.length; j++) { radios[j].checked = radios[j].value === donante.frecuencia; }
    document.getElementById("contacto-donante").checked = donante.contacto;
    posicionDonante = posicion;
    document.getElementById("titulo-donante").textContent = "Editar donante";
    document.getElementById("guardar-donante").textContent = "Guardar cambios";
    document.getElementById("cancelar-donante").style.display = "inline-block";
    document.getElementById("estado-donante").textContent = "Estás editando los datos de " + donante.nombre + ".";
    window.location.href = "#titulo-donante";
}
function eliminarDonante(posicion) {
    if (!confirm("¿Eliminar el registro de " + donantes[posicion].nombre + "?")) { return; }
    var restantes = [];
    for (var i = 0; i < donantes.length; i++) { if (i !== posicion) { restantes.push(donantes[i]); } }
    donantes = restantes;
    if (posicionDonante === posicion) { limpiarDonante(); }
    else if (posicionDonante > posicion) { posicionDonante = posicionDonante - 1; }
    mostrarDonantes();
    document.getElementById("estado-donante").textContent = "Registro del donante eliminado.";
}
function impedirEnvioDonante() { return false; }
document.getElementById("formulario-donante").onsubmit = impedirEnvioDonante;
document.getElementById("guardar-donante").onclick = guardarDonante;
document.getElementById("cancelar-donante").onclick = limpiarDonante;
mostrarDonantes();

function mostrarPrimerErrorDonante() {
    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i++) {
        if (errores[i].textContent !== "") {
            window.location.href = "#campo-" + errores[i].id;
            return;
        }
    }
}
