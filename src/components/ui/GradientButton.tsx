import React from 'react';
import { Link } from 'react-router-dom';
import { colors, components } from '../../utils/theme';

interface GradientButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  external?: boolean;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  external = false
}) => {
  const baseClassName = `
    ${components.button.base}
    ${components.button[variant]}
    ${className}
  `;

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