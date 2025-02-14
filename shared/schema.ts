import { pgTable, text, serial, numeric, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const planets = pgTable("planets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  diameter: numeric("diameter").notNull(),
  distanceFromSun: numeric("distance_from_sun").notNull(),
  orbitalPeriod: numeric("orbital_period").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull(),
});

export const insertPlanetSchema = createInsertSchema(planets);
export type InsertPlanet = z.infer<typeof insertPlanetSchema>;
export type Planet = typeof planets.$inferSelect;
