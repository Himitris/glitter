import React from 'react';
import { motion } from 'framer-motion';
import ServiceSticker from '../components/ui/ServiceSticker';
import DecorativeSticker from '../components/ui/DecorativeSticker';
import LogoSticker from '../components/ui/LogoSticker';
import Sticker from '../components/ui/Sticker';
import Badge from '../components/ui/Badge';
import GradientBorder from '../components/ui/GradientBorder';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';

/**
 * Page de démonstration des stickers et composants de la charte
 * À utiliser comme référence pour l'intégration
 *
 * ⚠️ Cette page est pour la démo uniquement
 * Ne pas l'ajouter à la navigation publique
 */
const StickersDemo = () => {
  return (
    <div className="min-h-screen bg-[#FFFFF6] py-20">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <AnimatedGradientText as="h1" className="text-5xl font-bold mb-4">
            Stickers & Composants
          </AnimatedGradientText>
          <p className="text-[#0B0B0B]/70 text-lg">
            Guide de démonstration des assets de la charte graphique 2025
          </p>
        </div>

        {/* Section 1 : Logo Stickers */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#0B0B0B]">
            1. Logo Stickers (avec blob backgrounds)
          </h2>
          <GradientBorder gradient="primary" rounded="3xl" className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 place-items-center">
              <div className="text-center">
                <LogoSticker variant="sticker-01" size="md" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Sticker 01 (SVG)</p>
              </div>
              <div className="text-center">
                <LogoSticker variant="sticker-02" size="md" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Sticker 02 (SVG)</p>
              </div>
              <div className="text-center">
                <LogoSticker variant="sticker-03" size="md" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Sticker 03</p>
              </div>
              <div className="text-center">
                <LogoSticker variant="sticker-05" size="md" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Sticker 05</p>
              </div>
              <div className="text-center">
                <LogoSticker variant="sticker-06" size="md" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Sticker 06</p>
              </div>
              <div className="text-center">
                <LogoSticker variant="sticker-07" size="md" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Sticker 07</p>
              </div>
              <div className="text-center">
                <LogoSticker variant="sticker-08" size="md" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Sticker 08</p>
              </div>
              <div className="text-center">
                <LogoSticker variant="sticker-09" size="md" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Sticker 09</p>
              </div>
            </div>
          </GradientBorder>

          {/* Code Example */}
          <div className="mt-4 bg-[#0B0B0B] text-[#FFFFF6] p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              {`<LogoSticker variant="sticker-03" size="md" animated />`}
            </code>
          </div>
        </section>

        {/* Section 2 : Service Stickers */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#0B0B0B]">
            2. Service Stickers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <GradientBorder gradient="rose" rounded="3xl" className="p-6 text-center">
              <ServiceSticker service="administration" size="lg" />
              <p className="mt-4 font-semibold text-[#0B0B0B]">Administration</p>
              <Badge variant="rose" size="sm" className="mt-2">Rose</Badge>
            </GradientBorder>

            <GradientBorder gradient="violet" rounded="3xl" className="p-6 text-center">
              <ServiceSticker service="production" size="lg" />
              <p className="mt-4 font-semibold text-[#0B0B0B]">Production</p>
              <Badge variant="violet" size="sm" className="mt-2">Violet</Badge>
            </GradientBorder>

            <GradientBorder gradient="orange" rounded="3xl" className="p-6 text-center">
              <ServiceSticker service="management" size="lg" />
              <p className="mt-4 font-semibold text-[#0B0B0B]">Management</p>
              <Badge variant="orange" size="sm" className="mt-2">Orange</Badge>
            </GradientBorder>

            <GradientBorder gradient="jaune" rounded="3xl" className="p-6 text-center">
              <ServiceSticker service="regie-artiste" size="lg" />
              <p className="mt-4 font-semibold text-[#0B0B0B]">Régie Artiste</p>
              <Badge variant="jaune" size="sm" className="mt-2">Jaune</Badge>
            </GradientBorder>

            <GradientBorder gradient="rose" rounded="3xl" className="p-6 text-center">
              <ServiceSticker service="dir-prod" size="lg" />
              <p className="mt-4 font-semibold text-[#0B0B0B]">Direction Prod</p>
              <Badge variant="rose" size="sm" className="mt-2">Rose</Badge>
            </GradientBorder>

            <GradientBorder gradient="violet" rounded="3xl" className="p-6 text-center">
              <ServiceSticker service="regie-site" size="lg" />
              <p className="mt-4 font-semibold text-[#0B0B0B]">Régie Site</p>
              <Badge variant="violet" size="sm" className="mt-2">Violet</Badge>
            </GradientBorder>
          </div>

          <div className="mt-4 bg-[#0B0B0B] text-[#FFFFF6] p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              {`<ServiceSticker service="production" size="lg" animated />`}
            </code>
          </div>
        </section>

        {/* Section 3 : Decorative Stickers */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#0B0B0B]">
            3. Stickers Décoratifs
          </h2>
          <GradientBorder gradient="primary" rounded="3xl" className="p-8">
            <div className="grid grid-cols-3 md:grid-cols-5 gap-8 place-items-center">
              <div className="text-center">
                <DecorativeSticker type="boule-disco" size="lg" animationType="rotate" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Boule Disco</p>
              </div>
              <div className="text-center">
                <DecorativeSticker type="coeur-01" size="lg" animationType="pulse" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Coeur 01</p>
              </div>
              <div className="text-center">
                <DecorativeSticker type="coeur-02" size="lg" animationType="pulse" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Coeur 02</p>
              </div>
              <div className="text-center">
                <DecorativeSticker type="strass-01" size="lg" animationType="float" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Strass 01</p>
              </div>
              <div className="text-center">
                <DecorativeSticker type="strass-06" size="lg" animationType="float" />
                <p className="mt-2 text-sm text-[#0B0B0B]/70">Strass 06</p>
              </div>
            </div>
          </GradientBorder>

          <div className="mt-4 bg-[#0B0B0B] text-[#FFFFF6] p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              {`<DecorativeSticker type="boule-disco" size="lg" animationType="rotate" />`}
            </code>
          </div>
        </section>

        {/* Section 4 : Custom Stickers (composant Sticker) */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#0B0B0B]">
            4. Stickers Personnalisés (Composant Sticker)
          </h2>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Sticker variant="violet" size="lg">
              Production
            </Sticker>
            <Sticker variant="rose" size="lg">
              Administration
            </Sticker>
            <Sticker variant="orange" size="lg">
              Management
            </Sticker>
            <Sticker variant="jaune" size="lg">
              Prestation
            </Sticker>
            <Sticker variant="gradient" size="lg">
              Glitter
            </Sticker>
          </div>

          <div className="mt-4 bg-[#0B0B0B] text-[#FFFFF6] p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              {`<Sticker variant="violet" size="lg" animate>Production</Sticker>`}
            </code>
          </div>
        </section>

        {/* Section 5 : Badges */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#0B0B0B]">
            5. Badges
          </h2>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Badge variant="violet" size="lg" animated>Nouveau</Badge>
            <Badge variant="rose" size="lg" animated>Populaire</Badge>
            <Badge variant="orange" size="lg" animated>Hot</Badge>
            <Badge variant="jaune" size="lg" animated>Promo</Badge>
            <Badge variant="outlined" size="lg">Outline</Badge>
            <Badge variant="solid" size="lg">Solid</Badge>
          </div>

          <div className="mt-4 bg-[#0B0B0B] text-[#FFFFF6] p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              {`<Badge variant="violet" size="lg" animated>Nouveau</Badge>`}
            </code>
          </div>
        </section>

        {/* Section 6 : Gradient Borders */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#0B0B0B]">
            6. Bordures Gradient (GradientBorder)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GradientBorder gradient="violet" borderWidth="3" rounded="3xl" className="p-6">
              <h3 className="text-xl font-bold mb-2">Gradient Violet</h3>
              <p className="text-[#0B0B0B]/70">
                Bordure gradient violet → rose, parfait pour Production
              </p>
            </GradientBorder>

            <GradientBorder gradient="rose" borderWidth="3" rounded="3xl" className="p-6">
              <h3 className="text-xl font-bold mb-2">Gradient Rose</h3>
              <p className="text-[#0B0B0B]/70">
                Bordure gradient rose → orange, idéal pour Administration
              </p>
            </GradientBorder>

            <GradientBorder gradient="orange" borderWidth="3" rounded="3xl" className="p-6">
              <h3 className="text-xl font-bold mb-2">Gradient Orange</h3>
              <p className="text-[#0B0B0B]/70">
                Bordure gradient orange → rose, Management style
              </p>
            </GradientBorder>

            <GradientBorder gradient="primary" borderWidth="3" rounded="3xl" className="p-6">
              <h3 className="text-xl font-bold mb-2">Gradient Primary</h3>
              <p className="text-[#0B0B0B]/70">
                Bordure 4 couleurs : violet, rose, orange, jaune
              </p>
            </GradientBorder>
          </div>

          <div className="mt-4 bg-[#0B0B0B] text-[#FFFFF6] p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              {`<GradientBorder gradient="primary" borderWidth="3" rounded="3xl">\n  <YourContent />\n</GradientBorder>`}
            </code>
          </div>
        </section>

        {/* Footer Note */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-[#775CFF]/10 to-[#EBABFF]/10 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4 text-[#0B0B0B]">
            📚 Documentation Complète
          </h3>
          <p className="text-[#0B0B0B]/70 mb-4">
            Consultez <code className="bg-[#0B0B0B]/10 px-2 py-1 rounded">STICKERS_USAGE.md</code> pour des exemples détaillés
          </p>
          <Badge variant="violet" size="lg">Charte 2025</Badge>
        </div>

      </div>
    </div>
  );
};

export default StickersDemo;
