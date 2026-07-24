import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const sharp = (await import("sharp")).default;

  const iconSource = join(root, "app/icon.png");
  if (!existsSync(iconSource)) {
    throw new Error("app/icon.png is required. Add a favicon source before running this script.");
  }

  await sharp(iconSource).resize(32, 32).png().toFile(join(root, "app/icon.png"));
  await sharp(iconSource).resize(180, 180).png().toFile(join(root, "app/apple-icon.png"));
  await sharp(iconSource).resize(32, 32).png().toFile(join(root, "public/favicon.ico"));

  const heroPath = join(root, "public/images/hero/hero-background.webp");
  const heroFallback = join(root, "public/images/hero/hero-background.png");
  const heroInput = existsSync(heroPath) ? heroPath : heroFallback;

  await sharp(heroInput)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 85 })
    .toFile(join(root, "public/images/social/og-rede-saber-mais.jpg"));

  console.log("SEO assets generated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
