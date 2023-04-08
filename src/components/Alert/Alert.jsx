// eslint-disable-next-line import/no-extraneous-dependencies
import { Alert as BootstrapAlert } from 'solid-bootstrap';

function Alert(props) {
  return (
    <BootstrapAlert
      show={props.show()}
      variant="danger"
      dismissible
      onClose={props.onClose}
    >
      <BootstrapAlert.Heading>{props.title}</BootstrapAlert.Heading>
      <p>{props.text}</p>
    </BootstrapAlert>
  );
}

export { Alert };
