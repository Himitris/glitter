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

  // On utilise le logo blanc sur fond sombre, le logo noir sur fond clair
  const logoSrc =
    colorScheme === "dark"
      ? "/images/Logo/Logo-blanc/Logo-blanc.svg"
      : "/images/Logo/Logo-noir/Logo-noir.svg";

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
