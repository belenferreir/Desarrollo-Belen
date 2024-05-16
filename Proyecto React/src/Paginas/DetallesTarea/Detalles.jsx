import React, { useState, useEffect } from "react";
import { getTarea, updateTarea } from "../../ApiTareas";
import MiBoton from "../../Componentes/Boton";
import Tarea from "../../Componentes/Tareas";
import { useParams, useNavigate } from "react-router-dom";

const Detalles = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [tarea, setTarea] = useState(null);
    const [editando, setEditando] = useState(false);
  
    useEffect(() => {
        if (id) {
            fetchTarea(id);
        }
    }, [id]);

    useEffect(() => {
        setEditando(location.pathname.includes("/editar"));
    }, [location.pathname]);
  
    const fetchTarea = async (id) => {
        const data = await getTarea();
        const tareaEncontrada = data.find(t => t.id === id);
        setTarea(tareaEncontrada);
    };
  
    const cambiosTarea = async () => {
        await updateTarea(tarea)
        navigate('/detalles/${id}')
    };

    return (
        <div className="detalleTarea">
            {tarea ? (
                <>
                    <h2>Detalles de la Tarea</h2>
                    {editando ? (
                        <form>
                            <div className="inputContainer">
                                <label>
                                    Título:
                                    <input
                                        type="text"
                                        value={tarea.title}
                                        onChange={(e) => setTarea({ ...tarea, title: e.target.value })}
                                    />
                                </label>
                                <label>
                                    Descripción:
                                    <input
                                        type="text"
                                        value={tarea.description}
                                        onChange={(e) => setTarea({ ...tarea, description: e.target.value })}
                                    />
                                </label>
                                <label>
                                    Asignado a:
                                    <input
                                        type="text"
                                        value={tarea.assignedTo}
                                        onChange={(e) => setTarea({ ...tarea, assignedTo: e.target.value })}
                                    />
                                </label>
                                <label>
                                    Fecha de inicio:
                                    <input
                                        type="text"
                                        value={tarea.startDate}
                                        onChange={(e) => setTarea({ ...tarea, startDate: e.target.value })}
                                    />
                                </label>
                                <label>
                                    Fecha de finalización:
                                    <input
                                        type="text"
                                        value={tarea.endDate}
                                        onChange={(e) => setTarea({ ...tarea, endDate: e.target.value })}
                                    />
                                </label>
                                <label>
                                    Estado:
                                    <input
                                        type="text"
                                        value={tarea.status}
                                        onChange={(e) => setTarea({ ...tarea, status: e.target.value })}
                                    />
                                </label>
                                <label>
                                    Prioridad:
                                    <input
                                        type="text"
                                        value={tarea.priority}
                                        onChange={(e) => setTarea({ ...tarea, priority: e.target.value })}
                                    />
                                </label>
                                <label>
                                    Comentarios:
                                    <input
                                        value={tarea.comments}
                                        onChange={(e) => setTarea({ ...tarea, comments: e.target.value })}
                                    />
                                </label>
                            </div>
                            <MiBoton onClick={cambiosTarea} titulo="Guardar" />
                        </form>
                    ) : <Tarea tarea={tarea} mostrarTitulo={false} />}
                </>
            ) : (
                <p>Cargando...</p>
            )}
            <MiBoton onClick={() => navigate("/")} titulo="Cancelar" />
        </div>
    );
};
  
export default Detalles;
