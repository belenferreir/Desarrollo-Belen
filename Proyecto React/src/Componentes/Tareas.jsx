import React from "react";

const Tarea = ({tarea, mostrarTitulo}) => {
  return (
    <div className="tareasContainer">
      {mostrarTitulo ? (
        <p>{tarea.title}</p>
      ) : (
        <>
        <div className="detallesTareaInfo">
          <p>Identificador: {tarea.id}</p>
          <p>Título: {tarea.title}</p>
          <p>Descripción: {tarea.description}</p>
          <p>Asignado a: {tarea.assignedTo}</p>
          <p>Fecha de inicio: {tarea.startDate}</p>
          <p>Fecha de finalización: {tarea.endDate}</p>
          <p>Estado: {tarea.status}</p>
          <p>Prioridad: {tarea.priority}</p>
          <p>Comentarios: {tarea.comments}</p>
        </div>
        
        </>
      )}
    </div>
  );
};

export default Tarea;
