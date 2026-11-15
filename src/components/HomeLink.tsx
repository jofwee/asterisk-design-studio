import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

export const HOME_REPLAY_EVENT = "asterisk:return-home";

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
      onClick={() => {
        if (location.pathname === "/") {
          window.scrollTo({ top: 0, behavior: "instant" });
          window.dispatchEvent(new Event(HOME_REPLAY_EVENT));
          document.getElementById("main")?.focus({ preventScroll: true });
        }
      }}
    >
      {children}
    </Link>
  );
}
