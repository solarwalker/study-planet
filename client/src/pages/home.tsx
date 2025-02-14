import { useState } from "react";
import { usePlanets } from "@/lib/planet-data";
import PlanetView from "@/components/planet-view";
import PlanetInfo from "@/components/planet-info";
import PlanetComparison from "@/components/planet-comparison";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Planet } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: planets, isLoading } = usePlanets();
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <div className="mt-6 grid gap-4">
          <Skeleton className="h-[100px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div 
        className="absolute inset-0 bg-cover bg-center -z-10 opacity-20"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1464802686167-b939a6910659)`
        }}
      />
      
      <main className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Solar System Explorer
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <PlanetView 
            planets={planets || []}
            selectedPlanet={selectedPlanet}
            onSelectPlanet={setSelectedPlanet}
          />

          <div className="space-y-6">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">Planet Info</TabsTrigger>
                <TabsTrigger value="compare">Compare Planets</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <PlanetInfo planet={selectedPlanet} />
              </TabsContent>
              <TabsContent value="compare">
                <PlanetComparison 
                  planets={planets || []}
                  selectedPlanet={selectedPlanet}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
