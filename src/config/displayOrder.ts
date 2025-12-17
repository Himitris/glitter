// Configuration de l'ordre d'affichage des artistes et DJs
// Les noms listés ici apparaîtront en premier, dans l'ordre spécifié
// Les autres artistes/DJs apparaîtront ensuite par ordre alphabétique

export const ARTISTS_DISPLAY_ORDER = [
  "KIMIA",
  "Kimia",
  "KAIROS",
  "Kairos",
  "KAÎROS",
  "Amalia JAULIN",
  "Amalia Jaulin",
  "ALTESS EGO",
  "Altess Ego",
  "FORRÓ DA LUA",
  "Forró Da Lua",
  "Forro Da Lua",
  "Rodolphe MACABÉO",
  "Rodolphe Macabéo",
  "Solène WEINACHTER",
  "Solène Weinachter",
  "DARTA LA",
  "Darta La",
  "Laura O'NEILL",
  "Laura O'neill",
  "Manon GASSENG",
  "Manon Gasseng",
  "MÉLANIE LESAGE",
  "Mélanie Lesage",
  "Melanie Lesage",
  "ZINGABE",
  "Zingabe",
];

export const DJS_DISPLAY_ORDER = [
  "DARTA",
  "Darta",
  "DAME FLEURAUX",
  "Dame Fleuraux",
  "BONNIE SPACEY",
  "Bonnie Spacey",
  "AIMÉE",
  "Aimée",
  "Aimee",
  "ANTIX 2000",
  "Antix 2000",
  "BABZILLA",
  "Babzilla",
  "PIERINO",
  "Pierino",
  "MARIUS",
  "Marius",
  "KARL PEÖTI",
  "Karl Peöti",
  "Karl Peoti",
];

// Artistes à mettre en avant sur la page d'accueil
export const FEATURED_ARTISTS = [
  "KIMIA",
  "Kimia",
  "KAIROS",
  "Kairos",
  "KAÎROS",
  "Amalia JAULIN",
  "Amalia Jaulin",
];

// DJs à mettre en avant sur la page d'accueil
export const FEATURED_DJS = [
  "DARTA",
  "Darta",
  "DAME FLEURAUX",
  "Dame Fleuraux",
  "BONNIE SPACEY",
  "Bonnie Spacey",
];

/**
 * Trie un tableau d'artistes/DJs selon l'ordre de priorité défini
 * @param items - Tableau d'artistes ou DJs
 * @param orderList - Liste des noms dans l'ordre de priorité
 * @returns Tableau trié
 */
export function sortByDisplayOrder<T extends { name: string }>(
  items: T[],
  orderList: string[]
): T[] {
  return [...items].sort((a, b) => {
    const aIndex = orderList.findIndex(
      (name) => name.toLowerCase() === a.name.toLowerCase()
    );
    const bIndex = orderList.findIndex(
      (name) => name.toLowerCase() === b.name.toLowerCase()
    );

    // Si les deux sont dans la liste, trier par leur position
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    // Si seulement a est dans la liste, a vient en premier
    if (aIndex !== -1) return -1;
    // Si seulement b est dans la liste, b vient en premier
    if (bIndex !== -1) return 1;
    // Sinon, trier par ordre alphabétique
    return a.name.localeCompare(b.name, "fr");
  });
}

/**
 * Filtre les artistes/DJs pour n'afficher que ceux mis en avant
 * @param items - Tableau d'artistes ou DJs
 * @param featuredList - Liste des noms à mettre en avant
 * @returns Tableau filtré et trié
 */
export function getFeaturedItems<T extends { name: string }>(
  items: T[],
  featuredList: string[]
): T[] {
  const featured = items.filter((item) =>
    featuredList.some(
      (name) => name.toLowerCase() === item.name.toLowerCase()
    )
  );
  return sortByDisplayOrder(featured, featuredList);
}
