"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/store/themeStore";

export default function ClientWrapper({ children }) {
  const [mounted, setMounted] = useState(false);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    setMounted(true);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (!mounted) return null; 

  return <>{children}</>;
}