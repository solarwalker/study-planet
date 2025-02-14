import { Planet } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

export function usePlanets() {
  return useQuery<Planet[]>({
    queryKey: ["/api/planets"],
  });
}

export const planetColors = {
  Mercury: "linear-gradient(45deg, #8B7355 0%, #A5A5A5 50%, #8B7355 100%)",
  Venus: "linear-gradient(45deg, #C68E17 0%, #E6B800 50%, #C68E17 100%)",
  Earth: "linear-gradient(45deg, #4B9CD3 0%, #45B058 50%, #4B9CD3 100%)",
  Mars: "linear-gradient(45deg, #9C2E0E 0%, #D35F5F 50%, #9C2E0E 100%)",
  Jupiter: "radial-gradient(circle at 30% 50%, #E8B98A 0%, #A67B5B 50%, #805B3F 100%)",
  Saturn: "linear-gradient(45deg, #DAA520 0%, #F4D03F 50%, #DAA520 100%)",
  Uranus: "linear-gradient(45deg, #5B92E5 0%, #89CFF0 50%, #5B92E5 100%)",
  Neptune: "linear-gradient(45deg, #2E4B8E 0%, #4169E1 50%, #2E4B8E 100%)"
};

export const planetTextures = {
  Earth: `
    radial-gradient(circle at 50% 50%, 
      rgba(255,255,255,0.1) 0%, 
      transparent 20%,
      rgba(0,100,200,0.2) 30%,
      rgba(0,150,0,0.1) 60%,
      transparent 100%
    )
  `,
  Mars: `
    radial-gradient(circle at 30% 50%,
      rgba(255,255,255,0.1) 0%,
      rgba(156,46,14,0.2) 40%,
      rgba(211,95,95,0.1) 70%,
      transparent 100%
    )
  `,
  Jupiter: `
    repeating-linear-gradient(
      45deg,
      rgba(232,185,138,0.1) 0%,
      rgba(166,123,91,0.2) 10%,
      rgba(128,91,63,0.1) 20%
    )
  `,
  Saturn: `
    linear-gradient(
      45deg,
      rgba(218,165,32,0.2) 0%,
      rgba(244,208,63,0.1) 50%,
      rgba(218,165,32,0.2) 100%
    )
  `
};

export const planetRings = {
  Saturn: {
    innerRadius: 120,
    outerRadius: 160,
    rotation: -20,
    gradient: "linear-gradient(90deg, transparent 0%, rgba(244,208,63,0.3) 50%, transparent 100%)"
  }
};