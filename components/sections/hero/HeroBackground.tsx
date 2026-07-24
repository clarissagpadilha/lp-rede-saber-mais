import Image from "next/image";

import { heroContent } from "@/content/hero";

/**
 * PNG em alta resolução (2x–3x), servido sem recompressão do otimizador do Next.js.
 */
export function HeroBackground() {
  const { background, mobileBackground } = heroContent;

  return (
    <>
      {/* Mobile e tablet (<1024px) — 1455×3072 (3× retina) */}
      <div aria-hidden className="absolute inset-0 lg:hidden">
        <Image
          src={mobileBackground.src}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 from-0% via-white/88 via-[22%] to-transparent to-[48%] max-sm:block sm:hidden" />
        <div className="absolute inset-0 hidden bg-gradient-to-b from-[#0A1B33]/35 from-0% via-white/78 via-[28%] to-white/10 to-[55%] sm:block" />
      </div>

      {/* Notebook e desktop (≥1024px) — 2560×1280 (2.5×) */}
      <div aria-hidden className="absolute inset-0 hidden lg:block">
        <Image
          src={background.src}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[100%_50%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/88 from-0% via-white/65 via-[32%] to-transparent to-[42%]" />
      </div>
    </>
  );
}
