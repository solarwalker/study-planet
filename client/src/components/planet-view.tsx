import { motion, AnimatePresence } from "framer-motion";
import { Planet } from "@shared/schema";
import { planetColors, planetTextures, planetRings } from "@/lib/planet-data";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";

interface PlanetViewProps {
  planets: Planet[];
  selectedPlanet: Planet | null;
  onSelectPlanet: (planet: Planet) => void;
}

export default function PlanetView({ 
  planets, 
  selectedPlanet, 
  onSelectPlanet 
}: PlanetViewProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleNext = () => {
    if (!selectedPlanet) {
      onSelectPlanet(planets[0]);
      return;
    }
    const currentIndex = planets.findIndex(p => p.id === selectedPlanet.id);
    const nextIndex = (currentIndex + 1) % planets.length;
    onSelectPlanet(planets[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedPlanet) {
      onSelectPlanet(planets[planets.length - 1]);
      return;
    }
    const currentIndex = planets.findIndex(p => p.id === selectedPlanet.id);
    const prevIndex = currentIndex === 0 ? planets.length - 1 : currentIndex - 1;
    onSelectPlanet(planets[prevIndex]);
  };

  const handlePlanetClick = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="relative aspect-square bg-black/40 rounded-lg overflow-hidden backdrop-blur-sm">
      <div 
        className="absolute inset-0" 
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)'
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {selectedPlanet ? (
            <motion.div
              key={selectedPlanet.id}
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ 
                scale: isZoomed ? 1.5 : 1, 
                opacity: 1, 
                rotate: 0,
                transition: { duration: 0.5 }
              }}
              exit={{ scale: 0, opacity: 0, rotate: 180 }}
              whileHover={{ 
                scale: isZoomed ? 1.5 : 1.1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: isZoomed ? 1.45 : 0.95 }}
              className="relative cursor-pointer"
              onClick={handlePlanetClick}
              style={{
                zIndex: isZoomed ? 50 : 1
              }}
            >
              {/* Saturn's Rings */}
              {selectedPlanet.name === "Saturn" && (
                <motion.div
                  className="absolute top-1/2 left-1/2 w-[160%] h-[40%] rounded-[100%]"
                  style={{
                    background: planetRings.Saturn.gradient,
                    transform: `translate(-50%, -50%) rotate(${planetRings.Saturn.rotation}deg)`,
                    zIndex: 1,
                    transformOrigin: 'center center',
                    perspective: '1000px',
                    backfaceVisibility: 'hidden'
                  }}
                />
              )}

              {/* Planet Surface */}
              <motion.div
                className="w-48 h-48 rounded-full relative overflow-hidden"
                style={{
                  background: planetColors[selectedPlanet.name as keyof typeof planetColors],
                  boxShadow: `
                    inset -8px -8px 20px rgba(0,0,0,0.4),
                    inset 8px 8px 20px rgba(255,255,255,0.1),
                    0 0 60px ${planetColors[selectedPlanet.name as keyof typeof planetColors].split(' ')[2]}33
                  `
                }}
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {/* Planet Texture */}
                <div 
                  className="absolute inset-0 mix-blend-overlay"
                  style={{
                    background: planetTextures[selectedPlanet.name as keyof typeof planetTextures] || `
                      radial-gradient(circle at 30% 50%,
                        rgba(255,255,255,0.1) 0%,
                        transparent 70%
                      )
                    `
                  }}
                />

                {/* Atmosphere Glow */}
                <div 
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: `radial-gradient(circle at 70% 30%, 
                      rgba(255,255,255,0.4) 0%,
                      transparent 50%
                    )`
                  }}
                />
              </motion.div>

              {/* Interactive Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`absolute left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 rounded-lg text-sm text-white max-w-[200px] text-center ${
                  isZoomed ? 'bottom-[-120px]' : 'top-full mt-4'
                }`}
                style={{
                  zIndex: 60,
                  pointerEvents: "none"
                }}
              >
                {isZoomed ? (
                  <>
                    <p className="font-bold mb-1">{selectedPlanet.name}</p>
                    <p className="text-xs">{selectedPlanet.description}</p>
                  </>
                ) : (
                  "Touch to zoom in!"
                )}
              </motion.div>
            </motion.div>
          ) : (
            <div className="text-center text-muted-foreground">
              Select a planet to begin exploring
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 inset-x-4 flex items-center gap-2" style={{ zIndex: 40 }}>
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          className="shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <ScrollArea className="w-full">
          <div className="flex gap-2 px-1">
            {planets.map((planet) => (
              <Button
                key={planet.id}
                variant={selectedPlanet?.id === planet.id ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setIsZoomed(false);
                  onSelectPlanet(planet);
                }}
                className="shrink-0 transition-all hover:scale-110"
              >
                {planet.name}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}