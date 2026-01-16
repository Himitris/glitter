// Composant Link optimisé avec prefetch au hover
import React, { startTransition } from 'react';
import { Link, LinkProps, useNavigate } from 'react-router-dom';
import { usePrefetch } from '../../../hooks/usePrefetch';

interface PrefetchLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const PrefetchLink: React.FC<PrefetchLinkProps> = ({ to, children, className, ...props }) => {
  const { prefetch } = usePrefetch();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    // Précharge la route au hover
    const path = typeof to === 'string' ? to : to.pathname || '/';
    prefetch(path);
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Si c'est un clic standard (pas cmd/ctrl/shift/bouton droit)
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      const path = typeof to === 'string' ? to : to.pathname || '/';

      // Utilise startTransition pour navigation non-bloquante
      startTransition(() => {
        navigate(path);
      });
    }
  };

  return (
    <Link
      to={to}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </Link>
  );
};

export default PrefetchLink;
