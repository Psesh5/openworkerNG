import { useEffect, useState } from "react";
import { useThemePref } from "../theme";

// One-click Light ⇄ Dark in the sidebar header (Desk theme). Settings ▸ General keeps the
// full Light / Dark / Auto choice; this flips whatever is showing now and pins it, and the
// two stay in sync through src/theme.ts.
export function ThemeToggle() {
  const [pref, setPref] = useThemePref();
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === "dark");
  useEffect(() => {
    // Auto follows the system; re-read what is actually applied whenever the pref changes.
    setDark(document.documentElement.dataset.theme === "dark");
    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    const sync = () => setDark(document.documentElement.dataset.theme === "dark");
    media?.addEventListener("change", sync);
    return () => media?.removeEventListener("change", sync);
  }, [pref]);
  const label = dark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button
      className="w-7 h-7 grid place-items-center rounded-md text-faint hover:text-ink hover:bg-chromeHover shrink-0"
      title={label}
      aria-label={label}
      data-testid="theme-toggle"
      onClick={() => setPref(dark ? "light" : "dark")}
    >
      {dark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
        </svg>
      )}
    </button>
  );
}
