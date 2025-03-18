import React from 'react';
import { Link } from 'react-router-dom';

interface LogoSVGProps {
    className?: string;
    colorScheme?: 'dark' | 'light';
    size?: 'small' | 'medium' | 'large';
}

const LogoSVG: React.FC<LogoSVGProps> = ({ 
    className = '', 
    colorScheme = 'light',
    size = 'medium' 
}) => {
    // Définition des couleurs en fonction du thème choisi
    const textColor = colorScheme === 'dark' ? '#FFFFFF' : '#000000';
    
    // Définition des tailles en fonction de l'écran
    const getSizeStyles = () => {
        switch(size) {
            case 'small':
                return 'h-12 w-auto';
            case 'large':
                return 'h-24 w-auto';
            case 'medium':
            default:
                return 'h-20 w-auto';
        }
    };

    return (
        <Link to="/" className={`block ${className}`}>
            <svg
                viewBox="0 0 300 80"
                className={`${getSizeStyles()} max-w-[180px] sm:max-w-[200px] md:max-w-none`}
                aria-label="Glitter Productions"
            >
                {/* Fond transparent */}
                <rect x="0" y="0" width="250" height="80" fill="transparent" />

                {/* "PRODUCTIONS" vertical, aligné à gauche comme dans l'image 2 */}
                <text
                    x="18"
                    y="65"
                    fontSize="6"
                    fontFamily="'Montserrat', sans-serif"
                    fontWeight={500}
                    fill={textColor}
                    transform="rotate(-90, 18, 45)"
                    letterSpacing="2"
                    textAnchor="middle"
                >
                    PRODUCTIONS
                </text>

                {/* "GLITTER" texte principal, avec un espacement plus prononcé entre certaines lettres */}
                <text
                    x="60"
                    y="62"
                    fontSize="74"
                    fontFamily="'Frunchy Sage', serif"
                    fontWeight={500}
                    fill={textColor}
                    letterSpacing="1"
                >
                    G
                </text>

                {/* Étoiles avec le code original complet (4 étoiles) positionnées plus bas et agrandies */}
                <svg x="45" y="57" width="25" height="25" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill={textColor}>
                    <path d="M50 60 L55 90 L80 95 L55 100 L50 130 L45 100 L20 95 L45 90 Z" />
                    <path d="M130 40 L135 70 L160 75 L135 80 L130 110 L125 80 L100 75 L125 70 Z" />
                    <path d="M80 30 L82 40 L90 42 L82 44 L80 54 L78 44 L70 42 L78 40 Z" />
                    <path d="M100 120 L102 130 L110 132 L102 134 L100 144 L98 134 L90 132 L98 130 Z" />
                </svg>
            </svg>
        </Link>
    );
};

export default LogoSVG;