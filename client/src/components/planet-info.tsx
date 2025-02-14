import { motion } from "framer-motion";
import { Planet } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ruler, Calendar, Sun, Rocket, Star, ThermometerSun } from "lucide-react";

interface PlanetInfoProps {
  planet: Planet | null;
}

// Fun facts for each planet
const planetFacts = {
  Mercury: {
    funFact: "I'm the fastest planet, zooming around the Sun in just 88 Earth days! 🏃‍♂️",
    temp: "800°F (day) to -290°F (night)",
    moons: 0,
    atmosphere: "Very thin",
    emoji: "🔥"
  },
  Venus: {
    funFact: "I'm the hottest planet, even hotter than Mercury! My clouds are made of acid! ☁️",
    temp: "880°F (average)",
    moons: 0,
    atmosphere: "Very thick, mostly CO2",
    emoji: "☀️"
  },
  Earth: {
    funFact: "I'm the only planet known to have life! My nickname is the Blue Planet! 🌍",
    temp: "59°F (average)",
    moons: 1,
    atmosphere: "Nitrogen and Oxygen",
    emoji: "🌎"
  },
  Mars: {
    funFact: "I have the largest volcano in the solar system - Olympus Mons! 🗻",
    temp: "-81°F (average)",
    moons: 2,
    atmosphere: "Thin, mostly CO2",
    emoji: "🔴"
  },
  Jupiter: {
    funFact: "I'm so big that all other planets could fit inside me! My Great Red Spot is a giant storm! 🌪️",
    temp: "-238°F (average)",
    moons: 79,
    atmosphere: "Thick, hydrogen and helium",
    emoji: "🟤"
  },
  Saturn: {
    funFact: "My beautiful rings are made of ice, dust, and rocks! I could float in a giant bathtub! 🛁",
    temp: "-178°F (average)",
    moons: 82,
    atmosphere: "Thick, hydrogen and helium",
    emoji: "💫"
  },
  Uranus: {
    funFact: "I spin sideways and roll around the Sun like a ball! ⚪",
    temp: "-353°F (average)",
    moons: 27,
    atmosphere: "Hydrogen, helium, methane",
    emoji: "❄️"
  },
  Neptune: {
    funFact: "I have the strongest winds in the solar system, up to 1,200 mph! 🌪️",
    temp: "-373°F (average)",
    moons: 14,
    atmosphere: "Hydrogen, helium, methane",
    emoji: "💨"
  }
};

export default function PlanetInfo({ planet }: PlanetInfoProps) {
  if (!planet) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Select a planet to view its details
          </div>
        </CardContent>
      </Card>
    );
  }

  const facts = planetFacts[planet.name as keyof typeof planetFacts];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>{facts.emoji}</span>
            <span>{planet.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/10 p-4 rounded-lg"
          >
            <p className="text-lg font-semibold text-primary">Did you know?</p>
            <p className="text-muted-foreground">{facts.funFact}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Ruler className="h-8 w-8 mb-2 text-primary" />
                    <div className="text-sm font-medium">Diameter</div>
                    <div className="text-2xl font-bold">{planet.diameter.toLocaleString()} km</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Sun className="h-8 w-8 mb-2 text-primary" />
                    <div className="text-sm font-medium">Distance from Sun</div>
                    <div className="text-2xl font-bold">{planet.distanceFromSun.toLocaleString()} million km</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Calendar className="h-8 w-8 mb-2 text-primary" />
                    <div className="text-sm font-medium">Orbital Period</div>
                    <div className="text-2xl font-bold">{planet.orbitalPeriod.toLocaleString()} Earth days</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <ThermometerSun className="h-8 w-8 mb-2 text-primary" />
                    <div className="text-sm font-medium">Temperature</div>
                    <div className="text-lg font-bold">{facts.temp}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Star className="h-8 w-8 mb-2 text-primary" />
                    <div className="text-sm font-medium">Moons</div>
                    <div className="text-lg font-bold">{facts.moons}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Rocket className="h-8 w-8 mb-2 text-primary" />
                    <div className="text-sm font-medium">Atmosphere</div>
                    <div className="text-lg font-bold">{facts.atmosphere}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}