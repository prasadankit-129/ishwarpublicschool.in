const fs = require("fs");
const http = require("http");
const path = require("path");

const buildDir = path.resolve(__dirname, "..", "build");
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

if (!fs.existsSync(path.join(buildDir, "index.html"))) {
  console.error("Build folder missing. Run `npm run build` first.");
  process.exit(1);
}

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, `http://localhost:${port}`).pathname);
  const cleanPath = path
    .normalize(urlPath)
    .replace(/^(\.\.[/\\])+/, "")
    .replace(/^[/\\]/, "");
  const requestedPath = path.join(buildDir, cleanPath);
  const filePath =
    fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()
      ? requestedPath
      : path.join(buildDir, "index.html");

  response.setHeader("Content-Type", contentTypes[path.extname(filePath)] || "application/octet-stream");
  fs.createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`Preview server running at http://localhost:${port}`);
});
