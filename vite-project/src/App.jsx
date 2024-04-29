import React, { useState } from 'react'
import './App.css'
import { Boton } from './Componentes/Boton'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h2>{count}</h2>
      <Boton label="Add" onClick={() => setCount (count + 1)}/> 
      <Boton label="Substract" onClick={() => setCount (count - 1)}/>
      <Boton label="Clear" onClick={() => setCount (0)}/>
    </div>
  )
}
export default App

