import "./index.css";
import { useEffect, useState } from "react";
import { getCats } from "./Apicat";
import Card from "./Componentes";

export default function App() {
  
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCatsLoad = async () => {
      if (cats.length === 0) {
        const newCats = await getCats();
        setCats(newCats);
      }
    };
    getCatsLoad();
  }, [cats]);

  return (
    <div className="App">
      {cats.map((c) => {
        return (
          <Card>
            <img id="gatitos" src={c.url} />
          </Card>
        );
      })}
       <center><button onClick={() => setCats([])}>Ver otros gatos</button></center>
    </div>
  );
}
