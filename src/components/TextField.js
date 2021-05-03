function TextField(props) {
  
  let cambiato=function(e) {
    props.set(e.target.value);
  }
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <input type="text" value={props.var} className="form-control" id={props.id} onInput={cambiato} placeholder={props.placeholder}/>
    </div>
  )
}

export default TextField;