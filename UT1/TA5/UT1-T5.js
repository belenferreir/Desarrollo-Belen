<<<<<<< HEAD
let columnaSeleccionada = "";

//Crea las tarjetas donde van las tareas
document.getElementById("botonAgregar").addEventListener("click", function() {
  let titulo = prompt("Introduzca el título de la lista...");
  
  if (titulo !== null) {
      let nuevaTarjeta = document.createElement("div");
      nuevaTarjeta.classList.add("tarjeta");

      nuevaTarjeta.id = titulo;
    
      let tituloTarjeta = document.createElement("h3");
      tituloTarjeta.textContent = titulo;
    
      let boton1 = document.createElement("button");
      boton1.textContent = "+ Añadir una tarjeta";
      boton1.addEventListener("click", function(event){
        limpiarCampos();
        modal.style.display = "block";
        columnaSeleccionada = event.target.parentElement.id;
      });
    
      let boton2 = document.createElement("button");
      boton2.textContent = "...";
    
      let boton3 = document.createElement("button");
      boton3.textContent = "[]";

      boton1.style.marginRight = "5px"; 
      boton2.style.marginRight = "5px";
      boton3.style.marginRight = "5px";
    
      nuevaTarjeta.appendChild(tituloTarjeta);
      nuevaTarjeta.appendChild(boton1);
      nuevaTarjeta.appendChild(boton2);
      nuevaTarjeta.appendChild(boton3);
    
      let tarjetasContainer = document.querySelector(".tarjetas");
      let botonAgregar = document.getElementById("botonAgregar");
    
      tarjetasContainer.insertBefore(nuevaTarjeta, botonAgregar);
  }
});

//Cada vez que se va a agregar una tarea el input aparece en blanco
function limpiarCampos() {
  document.getElementById("titulo").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("asignado").value = "";
  document.getElementById("inicio").value = "";
  document.getElementById("fin").value = "";
  document.getElementById("prioridad").value = "";
  document.getElementById("comentarios").value = "";
}

//Modal para agregar una tarea
var modal = document.getElementById("ventanaModal");
var botonAgregar = document.querySelectorAll(".agregarNuevaTarea");
var span = document.getElementsByClassName("cerrar")[0];

botonAgregar.forEach(function(boton){
  boton.addEventListener("click", function(event){
    columnaSeleccionada = event.target.parentElement.id;
    console.log(columnaSeleccionada)
    modal.style.display = "block";
  });
});

span.addEventListener("click", function(){
  limpiarCampos();
  modal.style.display = "none";
});

window.addEventListener("click", function(event){
  if (event.target == modal && event.target !== document.getElementById("ventanaModal")){
    limpiarCampos();
    modal.style.display = "none"
  }
});

//Crea las tareas
async function crearTarjeta(){
  let titulo = document.getElementById("titulo").value;
  let descripcion = document.getElementById("descripcion").value;
  let asignado = document.getElementById("asignado").value;
  let inicio = document.getElementById("inicio").value;
  let fin = document.getElementById("fin").value;
  let prioridad = document.getElementById("prioridad").value;
  let comentarios = document.getElementById("comentarios").value;
  let estado = columnaSeleccionada;
  
  let nuevaTarjeta = {
    title: titulo,
    description: descripcion,
    assignedTo: asignado, 
    startDate: inicio, 
    endDate: fin,
    status: estado,
    priority: prioridad,
    comments: [comentarios]
  }

  await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    body: JSON.stringify(nuevaTarjeta),
    headers: {
      "Content-Type": "application/json",
    },
  })
  await node();
  
  await nuevaTareaTarjeta(estado, titulo);

  modal.style.display = "none";
}

async function node() {
  const response = await fetch("http://localhost:3000/api/tasks");
  const respuestaJS = await response.json();
  console.log(respuestaJS);
  respuestaJS.map(e => {
    nuevaTareaTarjeta(e.status ,e.title);
  })
}

async function obtenerTareaPorTitulo(titulo) {
  const response = await fetch("http://localhost:3000/api/tasks");
  const tareas = await response.json();
  console.log(tareas);
  const tareaEncontrada = tareas.find(tarea => tarea.title === titulo);
  return tareaEncontrada || null;
}

async function nuevaTareaTarjeta(status, title) {
  if (title !== null) {
    let tarjeta = document.getElementById(status);
    if (tarjeta !== null) {
      let tareaExistente = tarjeta.querySelector(`.nuevaTarea[data-titulo="${title}"]`);
      if (tareaExistente) {
        console.log("La tarea se actualizó.");
      } else {
        let botonTarea = document.createElement("button");
        botonTarea.textContent = title;
        botonTarea.classList.add("nuevaTarea");
        botonTarea.dataset.titulo = title;
        tarjeta.appendChild(botonTarea);
        botonTarea.addEventListener("click", mostrarDetallesTarea);
        crearBotonEditar(tarjeta, title);
        console.log("Nueva tarea agregada a la tarjeta.");
      }
    } else {
      console.error("La tarjeta con el ID especificado no fue encontrada.");
    }
  }
}

node();

//Modal para ver el contenido de la tarea
var modalDetalleTarea = document.getElementById("modalDetalleTarea");
var spanDetalleTarea = document.getElementsByClassName("cerrarTarea")[0];

spanDetalleTarea.addEventListener("click", function() {
  modalDetalleTarea.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target == modalDetalleTarea) {
    modalDetalleTarea.style.display = "none";
  }
});

//Muestra el contenido de la tarea
async function mostrarDetallesTarea(event) {
  const botonTarea = event.target;
  const tituloTarea = botonTarea.dataset.titulo;
  const tarea = await obtenerTareaPorTitulo(tituloTarea);

  if (tarea) {
    document.getElementById("detalleTitulo").textContent = "Título: " + tarea.title;
    document.getElementById("detalleDescripcion").textContent = "Descripción: " + tarea.description;
    document.getElementById("detalleAsignado").textContent = "Asignado a: " + tarea.assignedTo;
    document.getElementById("detalleInicio").textContent = "Fecha de inicio: " + tarea.startDate;
    document.getElementById("detalleFin").textContent = "Termina en: " + tarea.endDate;
    document.getElementById("detallePrioridad").textContent = "Prioridad: " + tarea.priority;
    document.getElementById("detalleComentarios").textContent = "Comentarios: " + tarea.comments;

    modalDetalleTarea.style.display = "block";
  } else {
    console.log("No se encontró la tarea");
  }
}

async function obtenerTareaPorId(idTarea) {
  const response = await fetch("http://localhost:3000/api/tasks");
  const tareas = await response.json();
  console.log(tareas);
  const tareaEncontrada = tareas.find(tarea => tarea.id === idTarea);
  return tareaEncontrada || null;
}

//Crea el botón para editar al lado de cada tarea
async function crearBotonEditar(tarjeta, tituloTarea) {
  let botonEditar = document.createElement("button");
  botonEditar.textContent = "Editar";
  botonEditar.classList.add("editarTarea");
  botonEditar.dataset.taskTitle = tituloTarea;

  botonEditar.addEventListener("click", function() {
    abrirModalEdicion(tituloTarea);
  });

  tarjeta.appendChild(botonEditar);
}

async function abrirModalEdicion(tituloTarea) {
  const tarea = await obtenerTareaPorTitulo(tituloTarea);

  if (tarea) {
    document.getElementById("tituloEdicion").value = tarea.title;
    document.getElementById("descripcionEdicion").value = tarea.description;
    document.getElementById("asignadoEdicion").value = tarea.assignedTo;
    document.getElementById("inicioEdicion").value = tarea.startDate;
    document.getElementById("finEdicion").value = tarea.endDate;
    document.getElementById("prioridadEdicion").value = tarea.priority;
    document.getElementById("comentariosEdicion").value = tarea.comments;

    const botonGuardar = document.querySelector("#modalEditarTarea button");
    botonGuardar.dataset.taskId = tarea.id; 

    modalEditar.style.display = "block";
  } else {
    console.error("No se encontró la tarea con el título especificado.");
  }
}

//Modal para editar las tareas 
var modalEditar = document.getElementById("modalEditarTarea");
var spanEditar = document.getElementsByClassName("cerrarEdicion")[0];

spanEditar.addEventListener("click", function(){
  limpiarCamposEdicion();
  modalEditar.style.display = "none";
});

window.addEventListener("click", function(event){
  if (event.target == modal && event.target !== document.getElementById("modalEditarTarea")){
    limpiarCamposEdicion();
    modal.style.display = "none";
  }
});

function limpiarCamposEdicion() {
  document.getElementById("tituloEdicion").value = "";
  document.getElementById("descripcionEdicion").value = "";
  document.getElementById("asignadoEdicion").value = "";
  document.getElementById("inicioEdicion").value = "";
  document.getElementById("finEdicion").value = "";
  document.getElementById("prioridadEdicion").value = "";
  document.getElementById("comentariosEdicion").value = "";
}

// Función para guardar los cambios en la tarea editada
async function guardarCambiosTarea(boton) {
  const idTarea = boton.dataset.taskId;
  const tareaActual = await obtenerTareaPorId(idTarea);
  
  if (!tareaActual) {
    console.log(idTarea)
    console.error("No se encontró la tarea con el ID especificado.");
    return;
  }

  let tituloNuevo = document.getElementById("tituloEdicion").value;
  let descripcionNueva = document.getElementById("descripcionEdicion").value;
  let asignadoNuevo = document.getElementById("asignadoEdicion").value;
  let inicioNuevo = document.getElementById("inicioEdicion").value;
  let finNuevo = document.getElementById("finEdicion").value;
  let prioridadNueva = document.getElementById("prioridadEdicion").value;
  let comentariosNuevos = document.getElementById("comentariosEdicion").value;
  let estadoNuevo = columnaSeleccionada;

  const actualizarTarea = {
    title: tituloNuevo !== '' ? tituloNuevo : tareaActual.title,
    description: descripcionNueva !== '' ? descripcionNueva : tareaActual.description,
    assignedTo: asignadoNuevo !== '' ? asignadoNuevo : tareaActual.assignedTo,
    startDate: inicioNuevo !== '' ? inicioNuevo : tareaActual.startDate,
    endDate: finNuevo !== '' ? finNuevo : tareaActual.endDate,
    status: estadoNuevo !== '' ? estadoNuevo : tareaActual.status,
    priority: prioridadNueva !== '' ? prioridadNueva : tareaActual.priority,
    comments: comentariosNuevos !== '' ? [comentariosNuevos] : tareaActual.comments
  };

  await fetch(`http://localhost:3000/api/tasks/${idTarea}`, {
    method: "PUT",
    body: JSON.stringify(actualizarTarea),
    headers: {
      "Content-Type": "application/json",
    },
  });
  await node();

  modalEditar.style.display = "none";
}
=======
let columnaSeleccionada = "";

//Crea las tarjetas donde van las tareas
document.getElementById("botonAgregar").addEventListener("click", function() {
  let titulo = prompt("Introduzca el título de la lista...");
  
  if (titulo !== null) {
      let nuevaTarjeta = document.createElement("div");
      nuevaTarjeta.classList.add("tarjeta");

      nuevaTarjeta.id = titulo;
    
      let tituloTarjeta = document.createElement("h3");
      tituloTarjeta.textContent = titulo;
    
      let boton1 = document.createElement("button");
      boton1.textContent = "+ Añadir una tarjeta";
      boton1.addEventListener("click", function(event){
        limpiarCampos();
        modal.style.display = "block";
        columnaSeleccionada = event.target.parentElement.id;
      });
    
      let boton2 = document.createElement("button");
      boton2.textContent = "...";
    
      let boton3 = document.createElement("button");
      boton3.textContent = "[]";

      boton1.style.marginRight = "5px"; 
      boton2.style.marginRight = "5px";
      boton3.style.marginRight = "5px";
    
      nuevaTarjeta.appendChild(tituloTarjeta);
      nuevaTarjeta.appendChild(boton1);
      nuevaTarjeta.appendChild(boton2);
      nuevaTarjeta.appendChild(boton3);
    
      let tarjetasContainer = document.querySelector(".tarjetas");
      let botonAgregar = document.getElementById("botonAgregar");
    
      tarjetasContainer.insertBefore(nuevaTarjeta, botonAgregar);
  }
});

//Cada vez que se va a agregar una tarea el input aparece en blanco
function limpiarCampos() {
  document.getElementById("titulo").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("asignado").value = "";
  document.getElementById("inicio").value = "";
  document.getElementById("fin").value = "";
  document.getElementById("prioridad").value = "";
  document.getElementById("comentarios").value = "";
}

//Modal para agregar una tarea
var modal = document.getElementById("ventanaModal");
var botonAgregar = document.querySelectorAll(".agregarNuevaTarea");
var span = document.getElementsByClassName("cerrar")[0];

botonAgregar.forEach(function(boton){
  boton.addEventListener("click", function(event){
    columnaSeleccionada = event.target.parentElement.id;
    console.log(columnaSeleccionada)
    modal.style.display = "block";
  });
});

span.addEventListener("click", function(){
  limpiarCampos();
  modal.style.display = "none";
});

window.addEventListener("click", function(event){
  if (event.target == modal && event.target !== document.getElementById("ventanaModal")){
    limpiarCampos();
    modal.style.display = "none"
  }
});

//Crea las tareas
async function crearTarjeta(){
  let titulo = document.getElementById("titulo").value;
  let descripcion = document.getElementById("descripcion").value;
  let asignado = document.getElementById("asignado").value;
  let inicio = document.getElementById("inicio").value;
  let fin = document.getElementById("fin").value;
  let prioridad = document.getElementById("prioridad").value;
  let comentarios = document.getElementById("comentarios").value;
  let estado = columnaSeleccionada;
  
  let nuevaTarjeta = {
    title: titulo,
    description: descripcion,
    assignedTo: asignado, 
    startDate: inicio, 
    endDate: fin,
    status: estado,
    priority: prioridad,
    comments: [comentarios]
  }

  await fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    body: JSON.stringify(nuevaTarjeta),
    headers: {
      "Content-Type": "application/json",
    },
  })
  await node();
  
  await nuevaTareaTarjeta(estado, titulo);

  modal.style.display = "none";
}

async function node() {
  const response = await fetch("http://localhost:3000/api/tasks");
  const respuestaJS = await response.json();
  console.log(respuestaJS);
  respuestaJS.map(e => {
    nuevaTareaTarjeta(e.status ,e.title);
  })
}

async function obtenerTareaPorTitulo(titulo) {
  const response = await fetch("http://localhost:3000/api/tasks");
  const tareas = await response.json();
  console.log(tareas);
  const tareaEncontrada = tareas.find(tarea => tarea.title === titulo);
  return tareaEncontrada || null;
}

async function nuevaTareaTarjeta(status, title) {
  if (title !== null) {
    let tarjeta = document.getElementById(status);
    if (tarjeta !== null) {
      let tareaExistente = tarjeta.querySelector(`.nuevaTarea[data-titulo="${title}"]`);
      if (tareaExistente) {
        console.log("La tarea se actualizó.");
      } else {
        let botonTarea = document.createElement("button");
        botonTarea.textContent = title;
        botonTarea.classList.add("nuevaTarea");
        botonTarea.dataset.titulo = title;
        tarjeta.appendChild(botonTarea);
        botonTarea.addEventListener("click", mostrarDetallesTarea);
        crearBotonEditar(tarjeta, title);
        console.log("Nueva tarea agregada a la tarjeta.");
      }
    } else {
      console.error("La tarjeta con el ID especificado no fue encontrada.");
    }
  }
}

node();

//Modal para ver el contenido de la tarea
var modalDetalleTarea = document.getElementById("modalDetalleTarea");
var spanDetalleTarea = document.getElementsByClassName("cerrarTarea")[0];

spanDetalleTarea.addEventListener("click", function() {
  modalDetalleTarea.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target == modalDetalleTarea) {
    modalDetalleTarea.style.display = "none";
  }
});

//Muestra el contenido de la tarea
async function mostrarDetallesTarea(event) {
  const botonTarea = event.target;
  const tituloTarea = botonTarea.dataset.titulo;
  const tarea = await obtenerTareaPorTitulo(tituloTarea);

  if (tarea) {
    document.getElementById("detalleTitulo").textContent = "Título: " + tarea.title;
    document.getElementById("detalleDescripcion").textContent = "Descripción: " + tarea.description;
    document.getElementById("detalleAsignado").textContent = "Asignado a: " + tarea.assignedTo;
    document.getElementById("detalleInicio").textContent = "Fecha de inicio: " + tarea.startDate;
    document.getElementById("detalleFin").textContent = "Termina en: " + tarea.endDate;
    document.getElementById("detallePrioridad").textContent = "Prioridad: " + tarea.priority;
    document.getElementById("detalleComentarios").textContent = "Comentarios: " + tarea.comments;

    modalDetalleTarea.style.display = "block";
  } else {
    console.log("No se encontró la tarea");
  }
}

async function obtenerTareaPorId(idTarea) {
  const response = await fetch("http://localhost:3000/api/tasks");
  const tareas = await response.json();
  console.log(tareas);
  const tareaEncontrada = tareas.find(tarea => tarea.id === idTarea);
  return tareaEncontrada || null;
}

//Crea el botón para editar al lado de cada tarea
async function crearBotonEditar(tarjeta, tituloTarea) {
  let botonEditar = document.createElement("button");
  botonEditar.textContent = "Editar";
  botonEditar.classList.add("editarTarea");
  botonEditar.dataset.taskTitle = tituloTarea;

  botonEditar.addEventListener("click", function() {
    abrirModalEdicion(tituloTarea);
  });

  tarjeta.appendChild(botonEditar);
}

async function abrirModalEdicion(tituloTarea) {
  const tarea = await obtenerTareaPorTitulo(tituloTarea);

  if (tarea) {
    document.getElementById("tituloEdicion").value = tarea.title;
    document.getElementById("descripcionEdicion").value = tarea.description;
    document.getElementById("asignadoEdicion").value = tarea.assignedTo;
    document.getElementById("inicioEdicion").value = tarea.startDate;
    document.getElementById("finEdicion").value = tarea.endDate;
    document.getElementById("prioridadEdicion").value = tarea.priority;
    document.getElementById("comentariosEdicion").value = tarea.comments;

    const botonGuardar = document.querySelector("#modalEditarTarea button");
    botonGuardar.dataset.taskId = tarea.id; 

    modalEditar.style.display = "block";
  } else {
    console.error("No se encontró la tarea con el título especificado.");
  }
}

//Modal para editar las tareas 
var modalEditar = document.getElementById("modalEditarTarea");
var spanEditar = document.getElementsByClassName("cerrarEdicion")[0];

spanEditar.addEventListener("click", function(){
  limpiarCamposEdicion();
  modalEditar.style.display = "none";
});

window.addEventListener("click", function(event){
  if (event.target == modal && event.target !== document.getElementById("modalEditarTarea")){
    limpiarCamposEdicion();
    modal.style.display = "none";
  }
});

function limpiarCamposEdicion() {
  document.getElementById("tituloEdicion").value = "";
  document.getElementById("descripcionEdicion").value = "";
  document.getElementById("asignadoEdicion").value = "";
  document.getElementById("inicioEdicion").value = "";
  document.getElementById("finEdicion").value = "";
  document.getElementById("prioridadEdicion").value = "";
  document.getElementById("comentariosEdicion").value = "";
}

// Función para guardar los cambios en la tarea editada
async function guardarCambiosTarea(boton) {
  const idTarea = boton.dataset.taskId;
  const tareaActual = await obtenerTareaPorId(idTarea);
  
  if (!tareaActual) {
    console.log(idTarea)
    console.error("No se encontró la tarea con el ID especificado.");
    return;
  }

  let tituloNuevo = document.getElementById("tituloEdicion").value;
  let descripcionNueva = document.getElementById("descripcionEdicion").value;
  let asignadoNuevo = document.getElementById("asignadoEdicion").value;
  let inicioNuevo = document.getElementById("inicioEdicion").value;
  let finNuevo = document.getElementById("finEdicion").value;
  let prioridadNueva = document.getElementById("prioridadEdicion").value;
  let comentariosNuevos = document.getElementById("comentariosEdicion").value;
  let estadoNuevo = columnaSeleccionada;

  const actualizarTarea = {
    title: tituloNuevo !== '' ? tituloNuevo : tareaActual.title,
    description: descripcionNueva !== '' ? descripcionNueva : tareaActual.description,
    assignedTo: asignadoNuevo !== '' ? asignadoNuevo : tareaActual.assignedTo,
    startDate: inicioNuevo !== '' ? inicioNuevo : tareaActual.startDate,
    endDate: finNuevo !== '' ? finNuevo : tareaActual.endDate,
    status: estadoNuevo !== '' ? estadoNuevo : tareaActual.status,
    priority: prioridadNueva !== '' ? prioridadNueva : tareaActual.priority,
    comments: comentariosNuevos !== '' ? [comentariosNuevos] : tareaActual.comments
  };

  await fetch(`http://localhost:3000/api/tasks/${idTarea}`, {
    method: "PUT",
    body: JSON.stringify(actualizarTarea),
    headers: {
      "Content-Type": "application/json",
    },
  });
  await node();

  modalEditar.style.display = "none";
}
>>>>>>> 2210128a3fb2e292d315e3b342ee73e2fee9359e
