export function Button(props) {
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      onClick={() => props.onClick()}
    >{props.text}</button>
  );
}
