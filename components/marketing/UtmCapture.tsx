"use client";

import { useEffect } from "react";

import { initUtmCapture } from "@/lib/utm";

export function UtmCapture() {
  useEffect(() => {
    initUtmCapture();
  }, []);

  return null;
}
