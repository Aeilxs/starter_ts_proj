const fs = require("fs");
const path = require("path");

const log = (msg) => console.log("[copyStaticFiles] " + msg);

const files = ["html/index.html", "html/styles.css"];
const dist_dir = "dist";

if (!fs.existsSync(dist_dir)) {
  fs.mkdirSync(dist_dir);
}

files.forEach((file) => {
  const destPath = path.join(dist_dir, path.basename(file));
  fs.copyFileSync(file, destPath);
  log(`Copied ${file} to ${destPath}`);
});
