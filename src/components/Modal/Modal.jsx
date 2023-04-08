// eslint-disable-next-line import/no-extraneous-dependencies
import { Modal as BootstrapModal } from 'solid-bootstrap';
import { Button } from '../Button/Button.jsx';

function Modal(props) {
  return (
    <BootstrapModal
      show={props.show()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <BootstrapModal.Body>
        <h4>{props.title}</h4>
        <p>
          {props.text}
        </p>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button onClick={props.handleCancel} text={props.cancelText} />
        <Button onClick={props.handleConfirm} text={props.confirmText} />
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}

export { Modal };
