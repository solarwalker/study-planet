// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
async function registerRoutes(app2) {
  app2.get("/api/planets", async (_req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [react(), runtimeErrorOverlay(), themePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const PORT = 5e3;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
