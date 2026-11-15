import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { m, useReducedMotion } from "motion/react";
import assets from "../content/assets.json";
import { copy, projectName } from "../content/site";

export type ImageId = keyof typeof assets.images;
export function Arrow({ up = false }: { up?: boolean }) {
  return (
    <svg
      className={up ? "arrow arrow-up" : "arrow"}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
export function ProjectImage({
  id,
  alt,
  eager = false,
  className = "",
  sizes = "(max-width: 700px) 100vw, 92vw",
}: {
  id: ImageId;
  alt: string;
  eager?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const image = assets.images[id];
  if (failed)
    return (
      <div
        className={`image-unavailable ${className}`}
        role="img"
        aria-label={alt}
      >
        Image
      </div>
    );
  const srcset = (format: "avif" | "webp") =>
    image[format].map((v) => `${v.url} ${v.width}w`).join(", ");
  return (
    <picture className={`project-image ${className}`}>
      <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
      <img
        src={image.webp[image.webp.length - 1].url}
        srcSet={srcset("webp")}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        onError={() => setFailed(true)}
      />
    </picture>
  );
}
export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "left",
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right";
  stagger?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {
          opacity: stagger ? 1 : 0,
          x: stagger ? 0 : direction === "left" ? -56 : 56,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: reduced ? 0 : 0.65,
            delay: reduced ? 0 : delay,
            staggerChildren: reduced ? 0 : 0.1,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </m.div>
  );
}
export function RevealItem({
  children,
  className = "",
  image = false,
  direction = "left",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  image?: boolean;
  direction?: "left" | "right";
  as?: "div" | "figure";
}) {
  const reduced = useReducedMotion();
  const Element = as === "figure" ? m.figure : m.div;
  return (
    <Element
      className={className}
      variants={{
        hidden: {
          opacity: reduced ? 1 : 0,
          x: reduced ? 0 : direction === "left" ? -64 : 64,
          ...(image && !reduced
            ? {
                clipPath:
                  direction === "left"
                    ? "inset(0% 22% 0% 0%)"
                    : "inset(0% 0% 0% 22%)",
              }
            : {}),
        },
        visible: {
          opacity: 1,
          x: 0,
          ...(image ? { clipPath: "inset(0% 0% 0% 0%)" } : {}),
          transition: {
            duration: reduced ? 0 : image ? 0.85 : 0.65,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </Element>
  );
}
export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}
export function ProjectCard({ eager = false }: { eager?: boolean }) {
  return (
    <Link className="project-card" to="/projects/project-01">
      <div className="project-card-image">
        <ProjectImage
          id="exterior"
          alt="Exterior architectural render of the studio building"
          eager={eager}
        />
        <span className="image-action">
          <Arrow />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <h2>{projectName}</h2>
          <span>Architectural visualization</span>
        </div>
        <div className="project-caption-meta">
          <span>Studio exterior</span>
          <span>05 views</span>
        </div>
      </div>
    </Link>
  );
}
export function ContactStrip() {
  return (
    <Reveal className="contact-strip">
      <SectionLabel number="06">Have a project in mind?</SectionLabel>
      <Link to="/contact" className="contact-title">
        Let’s talk
        <Arrow />
      </Link>
      <div className="contact-strip-bottom">
        <p>{copy.short}</p>
        <Link className="text-link" to="/contact">
          Contact <Arrow />
        </Link>
      </div>
    </Reveal>
  );
}
