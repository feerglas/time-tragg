export function Button(props) {
  return (
    <button disabled={props.disabled} type={props.type}>{props.text}</button>
  );
}
