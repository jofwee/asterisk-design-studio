import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import views from "../content/showcase.json";
import { Reveal } from "./UI";

const selections = [
  {
    id: "view-image-13",
    title: "Sunlit lounge",
    alt: "Timber seating and glazed walls beneath a slatted ceiling",
  },
  {
    id: "view-image-3",
    title: "Reception",
    alt: "Reception desk with the Asterisk emblem on the wall behind it",
  },
  {
    id: "view-image-2",
    title: "Workstations",
    alt: "Desks along a timber wall and a screen of vertical slats",
  },
  {
    id: "view-image-5",
    title: "Window-side seating",
    alt: "Seating beside full-height windows with trees outside",
  },
  {
    id: "view-image-11",
    title: "Meeting room",
    alt: "A white meeting table and chairs beside a slatted partition",
  },
  {
    id: "view-image-10",
    title: "Studio corridor",
    alt: "A long interior corridor with glazing along one side",
  },
];

const slides = selections.flatMap((selection) => {
  const view = views.find(({ id }) => id === selection.id);
  return view ? [{ ...view, ...selection }] : [];
});

export function InteriorGallery() {
  const track = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= 0.6),
      { threshold: 0.6 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function goTo(
    index: number,
    behavior: ScrollBehavior = reducedMotion ? "instant" : "smooth",
  ) {
    const element = track.current;
    const slide = element?.children[index] as HTMLElement | undefined;
    if (!element || !slide) return;
    element.scrollTo({ left: slide.offsetLeft, behavior });
  }

  useEffect(() => {
    if (paused || reducedMotion || !inView) return;
    const timer = window.setInterval(() => {
      if (document.hidden || document.querySelector("dialog[open]")) return;
      if (track.current?.matches(":hover, :focus-within")) return;
      goTo(
        (active + 1) % slides.length,
        active === slides.length - 1 ? "instant" : "smooth",
      );
    }, 5500);
    return () => window.clearInterval(timer);
  }, [active, inView, paused, reducedMotion]);

  function step(direction: number) {
    setPaused(true);
    goTo(Math.max(0, Math.min(slides.length - 1, active + direction)));
  }

  return (
    <section
      id="interiors"
      className="interior-section"
      aria-labelledby="interiors-heading"
    >
      <Reveal className="showcase-heading">
        <div>
          <span className="eyebrow">Inside Asterisk Design Studio</span>
          <h2 id="interiors-heading">
            Interior perspectives<span className="title-period">.</span>
          </h2>
        </div>
        <p>Swipe or scroll to explore the studio interiors.</p>
      </Reveal>
      <div
        className="interior-track"
        ref={track}
        role="region"
        aria-labelledby="interiors-heading"
        tabIndex={0}
        onPointerDown={() => setPaused(true)}
        onWheel={(event) => {
          if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey)
            setPaused(true);
        }}
        onKeyDown={(event) => {
          if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
            setPaused(true);
        }}
        onScroll={(event) => {
          const element = event.currentTarget;
          const first = element.children[0] as HTMLElement;
          const second = element.children[1] as HTMLElement;
          if (second)
            setActive(
              Math.round(
                element.scrollLeft / (second.offsetLeft - first.offsetLeft),
              ),
            );
        }}
      >
        {slides.map((slide) => (
          <figure key={slide.id}>
            <Link
              to={`/projects/project-01#${slide.id}`}
              aria-label={`Open full-size render: ${slide.title}`}
            >
              <img
                src={slide.variants.at(-1)?.url}
                srcSet={slide.variants
                  .map(({ url, width }) => `${url} ${width}w`)
                  .join(", ")}
                sizes="(max-width: 700px) 85vw, 76vw"
                width={slide.width}
                height={slide.height}
                alt={slide.alt}
                loading="lazy"
                decoding="async"
              />
            </Link>
            <figcaption>{slide.title}</figcaption>
          </figure>
        ))}
      </div>
      <div className="interior-controls">
        <span className="eyebrow">
          View {active + 1} of {slides.length}
        </span>
        <div className="interior-buttons">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={active === 0}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={active === slides.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
