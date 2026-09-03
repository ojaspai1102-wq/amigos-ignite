const fs = require("fs");

let html = fs.readFileSync("index.html", "utf8");
const image = fs.readFileSync("public/careermitra-hero.png").toString("base64");
const config = fs.readFileSync("supabase-config.js", "utf8");

html = html
  .split("public/careermitra-hero.png")
  .join("data:image/png;base64," + image)
  .split("public/og.png")
  .join("")
  .replace('<script src="supabase-config.js"></script>', `<script>${config}</script>`);

fs.writeFileSync("careermitra-github.html", html);
