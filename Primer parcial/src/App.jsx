import React from 'react';
import './App.css';
import Home from './Paginas/Home';
import Detalles from './Paginas/Detalles';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Detalles />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App
