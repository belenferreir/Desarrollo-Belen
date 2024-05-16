import React from "react";

const Juegos = ({juegos, mostrarTitulo}) => {
  return (
    <div className="juegosContainer">
      {mostrarTitulo ? (
        <p>{juegos.title}</p>
      ) : (
        <>
        <div className="detallesJuegosInfo">
          <p>Nombre: {juegos.title}</p>
          <p>Descripción: {juegos.description}</p>
          <p>Cantidad de jugadores: {juegos.players}</p>
          <p>Categoría: {juegos.categories}</p>
        </div>
        </>
      )}
    </div>
  );
};

export default Juegos;