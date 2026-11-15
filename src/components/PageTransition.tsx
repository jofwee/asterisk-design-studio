import { useLayoutEffect, type ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";

export function PageTransition({
  pathname,
  hash,
  onReady,
  error,
  children,
}: {
  pathname: string;
  hash: string;
  onReady: () => void;
  error?: unknown;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.page = pathname === "/" ? "home" : "inner";
    delete root.dataset.routeTransition;
    if (hash)
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, behavior: "instant" });
    onReady();
  }, [pathname]);
  if (error) throw error;
  return (
    <m.div
      initial={{
        opacity: reduced ? 1 : 0,
        y: reduced || pathname === "/" ? 0 : 8,
      }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: reduced ? 1 : 0,
        transition: { duration: reduced ? 0 : 0.08 },
      }}
      transition={{ duration: reduced ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
export function PagePending() {
  return <div className="page-pending" />;
}

export function LoadingBar() {
  const reduced = useReducedMotion();
  return (
    <m.div
      className="route-loading-bar"
      role="progressbar"
      aria-label="Loading page"
      aria-valuetext="Preparing the next page"
      initial={{ scaleX: reduced ? 0.75 : 0.06, opacity: 1 }}
      animate={{ scaleX: 0.88, opacity: 1 }}
      exit={{ scaleX: 1, opacity: 0 }}
      transition={{
        scaleX: { duration: reduced ? 0 : 0.85, ease: "easeOut" },
        opacity: { duration: reduced ? 0 : 0.1 },
      }}
    />
  );
}
