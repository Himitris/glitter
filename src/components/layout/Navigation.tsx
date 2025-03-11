import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { routes } from '../../utils/navigation';
import { colors } from '../../utils/theme';

interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isMobile = false, onItemClick }) => {
  const location = useLocation();
  
  const baseClassName = isMobile
    ? "flex flex-col space-y-6 p-6 pt-10"
    : "hidden md:flex space-x-8";
    
  const itemClassName = (isActive: boolean) => `
    relative text-white transition-colors tracking-wider uppercase text-sm font-medium
    ${isActive ? 'text-[#FF4D8F]' : 'hover:text-[#FF4D8F]'}
  `;
  
  // Animation variants pour les items du menu mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className={baseClassName}
      variants={isMobile ? containerVariants : {}}
      initial={isMobile ? "hidden" : false}
      animate={isMobile ? "show" : false}
    >
      {routes.map((route, index) => (
        <motion.div
          key={route.path}
          variants={isMobile ? itemVariants : {}} 
          whileHover={!isMobile ? { scale: 1.05 } : {}}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to={route.path}
            className={itemClassName(location.pathname === route.path)}
            onClick={onItemClick}
          >
            {route.label}
            {location.pathname === route.path && (
              <motion.span 
                className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r ${colors.gradient.secondary}`}
                layoutId="activeIndicator"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default Navigation;