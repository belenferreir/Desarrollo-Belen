import React from "react";

const MiBoton = ({onClick, titulo}) => {
    return (
        <button onClick={onClick}>
            {titulo}
        </button>
    )
}

export default MiBoton