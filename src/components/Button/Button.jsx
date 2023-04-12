// eslint-disable-next-line import/no-extraneous-dependencies
import { Button as BootstrapButton } from 'solid-bootstrap';
import styles from './Button.module.scss';

export function Button(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <BootstrapButton
      variant={props.variant}
      size={props.size}
      disabled={props.disabled}
      type={props.type}
      onClick={handleClick}
      class={`${styles.button} ${props.class ? props.class : ''}`}
    >{props.text}{props.icon}</BootstrapButton>
  );
}
