import { AriaButtonProps, useButton } from 'react-aria';
import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

export type ButtonVariant = 'primary' | 'secondary' | 'text';

export interface ButtonProps extends AriaButtonProps {
  variant?: ButtonVariant;
  isActive?: Boolean;
  className?: string;
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', isActive, children, className, ...rest } = props;
  let ref = React.useRef(null);
  let { buttonProps } = useButton(rest, ref);

  const classes = classNames(
    {
      [styles.button]: true,
      [styles[variant]]: true,
      [styles.active]: isActive,
    },
    className
  );

  return (
    <button className={classes} ref={ref} {...buttonProps}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}

export default Button;
