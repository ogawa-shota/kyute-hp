"use client";

import { useEffect } from "react";
import { mountLp } from "./lp-runtime";

export default function LpRuntime() {
  useEffect(() => {
    const root = document.getElementById("documentary-lp");
    if (root) return mountLp(root);
  }, []);
  return null;
}
