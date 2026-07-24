import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/logo/logo-rede-saber-mais.png";
const LOGO_WIDTH = 211;
const LOGO_HEIGHT = 107;

type LogoProps = {
  className?: string;
  size?: "default" | "sm";
  theme?: "light" | "dark";
};

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      className={cn("h-8 w-auto shrink-0", className)}
      aria-hidden
    />
  );
}

export function Logo({ className, size = "default", theme = "light" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        theme === "dark"
          ? "focus-visible:outline-white"
          : "focus-visible:outline-brand-blue",
        className,
      )}
      aria-label={siteConfig.name}
    >
      <Image
        src={LOGO_SRC}
        alt={siteConfig.name}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className={cn("w-auto shrink-0", size === "sm" ? "h-8" : "h-10 sm:h-11")}
        priority
      />
    </Link>
  );
}
