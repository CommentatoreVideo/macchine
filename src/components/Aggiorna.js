function Aggiorna(props) {
  let premuto=async function() {
    let [,marca,modello,colore,anno,targa]=props.variabili;
    let righe=document.getElementById("tabella").children[1].children;
    for(let riga of righe) {
      if(riga.children[4].innerText!==targa)
        continue;
      let ris={};
      ris.targa=riga.children[4].innerText;
      if(marca!=="") {
        riga.children[0].innerText=marca;
        ris.marca=marca;
      }else{
        ris.marca=riga.children[0].innerText;
      }
      if(modello!=="") {
        riga.children[1].innerText=modello;
        ris.modello=modello;
      }else{
        ris.modello=riga.children[1].innerText;
      }
      if(colore!=="") {
        riga.children[2].innerText=colore;
        ris.colore=colore;
      }else{
        ris.colore=riga.children[2].innerText;
      }
      if(anno!=="") {
        riga.children[3].innerText=anno;
        ris.anno=anno;
      }else{
        ris.anno=riga.children[3].innerText;
      }
      for(let j=1; j<props.setVari.length; j++)
        props.setVari[j]("");
      const db=props.firebase.firestore();
      await db.collection('macchine').doc(riga.id).set(ris);
      return;
    }
    alert("Macchina non trovata");
  }
  return (
    <button id="btnAggiorna" className="btn btn-primary" onClick={premuto}>Aggiorna</button>
  )
}

export default Aggiorna;