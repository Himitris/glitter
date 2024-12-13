import React from 'react';
import { Link } from 'react-router-dom';
import { buttonVariants } from '../../utils/theme';

interface ButtonProps {
  children: React.ReactNode;
  variant?: keyof typeof buttonVariants;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  external = false
}) => {
  const baseClassName = `${buttonVariants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClassName}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={baseClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClassName}>
      {children}
    </button>
  );
};

export default Button;