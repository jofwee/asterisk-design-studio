import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Arrow, ProjectImage } from "./UI";
import { imageNames } from "../content/site";
import { HOME_REPLAY_EVENT } from "./HomeLink";
const ease = [0.22, 1, 0.36, 1] as const;
export function Hero() {
  const [entrance, setEntrance] = useState(0);
  useEffect(() => {
    const replay = () => setEntrance((value) => value + 1);
    window.addEventListener(HOME_REPLAY_EVENT, replay);
    return () => window.removeEventListener(HOME_REPLAY_EVENT, replay);
  }, []);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  return (
    <section
      id="landing"
      ref={ref}
      className="landing-hero"
      aria-labelledby="hero-heading"
    >
      <m.div className="hero-visual" style={reduced ? undefined : { y, scale }}>
        <ProjectImage
          id="wide"
          className="landing-image"
          alt="Wide exterior render of the Asterisk Design Studio building"
          eager
          sizes="100vw"
        />
      </m.div>
      <div className="hero-shade" />
      <div key={entrance} className="hero-content">
        <h1
          id="hero-heading"
          className="hero-headline"
          aria-label="Asterisk Design Studio."
        >
          {["Asterisk", "Design Studio."].map((line, index) => (
            <span key={line} className="hero-line" aria-hidden="true">
              <m.span
                initial={reduced ? false : { y: "105%", rotate: 3 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{
                  duration: 1.05,
                  delay: 0.12 + index * 0.14,
                  ease,
                }}
              >
                {line}
              </m.span>
            </span>
          ))}
        </h1>
        <m.div
          className="hero-description"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.5, ease }}
        >
          <div className="hero-actions">
            <Link className="primary-link" to="/projects">
              Explore our work <Arrow />
            </Link>
            <Link className="hero-about-link" to="/about">
              Discover the studio <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </m.div>
      </div>
      <m.div
        className="hero-project-note"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
      >
        <span className="eyebrow">Featured perspective</span>
        <Link to="/projects/project-01" aria-label={`View ${imageNames.wide}`}>
          {imageNames.wide}
          <Arrow />
        </Link>
      </m.div>
      <div className="hero-bottomline">
        <a href="#projects" className="hero-scroll">
          <span className="scroll-track" aria-hidden="true">
            <span />
          </span>
          Scroll to explore
        </a>
        <span className="hero-medium">Architectural visualization</span>
        <span className="hero-count">
          <b>01</b>
          <span>/</span>05 views
        </span>
      </div>
    </section>
  );
}
