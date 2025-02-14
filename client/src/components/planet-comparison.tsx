import { useState } from "react";
import { Planet } from "@shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer 
} from "recharts";
import { planetColors } from "@/lib/planet-data";

interface PlanetComparisonProps {
  planets: Planet[];
  selectedPlanet: Planet | null;
}

type Metric = "diameter" | "distanceFromSun" | "orbitalPeriod";

export default function PlanetComparison({ 
  planets,
  selectedPlanet 
}: PlanetComparisonProps) {
  const [metric, setMetric] = useState<Metric>("diameter");

  if (!selectedPlanet) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            Select a planet to compare with others
          </div>
        </CardContent>
      </Card>
    );
  }

  const compareData = (selectedMetric: Metric) => {
    return planets
      .sort((a, b) => a.order - b.order)
      .map(planet => ({
        name: planet.name,
        value: Number(planet[selectedMetric]),
        fill: planetColors[planet.name as keyof typeof planetColors]
      }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare Planets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Select value={metric} onValueChange={(value) => setMetric(value as Metric)}>
          <SelectTrigger>
            <SelectValue placeholder="Select metric to compare" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diameter">Diameter</SelectItem>
            <SelectItem value="distanceFromSun">Distance from Sun</SelectItem>
            <SelectItem value="orbitalPeriod">Orbital Period</SelectItem>
          </SelectContent>
        </Select>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={compareData(metric)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}