"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { useThemeStore } from "@/store/themeStore";

export default function ClientWrapper({ children }) {
  const [mounted, setMounted] = useState(false);
  const theme = useThemeStore((state) => state.theme);

  useLayoutEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return children;

  return children;
}