import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/planets", async (_req, res) => {
    const planets = [
      {
        id: 1,
        name: "Mercury",
        description: "The smallest and innermost planet in the Solar System.",
        diameter: 4879,
        distanceFromSun: 57.9,
        orbitalPeriod: 88,
        imageUrl: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e",
        order: 1
      },
      {
        id: 2,
        name: "Venus",
        description: "Second planet from the Sun and Earth's closest planetary neighbor.",
        diameter: 12104,
        distanceFromSun: 108.2,
        orbitalPeriod: 225,
        imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
        order: 2
      },
      {
        id: 3,
        name: "Earth",
        description: "Our home planet and the only known planet to harbor life.",
        diameter: 12742,
        distanceFromSun: 149.6,
        orbitalPeriod: 365,
        imageUrl: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5",
        order: 3
      },
      {
        id: 4,
        name: "Mars",
        description: "The Red Planet, known for its iron-rich soil and potential for human exploration.",
        diameter: 6779,
        distanceFromSun: 227.9,
        orbitalPeriod: 687,
        imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6",
        order: 4
      },
      {
        id: 5,
        name: "Jupiter",
        description: "The largest planet in our Solar System with a prominent system of bands and swirls.",
        diameter: 139820,
        distanceFromSun: 778.5,
        orbitalPeriod: 4333,
        imageUrl: "https://images.unsplash.com/photo-1614732484003-ef9881555dc3",
        order: 5
      },
      {
        id: 6,
        name: "Saturn",
        description: "Famous for its spectacular ring system made of ice particles and rock.",
        diameter: 116460,
        distanceFromSun: 1434,
        orbitalPeriod: 10759,
        imageUrl: "https://images.unsplash.com/photo-1614314169000-4cf229a1db33",
        order: 6
      },
      {
        id: 7,
        name: "Uranus",
        description: "An ice giant with a tilted axis of rotation of nearly 98 degrees.",
        diameter: 50724,
        distanceFromSun: 2871,
        orbitalPeriod: 30687,
        imageUrl: "https://images.unsplash.com/photo-1614728423169-3f65fd722b7e",
        order: 7
      },
      {
        id: 8,
        name: "Neptune",
        description: "The windiest planet with the strongest sustained winds of any planet.",
        diameter: 49244,
        distanceFromSun: 4495,
        orbitalPeriod: 60190,
        imageUrl: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4",
        order: 8
      }
    ];
    
    res.json(planets);
  });

  const httpServer = createServer(app);
  return httpServer;
}
