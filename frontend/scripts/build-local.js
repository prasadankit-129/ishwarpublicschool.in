const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const cracoBin = require.resolve("@craco/craco/dist/bin/craco");

const env = { ...process.env };
delete env.PUBLIC_URL;
delete env.REACT_APP_BASENAME;

console.log("Building local preview with / as the base path...");
fs.rmSync(path.join(rootDir, "build"), { recursive: true, force: true });

const run = (command, args) => {
  const result = spawnSync(command, args, {
    cwd: rootDir,
    env,
    stdio: "inherit",
    shell: false,
  });

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
};

run(process.execPath, [cracoBin, "build"]);
run(process.execPath, [path.join(__dirname, "create-route-pages.js")]);
