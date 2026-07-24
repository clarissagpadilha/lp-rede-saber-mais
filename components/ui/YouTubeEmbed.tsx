"use client";

import { Play } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  startSeconds?: number;
  className?: string;
};

export function YouTubeEmbed({ videoId, title, startSeconds = 0, className }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&start=${startSeconds}&rel=0&modestbranding=1`;

  if (playing) {
    return (
      <div className={cn("aspect-video overflow-hidden rounded-[20px] bg-black", className)}>
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="size-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Reproduzir vídeo: ${title}`}
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-[20px] bg-brand-navy text-left shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-brand-navy/25 transition-colors group-hover:bg-brand-navy/35" aria-hidden />
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <span className="flex size-16 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 sm:size-[4.5rem]">
          <Play className="ml-1 size-7 fill-white text-white sm:size-8" />
        </span>
      </span>
    </button>
  );
}
