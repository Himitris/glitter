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
    ? "flex flex-col py-5 gap-5"
    : "hidden md:flex space-x-8";

  const itemClassName = (isActive: boolean) => `
    relative transition-colors tracking-wider uppercase font-medium text-sm py-3
    ${isActive ? 'text-[#775CFF]' : 'text-[#0B0B0B] hover:text-[#775CFF]'}
    ${isMobile ? 'text-center' : ''}
  `;
  
  // Animation variants optimisées pour le menu mobile
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Réduit de 0.1 à 0.05
        duration: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 }, // Réduit de 20 à 10
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.15, ease: "easeOut" }
    }
  };

  return (
    <motion.nav
      className={baseClassName}
      variants={isMobile ? containerVariants : {}}
      initial={isMobile ? "hidden" : false}
      animate={isMobile ? "show" : false}
    >
      {routes.map((route) => (
        <motion.div
          key={route.path}
          variants={isMobile ? itemVariants : {}}
          className={!isMobile ? "hover:scale-105 transition-transform duration-150" : ""}
        >
          <Link
            to={route.path}
            className={itemClassName(location.pathname === route.path)}
            onClick={onItemClick}
          >
            {route.label}
            {location.pathname === route.path && (
              <span
                className={`absolute ${isMobile ? 'bottom-0 left-1/2 -translate-x-1/2 w-10' : 'bottom-1 left-0 right-0'} h-0.5 rounded-full bg-gradient-to-r ${colors.gradient.administration}`}
              />
            )}
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default Navigation;