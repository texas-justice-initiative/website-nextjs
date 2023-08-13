import { AriaButtonProps, useButton } from 'react-aria';
import React, { ElementType } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';
import Link from 'next/link';

export type ButtonVariant = 'primary' | 'secondary' | 'text';

export interface ButtonProps extends AriaButtonProps {
  variant?: ButtonVariant;
  isActive?: Boolean;
  className?: string;
  as?: 'link' | 'button';
  url?: string;
}

export function Button(props: ButtonProps) {
  const {
    as = 'button',
    url = '',
    variant = 'primary',
    isActive,
    children,
    className,
    ...rest
  } = props;
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

  if (as === 'link') {
    return (
      <Link href={url} className={classes}>
        <span className={styles.label}>{children}</span>
      </Link>
    );
  }

  return (
    <button className={classes} ref={ref} {...buttonProps}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}

export default Button;
