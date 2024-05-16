import React, {useEffect, useState} from "react";
import Juegos from "../Componentes/Juegos";
import { getJuegos } from "../ApiGame";
import MiBoton from "../Componentes/Boton"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Home = () => {
    const [juegos, setJuegos] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchJuegos();
    }, []);

    const fetchJuegos = async () => {
        const data = await getJuegos();
        console.log("Juegos obtenidos:", data);
        setJuegos(data);
    };

    const mostrarJuego = (id) => {
        navigate(`/game/${id}`);
    }

    /*const borrarJuego = async () => {
        await updateTarea(juegos)
        navigate('/game/${id}')
    };

    
    const agregarJuego = async () => {
        await updateTarea(juegos)
        navigate('/game/${id}')
    };*/


    return (
        <div className="home">
            <h2>Juegos</h2>
            <div className="juegos-container">
                {juegos.map((juegos) => (
                    <div key={juegos.id}>
                        <Juegos juegos={juegos} mostrarTitulo={true} />
                        <div className="link-container">
                            <Link to={`/game/${juegos.id}`} className="linkk">Detalles</Link>
                            <MiBoton onClick={() => mostrarJuego(juegos.id)} titulo="Borrar" />
                        </div>
                    </div>
                ))}
            </div>
            <MiBoton onClick={() => navigate('/game/new')} titulo="Agregar juego" />
        </div>
    )
}
export default Home