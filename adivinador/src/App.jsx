import React, { useState } from 'react'
import './App.css'
import { Boton } from './Componentes/Boton'

function App() {

  const [count, setCount] = useState(0)
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const Iniciar = () => {
    setMin(1);
    setMax(100);
    setCount(randomNumber(min, max))
  }

  const Menor = () => {
    setMax(count-1);
    setCount(randomNumber(min, count-1))
  }

  const Mayor = () => {
    setMin(count+1);
    setCount(randomNumber(count+1, max))
  }

  const Finalizar = () => {
    setCount("Número encontrado!");
  }
  
  return (
    <div>
      <h2>{count}</h2>
      <Boton label="Comenzar" onClick={Iniciar}/>
      <Boton label="Menor" onClick={Menor}/> 
      <Boton label="Igual" onClick={Finalizar}/>
      <Boton label="Mayor" onClick={Mayor}/>
    </div>
  )
}
export default App

