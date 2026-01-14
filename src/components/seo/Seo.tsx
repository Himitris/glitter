// src/components/seo/Seo.tsx
import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  locale?: string;
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  image = "/images/Logo/Logo-noir/Logo-noir.svg", // Image par défaut
  type = "website",
  keywords = [],
  locale = "fr_FR",
}) => {
  // URL canonique (URL complète de la page actuelle)
  const siteUrl = "https://glitterprod.com"; // Remplacez par votre domaine réel
  const url = canonical ? `${siteUrl}${canonical}` : siteUrl;

  // Formatage du titre avec le nom du site
  const fullTitle = `${title} | Glitter Productions`;

  return (
    <Helmet>
      {/* Balises meta standards */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="French" />

      {/* Open Graph - pour Facebook, LinkedIn, etc. */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="Glitter Productions" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
    </Helmet>
  );
};

export default Seo;
