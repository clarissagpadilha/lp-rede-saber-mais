"use client";

import { cn } from "@/lib/utils";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  startSeconds?: number;
  className?: string;
};

export function YouTubeEmbed({ videoId, title, startSeconds = 0, className }: YouTubeEmbedProps) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    start: String(startSeconds),
    rel: "0",
    modestbranding: "1",
    iv_load_policy: "3",
    controls: "1",
    playsinline: "1",
    loop: "1",
    playlist: videoId,
    fs: "0",
    disablekb: "1",
  });

  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-[20px] bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <iframe
        src={embedSrc}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="pointer-events-auto absolute top-[-14%] left-0 h-[128%] w-full border-0"
      />
    </div>
  );
}
