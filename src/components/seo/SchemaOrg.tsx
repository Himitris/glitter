// src/components/seo/SchemaOrg.tsx
import React from "react";
import { Helmet } from "react-helmet-async";

interface SchemaOrgProps {
  type: "Organization" | "LocalBusiness" | "Event";
  url: string;
  name: string;
  description: string;
  logo?: string;
  image?: string;
  // Pour Organisation
  sameAs?: string[];
  // Pour Event
  startDate?: string;
  endDate?: string;
  location?: string;
  // Pour LocalBusiness
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  telephone?: string;
}

const SchemaOrg: React.FC<SchemaOrgProps> = ({
  type,
  url,
  name,
  description,
  logo = "https://glitterprod.com/images/Logo/Logo-noir/Logo-noir.svg",
  image,
  sameAs = [],
  startDate,
  endDate,
  location,
  address,
  geo,
  openingHours,
  telephone,
}) => {
  let schemaData = {};

  switch (type) {
    case "Organization":
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name,
        url,
        logo,
        description,
        sameAs,
      };
      break;
    case "LocalBusiness":
      schemaData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name,
        url,
        logo,
        description,
        image,
        address: address
          ? {
              "@type": "PostalAddress",
              ...address,
            }
          : undefined,
        geo: geo
          ? {
              "@type": "GeoCoordinates",
              latitude: geo.latitude,
              longitude: geo.longitude,
            }
          : undefined,
        openingHoursSpecification: openingHours?.map((hours) => ({
          "@type": "OpeningHoursSpecification",
          hours,
        })),
        telephone,
      };
      break;
    case "Event":
      schemaData = {
        "@context": "https://schema.org",
        "@type": "Event",
        name,
        url,
        description,
        image,
        startDate,
        endDate,
        location: {
          "@type": "Place",
          name: location,
          address: address
            ? {
                "@type": "PostalAddress",
                ...address,
              }
            : undefined,
        },
        organizer: {
          "@type": "Organization",
          name: "Glitter Production",
          url: "https://glitterprod.com",
        },
      };
      break;
    default:
      break;
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
};

export default SchemaOrg;