const fs = require("fs");
const path = require("path");

const buildDir = path.resolve(__dirname, "..", "build");
const indexPath = path.join(buildDir, "index.html");

const routes = [
  "about",
  "academics",
  "faculty",
  "gallery",
  "news",
  "events",
  "achievements",
  "admissions",
  "contact",
  "admin/login",
  "admin/dashboard",
];

if (!fs.existsSync(indexPath)) {
  console.error("Build folder missing. Run `npm run build` first.");
  process.exit(1);
}

for (const route of routes) {
  const routeDir = path.join(buildDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.copyFileSync(indexPath, path.join(routeDir, "index.html"));
}

fs.copyFileSync(indexPath, path.join(buildDir, "404.html"));
console.log(`Created static route pages for ${routes.length} routes.`);
