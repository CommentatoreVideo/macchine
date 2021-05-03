function TextField(props) {
  
  let cambiato=function(e) {
    props.set(e.target.value);
  }
  return (
    <div class="form-group">
      <label for={props.id}>{props.label}</label>
      <input type="text" value={props.var} class="form-control" id={props.id} onInput={cambiato} placeholder={props.placeholder}/>
    </div>
  )
}

export default TextField;