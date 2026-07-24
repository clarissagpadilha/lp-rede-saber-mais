import { statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  {
    input: "public/images/hero/hero-background.png",
    output: "public/images/hero/hero-background.webp",
    width: 1536,
  },
  {
    input: "public/images/sections/family.png",
    output: "public/images/sections/family.webp",
    width: 960,
  },
];

async function main() {
  const sharp = (await import("sharp")).default;

  for (const target of targets) {
    const inputPath = join(root, target.input);
    const outputPath = join(root, target.output);

    try {
      statSync(inputPath);
    } catch {
      console.warn(`Skipping missing file: ${target.input}`);
      continue;
    }

    await sharp(inputPath)
      .resize(target.width, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath);

    console.log(`Optimized ${target.input} -> ${target.output}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
