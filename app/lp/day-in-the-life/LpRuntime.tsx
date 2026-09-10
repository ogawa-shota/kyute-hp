"use client";

import { useEffect } from "react";
import { mountLp } from "./lp-runtime";
import { mountMotion } from "./lp-motion";

export default function LpRuntime() {
  useEffect(() => {
    const root = document.getElementById("documentary-lp");
    if (!root) return;
    const cleanMotion = mountMotion(root);
    const cleanLp = mountLp(root);
    return () => { cleanMotion(); cleanLp(); };
  }, []);
  return null;
}
