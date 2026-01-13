import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { routes } from '../../utils/navigation';

interface NavigationProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isMobile = false, onItemClick }) => {
  const location = useLocation();

  const baseClassName = isMobile
    ? "flex flex-col items-center py-5 gap-5"
    : "hidden md:flex space-x-8";

  const itemClassName = (isActive: boolean) => `
    relative inline-flex flex-col items-center transition-colors tracking-wider uppercase font-medium text-sm py-2 pb-1
    ${isActive ? 'text-[#775CFF]' : 'text-[#0B0B0B] hover:text-[#775CFF]'}
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
            <span>{route.label}</span>
            {location.pathname === route.path && isMobile && (
              <span
                className="mt-0.5 h-0.5 w-full rounded-full bg-gradient-to-r from-[#775CFF] via-[#EBABFF] to-[#FF7A42]"
              />
            )}
            {location.pathname === route.path && !isMobile && (
              <span
                className="absolute bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-[#775CFF] via-[#EBABFF] to-[#FF7A42]"
              />
            )}
          </Link>
        </motion.div>
      ))}
    </motion.nav>
  );
};

export default Navigation;