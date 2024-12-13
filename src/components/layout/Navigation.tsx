import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../utils/navigation';
import { colors } from '../../utils/theme';

interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isMobile = false, onItemClick }) => {
  const location = useLocation();
  
  const baseClassName = isMobile
    ? "flex flex-col space-y-4 p-4"
    : "hidden md:flex space-x-8";
    
  const itemClassName = (isActive: boolean) => `
    relative text-white transition-colors
    ${isActive ? 'text-pink-400' : 'hover:text-pink-400'}
  `;
  
  const activePillClassName = `
    absolute -bottom-1 left-0 right-0 h-0.5
    bg-gradient-to-r ${colors.gradient.secondary}
  `;

  return (
    <nav className={baseClassName}>
      {routes.map((route) => (
        <Link
          key={route.path}
          to={route.path}
          className={itemClassName(location.pathname === route.path)}
          onClick={onItemClick}
        >
          {route.label}
          {location.pathname === route.path && (
            <span className={activePillClassName} />
          )}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;