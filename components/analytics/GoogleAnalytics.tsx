"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initializeGoogleAnalytics } from "@/lib/analytics";

export function GoogleAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    initializeGoogleAnalytics(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, pathname);
  }, [pathname]);
  return null;
}
