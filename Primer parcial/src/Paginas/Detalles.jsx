import React, { useState, useEffect } from "react";
import { getJuegos } from "../ApiGame";
import MiBoton from "../Componentes/Boton";
import Juegos from "../Componentes/Juegos";
import { useParams, useNavigate } from "react-router-dom";

const Detalles = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [juegos, setJuegos] = useState(null);

    useEffect(() => {
        if (id) {
            fetchJuego(id);
        }
    }, [id]);

    const fetchJuego = async (id) => {
        const data = await getJuegos();
        const juegoEncontrado = data.find(j => j.id === parseInt(id));
        setJuegos(juegoEncontrado);
    };

    return (
        <div className="detallesJuegos">
            {juegos ? (
                <>
                    <Juegos juegos={juegos} mostrarTitulo={false} />
                </>
            ) : (
                <p>Cargando...</p>
            )}
            <MiBoton onClick={() => navigate("/")} titulo="Atrás" />
        </div>
    );
};

export default Detalles;
