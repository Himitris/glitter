/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Couleurs de la charte graphique Glitter Productions 2025
      colors: {
        glitter: {
          // Couleurs primaires
          "off-white": "#FFFFF6",
          "off-black": "#0B0B0B",
          // Couleurs secondaires
          violet: "#775CFF",
          rose: "#EBABFF",
          orange: "#FF7A42",
          jaune: "#FFFF73",
        },
      },
      fontFamily: {
        sans: ["Neue Montreal", "Inter var", "system-ui", "sans-serif"],
        display: ["Fenul", "Playfair Display", "Georgia", "serif"],
      },
      // Animations optimisées pour performance (GPU-accelerated)
      animation: {
        "fade-in": "fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        gradient: "gradient 8s ease infinite",
        "gradient-slow": "gradient 12s ease infinite",
        "gradient-medium": "gradient 6s ease infinite",
        "gradient-fast": "gradient 3s ease infinite",
        glow: "glow 2s ease-in-out infinite",
        "glow-slow": "glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        blob: "blob 20s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(8px) translateZ(0)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) translateZ(0)",
          },
        },
        gradient: {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        glow: {
          "0%, 100%": {
            "box-shadow": "0 0 20px rgba(119, 92, 255, 0.3)",
          },
          "50%": {
            "box-shadow": "0 0 30px rgba(235, 171, 255, 0.6)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "50%": {
            transform: "translateY(-20px) rotate(5deg)",
          },
        },
        blob: {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(1) rotate(0deg)",
            "border-radius": "40% 60% 70% 30% / 50% 40% 60% 50%",
          },
          "33%": {
            transform: "translate(5%, -5%) scale(1.05) rotate(120deg)",
            "border-radius": "70% 30% 50% 50% / 30% 70% 40% 60%",
          },
          "66%": {
            transform: "translate(-5%, 5%) scale(0.95) rotate(240deg)",
            "border-radius": "30% 70% 70% 30% / 40% 50% 60% 50%",
          },
        },
        shimmer: {
          "0%": {
            "background-position": "-200% 0",
          },
          "100%": {
            "background-position": "200% 0",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
      },
      // Bordures arrondies organiques
      borderRadius: {
        blob: "40% 60% 70% 30% / 50% 40% 60% 50%",
        "blob-2": "60% 40% 30% 70% / 60% 30% 70% 40%",
        "blob-3": "30% 70% 70% 30% / 40% 50% 60% 50%",
      },
      // Ombres personnalisées
      boxShadow: {
        "glow-violet":
          "0 0 20px rgba(119, 92, 255, 0.4), 0 0 40px rgba(119, 92, 255, 0.2)",
        "glow-rose":
          "0 0 20px rgba(235, 171, 255, 0.4), 0 0 40px rgba(235, 171, 255, 0.2)",
        "glow-orange":
          "0 0 20px rgba(255, 122, 66, 0.4), 0 0 40px rgba(255, 122, 66, 0.2)",
        "glow-jaune":
          "0 0 20px rgba(255, 255, 115, 0.4), 0 0 40px rgba(255, 255, 115, 0.2)",
      },
    },
  },
  plugins: [],
};
