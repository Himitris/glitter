// src/components/ui/LogoSVG.tsx - Remplacer tout le contenu par ce code
import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  colorScheme?: "dark" | "light";
  size?: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  colorScheme = "light",
  size = "medium",
}) => {
  // Définition des tailles en fonction de l'écran
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "h-10 w-auto";
      case "large":
        return "h-20 w-auto";
      case "medium":
      default:
        return "h-16 w-auto";
    }
  };

  // On utilise l'image logo-noir-png.png par défaut
  // Si colorScheme est 'dark', on pourrait utiliser une version blanche du logo
  const logoSrc =
    colorScheme === "dark"
      ? "/images/logos/logo-noir-complete-png.png"
      : "/images/logos/logo-noir-complete-png.png";

  return (
    <Link to="/" className={`block ${className}`}>
      <img
        src={logoSrc}
        alt="Glitter Productions"
        className={`${getSizeStyles()} max-w-[180px] sm:max-w-[200px] md:max-w-none`}
      />
    </Link>
  );
};

// Nous gardons le nom LogoSVG pour éviter de casser les références existantes
export default Logo;
