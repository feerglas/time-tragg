function Radio(props) {
  return (
    <div>
      <input
        type="radio"
        id={props.id}
        name={props.name}
        value={props.value}
        checked={props.checked}
        onChange={() => props.onChange(props.value)}
      />
      <label for={props.id}>{props.label}</label>
    </div>
  );
}

export { Radio };
