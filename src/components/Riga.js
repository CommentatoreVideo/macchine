function Riga(props) {
  let celle=[]
  if(props.children)
    celle=props.children.map((v,i)=>(<td key={i}>{v}</td>));
  let premuto=async function(e) {
    let conferma=window.confirm("Sei sicuro?");
    let id=e.target.parentNode.parentNode.id;
    if(!conferma)
      return;
    e.target.parentNode.parentNode.remove()
    const db=await props.firebase.firestore();
    await db.collection('macchine').doc(id+"").delete()
  }
  return (
    <tr id={props.id}>
      {celle}
      <td><button className="btn btn-danger" onClick={premuto}>Elimina</button></td>
    </tr>
  )
}

export default Riga;