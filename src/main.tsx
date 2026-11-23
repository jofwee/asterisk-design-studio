import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Home } from "./pages/Home";
import { Arrow } from "./components/UI";
import { HomeLink } from "./components/HomeLink";
import assets from "./content/assets.json";
import { projectName } from "./content/site";
import { portfolio } from "./content/portfolio";
import {
  preloadPage,
  prepareFonts,
  readyPages,
  warmPage,
} from "./app/pageLoading";
import {
  PageTransition,
  PagePending,
  LoadingBar,
} from "./components/PageTransition";
import "./styles.css";

const EmptyPage = () => null;

function ThemeToggle() {
  const [theme, setTheme] = useState(
    document.documentElement.dataset.theme || "dark",
  );
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#202b3b" : "#e8d8c9");
    try {
      localStorage.setItem("asterisk-theme", next);
    } catch {
      /* Theme still works without persistence. */
    }
    setTheme(next);
  };
  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="theme-symbol" aria-hidden="true">
        {theme === "dark" ? "☼" : "◐"}
      </span>
      <span className="theme-label">{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const links = menu.current?.querySelectorAll<HTMLAnchorElement>("a");
    links?.[0]?.focus();
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab" && links?.length) {
        if (e.shiftKey && document.activeElement === links[0]) {
          e.preventDefault();
          trigger.current?.focus();
        } else if (!e.shiftKey && document.activeElement === trigger.current) {
          e.preventDefault();
          links[0].focus();
        } else if (
          !e.shiftKey &&
          document.activeElement === links[links.length - 1]
        ) {
          e.preventDefault();
          trigger.current?.focus();
        } else if (e.shiftKey && document.activeElement === trigger.current) {
          e.preventDefault();
          links[links.length - 1].focus();
        }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", keydown);
    };
  }, [open]);
  return (
    <header className="site-header" onPointerOver={warmPage} onFocus={warmPage}>
      <HomeLink className="brand" label="Asterisk Design Studio home">
        <span
          className="brand-mark"
          style={{ maskImage: `url("${assets.logo}")` }}
          aria-hidden="true"
        />
      </HomeLink>
      <nav className="desktop-nav" aria-label="Main navigation">
        <HomeLink>Home</HomeLink>
        {["Projects", "About", "Magazine", "Contact"].map((label) => (
          <NavLink key={label} to={`/${label.toLowerCase()}`}>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="header-tools">
        <HomeLink className="mobile-home-link">Home</HomeLink>
        <ThemeToggle />
        <button
          ref={trigger}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </div>
      {open && (
        <nav
          ref={menu}
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobile navigation"
          onClick={(event) => {
            if ((event.target as Element).closest("a")) setOpen(false);
          }}
        >
          <HomeLink>
            <span>00</span>Home
            <Arrow />
          </HomeLink>
          {["Projects", "About", "Magazine", "Contact"].map((label, i) => (
            <NavLink key={label} to={`/${label.toLowerCase()}`}>
              <span>0{i + 1}</span>
              {label}
              <Arrow />
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

class PageError extends React.Component<
  { children: React.ReactNode; onFailure?: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    delete document.documentElement.dataset.routeTransition;
    document.documentElement.dataset.page = "inner";
    this.props.onFailure?.();
  }
  render() {
    return this.state.failed ? (
      <section className="page-heading">
        <h1>Page unavailable</h1>
        <button className="text-link" onClick={() => window.location.reload()}>
          Retry <Arrow />
        </button>
      </section>
    ) : (
      this.props.children
    );
  }
}

function Site() {
  const location = useLocation();
  const [displayedLocation, setDisplayedLocation] = useState<
    typeof location | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [viewVersion, setViewVersion] = useState(0);
  const [loadError, setLoadError] = useState<unknown>();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (displayedLocation?.pathname === location.pathname) {
      delete root.dataset.routeTransition;
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    root.dataset.routeTransition = "true";
    window.dispatchEvent(new Event("asterisk:freeze-page"));
    setLoading(true);
    setLoadError(undefined);
    let current = true;
    Promise.all([preloadPage(location.pathname), prepareFonts()]).then(
      () => {
        if (current) {
          setDisplayedLocation(location);
          setViewVersion((value) => value + 1);
        }
      },
      (error) => {
        if (current) {
          setLoadError(error);
          setDisplayedLocation(location);
          setViewVersion((value) => value + 1);
        }
      },
    );
    return () => {
      current = false;
    };
  }, [location.pathname]);
  useLayoutEffect(() => {
    if (!loading && displayedLocation) {
      const anchor = document.getElementById(displayedLocation.hash.slice(1));
      (anchor ?? document.getElementById("main"))?.focus({
        preventScroll: true,
      });
    }
  }, [loading, viewVersion]);
  const Projects = readyPages.projects ?? EmptyPage;
  const Project = readyPages.project ?? EmptyPage;
  const About = readyPages.about ?? EmptyPage;
  const Contact = readyPages.contact ?? EmptyPage;
  const Magazine = readyPages.magazine ?? EmptyPage;
  useEffect(() => {
    const name =
      location.pathname === "/"
        ? "Home"
        : location.pathname.startsWith("/projects/")
          ? (portfolio.find(
              (project) =>
                project.slug ===
                location.pathname.split("/").filter(Boolean).at(-1),
            )?.title ??
            (location.pathname.replace(/\/$/, "") === "/projects/project-01"
              ? projectName
              : "Project not found"))
          : location.pathname.slice(1).replace(/^./, (c) => c.toUpperCase());
    document.title = `${name} — Asterisk Design Studio`;
  }, [location.pathname]);
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {loading && <LoadingBar key="page-loading" />}
      </AnimatePresence>
      {!reduced && !loading && (
        <m.div
          className="reading-progress"
          style={{ scaleX: scrollYProgress }}
          aria-hidden="true"
        />
      )}
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        inert={loading && displayedLocation !== null}
        aria-busy={loading}
        onPointerOver={warmPage}
        onFocus={warmPage}
      >
        {!displayedLocation && <PagePending />}
        <AnimatePresence mode="wait">
          {displayedLocation && (
            <PageError key={viewVersion} onFailure={() => setLoading(false)}>
              <PageTransition
                pathname={displayedLocation.pathname}
                hash={displayedLocation.hash}
                error={loadError}
                onReady={() => setLoading(false)}
              >
                <Routes location={displayedLocation}>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:slug" element={<Project />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/magazine" element={<Magazine />} />
                  <Route
                    path="*"
                    element={
                      <section className="page-heading">
                        <p className="eyebrow">404</p>
                        <h1>Page not found</h1>
                        <Link className="text-link" to="/">
                          Back to home <Arrow />
                        </Link>
                      </section>
                    }
                  />
                </Routes>
              </PageTransition>
            </PageError>
          )}
        </AnimatePresence>
      </main>
      <footer
        className="site-footer"
        onPointerOver={warmPage}
        onFocus={warmPage}
      >
        <HomeLink className="footer-name">Asterisk Design Studio</HomeLink>
        <nav aria-label="Footer navigation">
          <HomeLink>Home</HomeLink>
          <Link to="/projects">Projects</Link>
          <Link to="/about">About</Link>
          <Link to="/magazine">Magazine</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <button
          className="back-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: reduced ? "instant" : "smooth",
            })
          }
        >
          Back to top <Arrow up />
        </button>
      </footer>
    </LazyMotion>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  </React.StrictMode>,
);
