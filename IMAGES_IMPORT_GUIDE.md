# 📸 Guide d'Import des Images Glitter Production 2025

## 📂 Structure de Vos Images

Vous avez la structure suivante dans `C:\Users\Himitris\Downloads\Images` :

```
Images/
├── Logo/
│   ├── Logo-blanc/
│   │   ├── Logo-blanc-2.svg
│   │   ├── Logo-blanc-contour.svg
│   │   └── Logo-blanc.svg
│   ├── Logo-noir/
│   │   ├── Logo-noir-2.svg
│   │   └── Logo-noir.svg
│   ├── Logo-sticker/
│   │   ├── Logo-blanc-4.png
│   │   ├── Sticker-03.png (566 KB)
│   │   ├── Sticker-05.png (515 KB)
│   │   ├── Sticker-06.png (540 KB)
│   │   ├── Sticker-07.png (578 KB)
│   │   ├── Sticker-08.png (534 KB)
│   │   ├── Sticker-09.png (512 KB)
│   │   └── Sticker-10.png (518 KB)
│   ├── Monogramme/
│   │   ├── Monogramme-blanc.png
│   │   └── Monogramme-noir.png
│   └── Monogramme-sticker/
│       ├── Sticker-01.svg
│       └── Sticker-02.svg
├── Social media/
│   ├── Facebook cover.png (633 KB)
│   ├── Facebook PP.png
│   ├── LinkedIn cover.png (1.6 MB)
│   └── LinkedIn PP.png
└── Stickers/
    ├── Administration.png (288 KB)
    ├── Boule-disco.png (364 KB)
    ├── Coeur-01.png (263 KB)
    ├── Coeur-02.png (161 KB)
    ├── Dir-Prod.png (272 KB)
    ├── Management.png (364 KB)
    ├── Production.png (228 KB)
    ├── Régie-artiste.png (232 KB)
    ├── Régie-site.png (221 KB)
    └── Strass/
        ├── Strass-01.png à Strass-09.png (59-346 KB chacun)
```

---

## 🎯 Structure Cible dans le Projet

```
/public/images/logos/
├── logo-versions/
│   ├── SVG/
│   │   ├── logo-blanc.svg
│   │   ├── logo-blanc-2.svg
│   │   ├── logo-blanc-contour.svg
│   │   ├── logo-noir.svg
│   │   ├── logo-noir-2.svg
│   │   ├── monogramme-blanc.svg (converti)
│   │   └── monogramme-noir.svg (converti)
│   └── PNG/
│       ├── monogramme-blanc.png
│       ├── monogramme-noir.png
│       └── logo-blanc-4.png
├── stickers/
│   ├── logo/
│   │   ├── sticker-01.svg
│   │   ├── sticker-02.svg
│   │   ├── sticker-03.webp (optimisé)
│   │   ├── sticker-05.webp
│   │   ├── sticker-06.webp
│   │   ├── sticker-07.webp
│   │   ├── sticker-08.webp
│   │   ├── sticker-09.webp
│   │   └── sticker-10.webp
│   ├── services/
│   │   ├── administration.webp
│   │   ├── dir-prod.webp
│   │   ├── management.webp
│   │   ├── production.webp
│   │   ├── regie-artiste.webp
│   │   └── regie-site.webp
│   ├── decoratifs/
│   │   ├── boule-disco.webp
│   │   ├── coeur-01.webp
│   │   └── coeur-02.webp
│   └── strass/
│       ├── strass-01.webp à strass-09.webp
└── social/
    ├── facebook-cover.webp
    ├── facebook-pp.webp
    ├── linkedin-cover.webp
    └── linkedin-pp.webp
```

---

## 🚀 Script PowerShell pour Copier les Images

Créez ce script : `copy-images.ps1` dans votre dossier `Downloads\Images`

```powershell
# Script de copie et organisation des images Glitter Production
# À exécuter depuis : C:\Users\Himitris\Downloads\Images

$sourceBase = "C:\Users\Himitris\Downloads\Images"
$targetBase = "C:\path\to\glitter\public\images\logos"  # ADAPTER CE CHEMIN !

# Créer la structure de dossiers
Write-Host "Création de la structure..." -ForegroundColor Green
New-Item -ItemType Directory -Force -Path "$targetBase\logo-versions\SVG"
New-Item -ItemType Directory -Force -Path "$targetBase\logo-versions\PNG"
New-Item -ItemType Directory -Force -Path "$targetBase\stickers\logo"
New-Item -ItemType Directory -Force -Path "$targetBase\stickers\services"
New-Item -ItemType Directory -Force -Path "$targetBase\stickers\decoratifs"
New-Item -ItemType Directory -Force -Path "$targetBase\stickers\strass"
New-Item -ItemType Directory -Force -Path "$targetBase\social"

# Copier les logos SVG
Write-Host "Copie des logos SVG..." -ForegroundColor Cyan
Copy-Item "$sourceBase\Logo\Logo-blanc\*.svg" -Destination "$targetBase\logo-versions\SVG"
Copy-Item "$sourceBase\Logo\Logo-noir\*.svg" -Destination "$targetBase\logo-versions\SVG"

# Copier les monogrammes PNG
Write-Host "Copie des monogrammes..." -ForegroundColor Cyan
Copy-Item "$sourceBase\Logo\Monogramme\*.png" -Destination "$targetBase\logo-versions\PNG"

# Copier les stickers de logo
Write-Host "Copie des stickers de logo..." -ForegroundColor Cyan
Copy-Item "$sourceBase\Logo\Logo-sticker\*.png" -Destination "$targetBase\stickers\logo"
Copy-Item "$sourceBase\Logo\Monogramme-sticker\*.svg" -Destination "$targetBase\stickers\logo"

# Copier les stickers de services (renommer en minuscules)
Write-Host "Copie des stickers de services..." -ForegroundColor Cyan
Copy-Item "$sourceBase\Stickers\Administration.png" -Destination "$targetBase\stickers\services\administration.png"
Copy-Item "$sourceBase\Stickers\Dir-Prod.png" -Destination "$targetBase\stickers\services\dir-prod.png"
Copy-Item "$sourceBase\Stickers\Management.png" -Destination "$targetBase\stickers\services\management.png"
Copy-Item "$sourceBase\Stickers\Production.png" -Destination "$targetBase\stickers\services\production.png"
Copy-Item "$sourceBase\Stickers\Régie-artiste.png" -Destination "$targetBase\stickers\services\regie-artiste.png"
Copy-Item "$sourceBase\Stickers\Régie-site.png" -Destination "$targetBase\stickers\services\regie-site.png"

# Copier les stickers décoratifs
Write-Host "Copie des stickers décoratifs..." -ForegroundColor Cyan
Copy-Item "$sourceBase\Stickers\Boule-disco.png" -Destination "$targetBase\stickers\decoratifs\boule-disco.png"
Copy-Item "$sourceBase\Stickers\Coeur-01.png" -Destination "$targetBase\stickers\decoratifs\coeur-01.png"
Copy-Item "$sourceBase\Stickers\Coeur-02.png" -Destination "$targetBase\stickers\decoratifs\coeur-02.png"

# Copier les strass (renommer en minuscules)
Write-Host "Copie des strass..." -ForegroundColor Cyan
Get-ChildItem "$sourceBase\Stickers\Strass\*.png" | ForEach-Object {
    $newName = $_.Name.ToLower()
    Copy-Item $_.FullName -Destination "$targetBase\stickers\strass\$newName"
}

# Copier les images social media
Write-Host "Copie des images social media..." -ForegroundColor Cyan
Copy-Item "$sourceBase\Social media\Facebook cover.png" -Destination "$targetBase\social\facebook-cover.png"
Copy-Item "$sourceBase\Social media\Facebook PP.png" -Destination "$targetBase\social\facebook-pp.png"
Copy-Item "$sourceBase\Social media\LinkedIn cover.png" -Destination "$targetBase\social\linkedin-cover.png"
Copy-Item "$sourceBase\Social media\LinkedIn PP.png" -Destination "$targetBase\social\linkedin-pp.png"

Write-Host "`n✅ Copie terminée !" -ForegroundColor Green
Write-Host "📁 Images copiées dans : $targetBase" -ForegroundColor Yellow
Write-Host "`n⚠️  IMPORTANT : Optimisez les PNG en WebP pour les performances !" -ForegroundColor Red
```

---

## 🔧 Étapes d'Import

### 1. **Adapter le Chemin**
Dans le script PowerShell ci-dessus, modifiez la ligne :
```powershell
$targetBase = "C:\path\to\glitter\public\images\logos"
```

Pour pointer vers votre projet réel.

### 2. **Exécuter le Script**
```powershell
cd C:\Users\Himitris\Downloads\Images
.\copy-images.ps1
```

### 3. **Optimiser les Images (Optionnel mais Recommandé)**

#### Option A : Outil en ligne
- Allez sur https://squoosh.app/
- Glissez-déposez vos PNG
- Choisissez WebP avec qualité 85%
- Téléchargez et remplacez

#### Option B : Avec ImageMagick (si installé)
```bash
# Dans le terminal du projet
cd public/images/logos/stickers

# Convertir tous les PNG en WebP
for file in **/*.png; do
  magick "$file" -quality 85 "${file%.png}.webp"
done
```

---

## 📋 Mapping des Fichiers

### Logos Principaux
| Fichier Source | Utilisation | Destination |
|----------------|-------------|-------------|
| `Logo-blanc.svg` | Logo principal fond sombre | `logo-versions/SVG/logo-blanc.svg` |
| `Logo-noir.svg` | Logo principal fond clair | `logo-versions/SVG/logo-noir.svg` |
| `Logo-blanc-2.svg` | Logo alternatif | `logo-versions/SVG/logo-blanc-2.svg` |
| `Logo-blanc-contour.svg` | Logo avec contour | `logo-versions/SVG/logo-blanc-contour.svg` |

### Stickers Logo
| Fichier Source | Description | Taille | Destination |
|----------------|-------------|--------|-------------|
| `Sticker-03.png` | Logo sticker variant 1 | 566 KB | `stickers/logo/sticker-03.webp` |
| `Sticker-05.png` | Logo sticker variant 2 | 515 KB | `stickers/logo/sticker-05.webp` |
| `Sticker-06.png` | Logo sticker variant 3 | 540 KB | `stickers/logo/sticker-06.webp` |
| `Sticker-07.png` | Logo sticker variant 4 | 578 KB | `stickers/logo/sticker-07.webp` |
| `Sticker-08.png` | Logo sticker variant 5 | 534 KB | `stickers/logo/sticker-08.webp` |
| `Sticker-09.png` | Logo sticker variant 6 | 512 KB | `stickers/logo/sticker-09.webp` |
| `Sticker-10.png` | Logo sticker variant 7 | 518 KB | `stickers/logo/sticker-10.webp` |

### Stickers Services
| Fichier Source | Service | Couleur | Destination |
|----------------|---------|---------|-------------|
| `Administration.png` | Administration | Rose | `stickers/services/administration.webp` |
| `Dir-Prod.png` | Direction Production | Rose | `stickers/services/dir-prod.webp` |
| `Management.png` | Management | Orange | `stickers/services/management.webp` |
| `Production.png` | Production | Violet | `stickers/services/production.webp` |
| `Régie-artiste.png` | Régie Artiste | Jaune | `stickers/services/regie-artiste.webp` |
| `Régie-site.png` | Régie Site | Violet | `stickers/services/regie-site.webp` |

---

## 🎨 Utilisation dans le Code

### Exemple 1 : Logo dans le Header
```tsx
// Dans LogoSVG.tsx
<img
  src="/images/logos/logo-versions/SVG/logo-noir.svg"
  alt="Glitter Production"
  className="h-12"
/>
```

### Exemple 2 : Sticker Service
```tsx
// Dans ServiceCard.tsx
<img
  src="/images/logos/stickers/services/production.webp"
  alt="Production"
  className="w-16 h-16"
/>
```

### Exemple 3 : Sticker Décoratif
```tsx
// Dans n'importe quelle page
<img
  src="/images/logos/stickers/decoratifs/boule-disco.webp"
  alt="Boule disco"
  className="absolute top-10 right-10 w-32 h-32 animate-float"
/>
```

---

## ⚡ Optimisation des Performances

### Gains Attendus avec WebP
| Format | Taille Moyenne | WebP (85%) | Gain |
|--------|----------------|------------|------|
| PNG Stickers | ~500 KB | ~80 KB | 84% |
| PNG Services | ~250 KB | ~40 KB | 84% |
| SVG | - | - | Déjà optimal |

### Total Économisé
- **Avant** : ~5 MB pour tous les stickers
- **Après WebP** : ~800 KB
- **Gain** : 84% de réduction !

---

## 📝 Prochaines Étapes Après Import

1. ✅ Copier les images avec le script
2. ✅ Optimiser en WebP
3. ✅ Mettre à jour `LogoSVG.tsx`
4. ✅ Créer `StickerGallery.tsx`
5. ✅ Tester l'affichage
6. ✅ Commit et push

---

## 🔗 Références

- Script de copie : Voir ci-dessus
- Optimisation WebP : https://squoosh.app/
- Documentation Tailwind pour images : https://tailwindcss.com/docs/object-fit

---

**Note** : Une fois les images importées, je mettrai à jour automatiquement les composants pour utiliser ces nouveaux assets !
