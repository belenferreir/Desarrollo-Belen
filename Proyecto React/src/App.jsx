import React from "react";
import "./index.css";
import Tablero from "./Paginas/Tablero/Tablero";
import Detalles from "./Paginas/DetallesTarea/Detalles";
import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tablero />} />
        <Route path="/detalles/:id" element={<Detalles />} />
        <Route path="/editar/:id" element={<Detalles isEditing />} />
      </Routes>
    </BrowserRouter>
  );
}
