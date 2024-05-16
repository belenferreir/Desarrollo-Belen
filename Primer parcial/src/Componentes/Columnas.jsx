import React from "react";
import Juegos from "./Juegos";
import MiBoton from "./Boton";
import { Link } from "react-router-dom";

const Columnas = ({ juegoss, onAgregarJuego, onBorrarJuego, onMostrarJuego }) => {
    return (
        <div className="columnas">
            {juegoss.map((juegos) => (
                <div key={juegos.id}>
                    <Juegos juegos={juegos} mostrarTitulo={true} />
                    <div className="link-container">
                        <Link to={`/game/${juegos.id}`} onClick={() => onMostrarJuego(juegos.id)} className="linkk">Detalles</Link>
                        <Link to={`/borrar/${juegos.id}`} onClick={() => onBorrarJuego(juegos.id)} className="linkk">Borrar</Link>
                    </div>
                </div>
            ))}
            <MiBoton onClick={onAgregarJuego} titulo="Agregar juego" />
        </div>
    );
};

export default Columnas;
