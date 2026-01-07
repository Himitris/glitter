# 🎨 Guide d'Utilisation des Stickers et Composants

Documentation complète pour utiliser les stickers et composants de la charte graphique Glitter Productions 2025.

---

## 📦 Composants Disponibles

### 1. `LogoSticker` - Logo avec Blob Backgrounds

Affiche le logo Glitter avec différents backgrounds organiques.

#### Import

```tsx
import LogoSticker from "@/components/ui/LogoSticker";
```

#### Props

```tsx
interface LogoStickerProps {
  variant:
    | "sticker-01"
    | "sticker-02"
    | "sticker-03"
    | "sticker-05"
    | "sticker-06"
    | "sticker-07"
    | "sticker-08"
    | "sticker-09"
    | "sticker-10";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  animated?: boolean; // Default: true
}
```

#### Exemples

```tsx
// Hero section
<LogoSticker variant="sticker-03" size="xl" />

// Card decoration
<LogoSticker variant="sticker-07" size="md" className="absolute top-4 right-4" />

// Gallery
<div className="grid grid-cols-3 gap-4">
  <LogoSticker variant="sticker-01" size="md" />
  <LogoSticker variant="sticker-02" size="md" />
  <LogoSticker variant="sticker-03" size="md" />
</div>
```

#### Variantes

- `sticker-01`, `sticker-02` : SVG (meilleure qualité, recommandé)
- `sticker-03` à `sticker-10` : WebP optimisés

---

### 2. `ServiceSticker` - Stickers de Services

Affiche les stickers officiels pour chaque service Glitter.

#### Import

```tsx
import ServiceSticker from "@/components/ui/ServiceSticker";
```

#### Props

```tsx
interface ServiceStickerProps {
  service:
    | "administration"
    | "dir-prod"
    | "management"
    | "production"
    | "regie-artiste"
    | "regie-site";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animated?: boolean; // Default: true
}
```

#### Exemples

```tsx
// Dans ServiceCard
<ServiceSticker service="production" size="lg" />

// Décoration de section
<div className="flex gap-4">
  <ServiceSticker service="administration" size="md" />
  <ServiceSticker service="management" size="md" />
</div>

// Hero avec services
<section className="relative">
  <ServiceSticker
    service="production"
    size="xl"
    className="absolute top-10 left-10 opacity-20"
  />
  <h1>Nos Services</h1>
</section>
```

#### Mapping Couleurs

| Service        | Couleur | Code    |
| -------------- | ------- | ------- |
| Production     | Violet  | #775CFF |
| Administration | Rose    | #EBABFF |
| Management     | Orange  | #FF7A42 |
| Régie Artiste  | Jaune   | #FFFF73 |
| Direction Prod | Rose    | #EBABFF |
| Régie Site     | Violet  | #775CFF |

---

### 3. `DecorativeSticker` - Stickers Décoratifs

Éléments décoratifs : boule disco, coeurs, strass.

#### Import

```tsx
import DecorativeSticker from "@/components/ui/DecorativeSticker";
```

#### Props

```tsx
interface DecorativeStickerProps {
  type: 'boule-disco' | 'coeur-01' | 'coeur-02' | `strass-${1-9}`;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;  // Default: true
  animationType?: 'float' | 'rotate' | 'pulse' | 'none';  // Default: 'float'
}
```

#### Exemples

```tsx
// Boule disco en rotation
<DecorativeSticker
  type="boule-disco"
  size="xl"
  animationType="rotate"
  className="mx-auto"
/>

// Coeurs pulsants
<div className="flex gap-4">
  <DecorativeSticker type="coeur-01" size="lg" animationType="pulse" />
  <DecorativeSticker type="coeur-02" size="lg" animationType="pulse" />
</div>

// Strass flottants en décoration
<div className="relative">
  <DecorativeSticker
    type="strass-01"
    size="md"
    className="absolute top-0 right-0"
    animationType="float"
  />
  <h2>Titre de Section</h2>
</div>

// Constellation de strass
{[1,2,3,4,5].map(i => (
  <DecorativeSticker
    key={i}
    type={`strass-0${i}` as any}
    size="sm"
    className={`absolute top-${i*20} left-${i*15}`}
  />
))}
```

#### Types d'Animations

- `float` : Flottement vertical avec légère rotation (4s)
- `rotate` : Rotation complète continue (20s)
- `pulse` : Pulsation d'échelle (2s)
- `none` : Pas d'animation

---

### 4. `Sticker` - Stickers Personnalisés

Crée des stickers personnalisés avec texte.

#### Import

```tsx
import Sticker from "@/components/ui/Sticker";
```

#### Props

```tsx
interface StickerProps {
  variant?: "violet" | "rose" | "orange" | "jaune" | "gradient";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  animate?: boolean; // Default: true
}
```

#### Exemples

```tsx
// Tags de catégorie
<Sticker variant="violet" size="md">
  Production
</Sticker>

// Labels de statut
<div className="flex gap-2">
  <Sticker variant="rose" size="sm">Nouveau</Sticker>
  <Sticker variant="orange" size="sm">Populaire</Sticker>
</div>

// Hero badge
<Sticker variant="gradient" size="lg">
  Glitter Productions 2025
</Sticker>

// Custom styling
<Sticker
  variant="violet"
  size="md"
  className="shadow-glow-violet"
>
  Featured
</Sticker>
```

---

### 5. `Badge` - Badges Modernes

Badges compacts pour tags et labels.

#### Import

```tsx
import Badge from "@/components/ui/Badge";
```

#### Props

```tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: "violet" | "rose" | "orange" | "jaune" | "outlined" | "solid";
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean; // Default: false
}
```

#### Exemples

```tsx
// Tags de service
<Badge variant="violet" size="md">Production</Badge>

// Status badges
<div className="flex gap-2">
  <Badge variant="rose" animated>Nouveau</Badge>
  <Badge variant="orange" animated>Hot</Badge>
</div>

// Outlined pour contraste
<Badge variant="outlined" size="lg">Tous les services</Badge>

// Solid pour CTA secondaire
<Badge variant="solid" size="md">En savoir plus</Badge>
```

---

### 6. `GradientBorder` - Wrapper Bordure Gradient

Applique une bordure gradient à n'importe quel contenu.

#### Import

```tsx
import GradientBorder from "@/components/ui/GradientBorder";
```

#### Props

```tsx
interface GradientBorderProps {
  children: React.ReactNode;
  gradient?: "violet" | "rose" | "orange" | "jaune" | "primary";
  borderWidth?: "1" | "2" | "3" | "4";
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" | "blob";
  className?: string;
  innerClassName?: string;
}
```

#### Exemples

```tsx
// Card avec bordure
<GradientBorder gradient="primary" borderWidth="2" rounded="3xl">
  <div className="p-6">
    <h3>Titre</h3>
    <p>Contenu</p>
  </div>
</GradientBorder>

// Button avec bordure gradient
<GradientBorder gradient="violet" borderWidth="3" rounded="full" className="inline-block">
  <button className="px-6 py-3">
    Découvrir
  </button>
</GradientBorder>

// Forme organique
<GradientBorder gradient="rose" borderWidth="4" rounded="blob">
  <div className="p-8 text-center">
    <ServiceSticker service="administration" size="xl" />
  </div>
</GradientBorder>
```

---

## 🎨 Cas d'Usage Complets

### Exemple 1 : Section Hero avec Décoration

```tsx
<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
  {/* Background decorations */}
  <DecorativeSticker
    type="strass-01"
    size="xl"
    className="absolute top-20 left-10 opacity-30"
    animationType="float"
  />
  <DecorativeSticker
    type="strass-06"
    size="lg"
    className="absolute bottom-40 right-20 opacity-40"
    animationType="float"
  />
  <DecorativeSticker
    type="boule-disco"
    size="xl"
    className="absolute top-1/2 right-10 opacity-20"
    animationType="rotate"
  />

  {/* Main content */}
  <div className="text-center z-10">
    <LogoSticker variant="sticker-03" size="2xl" className="mx-auto mb-8" />
    <h1 className="text-6xl font-bold mb-4">Glitter Productions</h1>
    <div className="flex gap-4 justify-center">
      <Badge variant="violet" size="lg" animated>
        2025
      </Badge>
      <Badge variant="rose" size="lg" animated>
        Nouveau
      </Badge>
    </div>
  </div>
</section>
```

---

### Exemple 2 : Service Grid avec Stickers

```tsx
<div className="grid md:grid-cols-3 gap-8">
  {[
    { service: "production", title: "Production", color: "violet" },
    { service: "administration", title: "Administration", color: "rose" },
    { service: "management", title: "Management", color: "orange" },
  ].map(({ service, title, color }) => (
    <GradientBorder
      key={service}
      gradient={color as any}
      borderWidth="2"
      rounded="3xl"
      className="hover:shadow-2xl transition-all"
    >
      <div className="p-8 text-center">
        <ServiceSticker
          service={service as any}
          size="xl"
          className="mx-auto mb-4"
        />
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-[#0B0B0B]/70">Description du service...</p>
        <Badge variant={color as any} className="mt-4">
          En savoir plus
        </Badge>
      </div>
    </GradientBorder>
  ))}
</div>
```

---

### Exemple 3 : Carte Artiste Décorée

```tsx
<div className="relative">
  {/* Decorative corner */}
  <DecorativeSticker
    type="coeur-01"
    size="md"
    className="absolute -top-4 -right-4 z-10"
    animationType="pulse"
  />

  <GradientBorder gradient="primary" borderWidth="2" rounded="3xl">
    <div className="p-6">
      <img src="/artist.jpg" className="rounded-2xl mb-4" />
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Nom Artiste</h3>
        <Sticker variant="violet" size="sm">
          DJ
        </Sticker>
      </div>
      <p className="text-[#0B0B0B]/70 mt-2">Description de l'artiste...</p>
    </div>
  </GradientBorder>
</div>
```

---

### Exemple 4 : Footer Décoré

```tsx
<footer className="relative py-20 bg-[#FFFFF6]">
  {/* Decorative elements */}
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <LogoSticker
      variant="sticker-01"
      size="xl"
      className="absolute top-10 left-10"
    />
    <LogoSticker
      variant="sticker-02"
      size="lg"
      className="absolute bottom-20 right-20"
    />
    <DecorativeSticker
      type="strass-03"
      size="md"
      className="absolute top-1/2 left-1/4"
    />
  </div>

  {/* Footer content */}
  <div className="container mx-auto px-4 relative z-10">
    {/* ... footer content ... */}
  </div>
</footer>
```

---

## 🎯 Bonnes Pratiques

### Performance

- ✅ Utilisez `LogoSticker` variants SVG (01, 02) pour les grands logos
- ✅ Les autres stickers sont en WebP optimisé (~80 KB au lieu de ~500 KB)
- ✅ Ajoutez `loading="lazy"` automatiquement appliqué
- ✅ Limitez les animations complexes à 3-4 par viewport

### Design

- ✅ Respectez la hiérarchie des tailles (sm → md → lg → xl)
- ✅ Utilisez `opacity-20` à `opacity-40` pour les décorations en background
- ✅ Combinez `GradientBorder` + `ServiceSticker` pour un effet cohérent
- ✅ Alternez les variants pour créer de la variété visuelle

### Accessibilité

- ✅ Les images décoratives ont automatiquement des alt appropriés
- ✅ Utilisez `Badge` pour du texte important (meilleur contraste)
- ✅ Limitez les animations avec `animationType="none"` si nécessaire

---

## 📱 Responsive Design

```tsx
// Adaptez la taille selon le breakpoint
<ServiceSticker
  service="production"
  size="md"
  className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24"
/>

// Cachez les décorations sur mobile
<DecorativeSticker
  type="strass-01"
  size="lg"
  className="hidden md:block absolute top-10 right-10"
/>

// Grid responsive
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Stickers */}
</div>
```

---

## 🚀 Page de Démonstration

Une page complète de démonstration est disponible : `src/pages/StickersDemo.tsx`

Pour l'utiliser :

1. Ajoutez temporairement la route dans `App.tsx`
2. Visitez `/stickers-demo`
3. Testez tous les composants interactivement

---

## 📚 Ressources

- Charte graphique : `/Brand - Livrables/`
- Images sources : `C:\Users\Himitris\Downloads\Images\`
- Guide d'import : `IMAGES_IMPORT_GUIDE.md`
- Documentation intégration : `BRAND_INTEGRATION_2025.md`

---

**Version** : 1.0.0 - Décembre 2025
**Charte** : Glitter Productions 2025
