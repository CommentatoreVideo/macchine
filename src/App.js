import TextField from "./components/TextField";
import Aggiungi from "./components/Aggiungi";
import Aggiorna from "./components/Aggiorna";
import {useState, useEffect} from "react";
import Riga from "./components/Riga.js";
import firebase from 'firebase/app';
import "firebase/firestore";
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGER_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
process.env.CI=false;

function App() {
  let [,setMacchine]=useState([]);
  let [loading, setLoading]=useState([]);
  let [righe,setRighe]=useState([]);
  let [marca,setMarca]=useState("");
  let [modello,setModello]=useState("");
  let [colore,setColore]=useState("");
  let [anno,setAnno]=useState("");
  let [targa,setTarga]=useState("");
  useEffect(() => {
    const fetchData = async () => {
      // database
      const db = firebase.firestore();
      // data
      let data = await db.collection("macchine").get();
      // shopping list items: name, count and id
      const macchine = data.docs.map(doc => {
        return {
          marca: doc.data().marca,
          modello: doc.data().modello,
          colore: doc.data().colore,
          anno: doc.data().anno,
          targa: doc.data().targa,
          id: doc.id
        };
      });
      // set states
      setMacchine(macchine);
      setRighe(macchine.map(m=>{
        let {marca,modello,colore,anno,targa, id}=m;
        return (<Riga key={id} id={id} firebase={firebase}>{[marca,modello,colore,anno,targa]}</Riga>)
      }));
      
      setLoading(false);
    }
    // start loading data
    fetchData();
  }, []); // called only once
  if(loading)
  return <p>Loading</p>

  let variabili=[righe,marca,modello,colore,anno,targa];
  let setVari=[setRighe,setMarca,setModello,setColore,setAnno,setTarga];
  return (
    <div className="container">
      <form>
        <TextField var={marca} set={setMarca} id="txtMarca" label="Marca" placeholder="Inserisci la marca dell'auto"></TextField>
        <TextField var={modello} set={setModello} id="txtModello" label="Modello" placeholder="Inserisci il modello dell'auto"></TextField>
        <TextField var={colore} set={setColore} id="txtColore" label="Colore" placeholder="Inserisci il colore dell'auto"></TextField>
        <TextField var={anno} set={setAnno} id="txtAnno" label="Anno" placeholder="Inserisci l'anno dell'auto"></TextField>
        <TextField var={targa} set={setTarga} id="txtTarga" label="Targa" placeholder="Inserisci la targa dell'auto"></TextField>
    </form>
    <Aggiungi variabili={variabili} setVari={setVari} firebase={firebase}></Aggiungi>
    <Aggiorna variabili={variabili} setVari={setVari} firebase={firebase}></Aggiorna>
    
    <table className="table" id="tabella">
      <thead>
        <tr>
          <th>Marca</th>
          <th>Modello</th>
          <th>Colore</th>
          <th>Anno</th>
          <th>Targa</th>
          <th>Elimina</th>
        </tr>
      </thead>
      <tbody>
        {righe}
      </tbody>
    </table>
    </div>
  );
}

export default App;
