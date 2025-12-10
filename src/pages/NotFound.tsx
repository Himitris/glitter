import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { ColorfulBackground, HighlightBadge } from "../components/ui";

const NotFound = () => {
  return (
    <ColorfulBackground
      variant="full-spectrum"
      intensity="strong"
      className="min-h-screen flex items-center justify-center pt-20"
    >
      <div className="text-center px-4 max-w-xl">
        {/* 404 Number */}
        <div className="text-[120px] md:text-[180px] font-bold text-[#0B0B0B] leading-none mb-4 font-display">
          404
        </div>

        {/* Message */}
        <h1 className="text-2xl md:text-4xl font-bold text-[#0B0B0B] mb-4">
          Page introuvable
        </h1>

        <p className="text-[#0B0B0B]/70 mb-8 text-lg">
          Oups ! Cette page semble avoir disparu dans les{" "}
          <HighlightBadge color="yellow" rotation={-1} className="text-base">
            PAILLETTES
          </HighlightBadge>
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-[#0B0B0B] text-white px-6 py-3 rounded-full hover:bg-[#0B0B0B]/80 hover:scale-105 active:scale-95 transition-all duration-200 font-semibold"
          >
            <Home size={18} />
            Retour à l'accueil
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0B0B0B] px-6 py-3 rounded-full border-2 border-[#0B0B0B] hover:bg-[#EBABFF] hover:scale-105 active:scale-95 transition-all duration-200 font-semibold"
          >
            <ArrowLeft size={18} />
            Page précédente
          </button>
        </div>
      </div>
    </ColorfulBackground>
  );
};

export default NotFound;
