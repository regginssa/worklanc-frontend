const fs = require("fs");
const path = require("path");

const nestedConnectorsDir = path.join(
  process.cwd(),
  "node_modules",
  "@reown",
  "appkit-adapter-wagmi",
  "node_modules",
  "@wagmi",
  "connectors",
);

if (!fs.existsSync(nestedConnectorsDir)) {
  return;
}

const pkgPath = path.join(nestedConnectorsDir, "package.json");
const version = JSON.parse(fs.readFileSync(pkgPath, "utf8")).version;

if (version !== "6.2.0") {
  fs.rmSync(nestedConnectorsDir, { recursive: true, force: true });
  console.log(
    `Removed incompatible nested @wagmi/connectors@${version} (expected 6.2.0)`,
  );
}
