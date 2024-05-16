import React, {useEffect, useState} from "react";
import Tarjeta from "../../Componentes/Tarjetas";
import { getTarea } from "../../ApiTareas";
import MiBoton from "../../Componentes/Boton";
import { useNavigate } from 'react-router-dom';

const Tablero = () => {
    const [tareas, setTareas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTareas();
    }, []);

    const fetchTareas = async () => {
        const data = await getTarea();
        console.log("Tareas obtenidas:", data);
        setTareas(data);
    };

    const agregarTarea = () => {
        navigate("/detalles")
    }

    const editarTarea = (id) => {
        navigate(`/editar/${id}`);
    }

    const mostrarTarea = (id) => {
        navigate(`/detalles/${id}`);
    }

    const agregarTarjeta = () => {

    }

    return (
    <div className="tablero">
        <div className="tarjetas">
            <Tarjeta
                titulo="Lista de tareas"
                tareas={tareas.filter(tarea => tarea.status === "To Do")}
                onAgregarTarea={agregarTarea}
                onEditarTarea={editarTarea}
                onMostrarTarea={mostrarTarea}
            />
            <Tarjeta
                titulo="En progreso"
                tareas={tareas.filter(tarea => tarea.status === "In Progress")}
                onAgregarTarea={agregarTarea}
                onEditarTarea={editarTarea}
                onMostrarTarea={mostrarTarea}
            />
            <Tarjeta
                titulo="Hecho"
                tareas={tareas.filter(tarea => tarea.status === "Done")}
                onAgregarTarea={agregarTarea}
                onEditarTarea={editarTarea}
                onMostrarTarea={mostrarTarea}
            />
        </div>
        <MiBoton onClick={agregarTarjeta} titulo="Añadir otra lista"/>
    </div>
  );
}

export default Tablero

  {/*{tarjetas.map(tarjeta => (
                <Tarjeta
                    key={tarjeta.ci}
                    titulo={tarjeta.titulo}
                    tareas={tarjeta.tareas}
                    onAgregarTarea={agregarTarea}
                    onEditarTarea={editarTarea}
                    onMostrarTarea={mostrarTarea}
                />
            ))}*/}    