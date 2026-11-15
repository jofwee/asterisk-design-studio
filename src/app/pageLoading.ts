import type { ComponentType, SyntheticEvent } from "react";

type PageModule = { default: ComponentType };
export const readyPages: Partial<
  Record<"projects" | "project" | "about" | "contact", ComponentType>
> = {};
function cached(
  name: keyof typeof readyPages,
  load: () => Promise<PageModule>,
) {
  let pending: Promise<PageModule> | undefined;
  return () =>
    (pending ??= load()
      .then((module) => {
        readyPages[name] = module.default;
        return module;
      })
      .catch((error) => {
        pending = undefined;
        throw error;
      }));
}

export const pageLoaders = {
  projects: cached("projects", () => import("../pages/Projects")),
  project: cached("project", () => import("../pages/Project")),
  about: cached("about", () => import("../pages/About")),
  contact: cached("contact", () => import("../pages/Contact")),
};

export function preloadPage(pathname: string): Promise<unknown> {
  if (pathname === "/projects") return pageLoaders.projects();
  if (pathname.startsWith("/projects/")) return pageLoaders.project();
  if (pathname === "/about") return pageLoaders.about();
  if (pathname === "/contact") return pageLoaders.contact();
  return Promise.resolve();
}

let fontsReady: Promise<unknown> | undefined;
export function prepareFonts() {
  return (fontsReady ??= Promise.all([
    document.fonts.load('400 16px "Manrope Variable"'),
    document.fonts.load('500 16px "Barlow Condensed"'),
  ])
    .then(() => document.fonts.ready)
    .catch(() => undefined));
}

export function warmPage(event: SyntheticEvent) {
  const anchor = (event.target as Element).closest?.("a[href]");
  if (
    !(anchor instanceof HTMLAnchorElement) ||
    anchor.origin !== window.location.origin
  )
    return;
  void preloadPage(anchor.pathname).catch(() => {
    /* Navigation presents a recoverable error if loading fails. */
  });
}
