import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export function HomeLink({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  const location = useLocation();
  return (
    <Link
      to="/"
      className={className}
      aria-label={label}
      aria-current={location.pathname === "/" ? "page" : undefined}
      onClick={(event) => {
        if (
          location.pathname === "/" &&
          event.button === 0 &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey
        ) {
          window.scrollTo({ top: 0, behavior: "instant" });
          document.getElementById("main")?.focus({ preventScroll: true });
        }
      }}
    >
      {children}
    </Link>
  );
}
