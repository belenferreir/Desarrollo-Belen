import classes from "./Boton.module.css"
import React from "react";

export const Boton = ({label, onClick}) => {
    return (
    <button className={classes[label.toLowerCase()]} onClick={onClick}> {label} </button>
);
}

