import Riga from "./Riga.js";
function Aggiungi(props) {
  let premuto=async function() {
    let [righe,marca,modello,colore,anno,targa]=props.variabili;
    if(!marca||!modello||!colore||!anno||!targa)
      return alert("Compila tutti i campi");
    let righeT=document.getElementById("tabella").children[1].children;
    for(let riga of righeT)
      if(riga.children[4].innerText===targa)
        return alert("Targa già inserita");
    let informazioni=[marca,modello,colore,anno,targa];
    for(let j=1; j<props.setVari.length; j++)
    props.setVari[j]("");
    // database
    const db = props.firebase.firestore();
    // data
    const res=await db.collection("macchine").add({
      marca,modello,colore,anno,targa
    });
    let riga=<Riga id={res.id} firebase={props.firebase}>{informazioni}</Riga>
    props.setVari[0]([...righe,riga]);
  }
  return(
    <button id="btnAggiungi" className="btn btn-success" onClick={premuto}>Aggiungi</button>
  )
}

export default Aggiungi;