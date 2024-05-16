import React from "react";
import Tarea from "./Tareas";
import MiBoton from "./Boton";
import { Link } from "react-router-dom";

const Tarjeta = ({ titulo, tareas, onAgregarTarea, onEditarTarea, onMostrarTarea }) => {
    return (
        <div className="tarjeta">
            <h3>{titulo}</h3>
            {tareas.map((tarea) => (
                <div key={tarea.id}>
                    <Tarea tarea={tarea} mostrarTitulo={true} />
                    <div className="link-container">
                        <Link to={`/detalles/${tarea.id}`} onClick={() => onMostrarTarea(tarea.id)} className="linkk">Ver tarea</Link>
                        <Link to={`/editar/${tarea.id}`} onClick={() => onEditarTarea(tarea.id)} className="linkk">Editar tarea</Link>
                    </div>
                </div>
            ))}
            <MiBoton onClick={onAgregarTarea} titulo="+ Añadir una tarea" />
        </div>
    );
};

export default Tarjeta;
