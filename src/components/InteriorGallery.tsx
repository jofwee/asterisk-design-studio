import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import views from "../content/showcase.json";
import { Reveal } from "./UI";
import { useWheelStep } from "./useWheelStep";

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

const loop = [slides.at(-1)!, ...slides, slides[0]];
const last = slides.length;

function center(
  track: HTMLDivElement,
  index: number,
  behavior: ScrollBehavior,
) {
  const slide = track.children[index] as HTMLElement | undefined;
  if (!slide) return;
  track.scrollTo({
    left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
    behavior,
  });
}

export function InteriorGallery() {
  const track = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(1);
  const position = useRef(1);
  const target = useRef<number | null>(null);
  const settleTimer = useRef<number | undefined>(undefined);

  useLayoutEffect(() => {
    const element = track.current;
    if (!element) return;
    center(element, 1, "instant");
    let width = element.clientWidth;
    const resize = new ResizeObserver(() => {
      if (element.clientWidth === width) return;
      width = element.clientWidth;
      center(element, position.current, "instant");
    });
    resize.observe(element);
    return () => {
      resize.disconnect();
      window.clearTimeout(settleTimer.current);
    };
  }, []);

  function step(direction: number) {
    const element = track.current;
    if (!element) return false;
    if (target.current !== null) return true;
    const index = position.current + direction;
    if (index < 0 || index >= loop.length) return true;
    target.current = index;
    center(element, index, reducedMotion ? "instant" : "smooth");
    return true;
  }

  function scroll(element: HTMLDivElement) {
    const first = element.children[0] as HTMLElement;
    const second = element.children[1] as HTMLElement;
    const origin =
      first.offsetLeft - (element.clientWidth - first.offsetWidth) / 2;
    const index = Math.max(
      0,
      Math.min(
        last + 1,
        Math.round(
          (element.scrollLeft - origin) /
            (second.offsetLeft - first.offsetLeft),
        ),
      ),
    );
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(() => {
      const real = index === 0 ? last : index === last + 1 ? 1 : index;
      position.current = real;
      target.current = null;
      if (real !== index) center(element, real, "instant");
      setActive(real);
    }, 110);
  }

  useWheelStep(track, step, true);

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
      </Reveal>
      <div className="interior-carousel">
        <div
          className="interior-track"
          ref={track}
          role="region"
          aria-labelledby="interiors-heading"
          tabIndex={0}
          onPointerDown={() => {
            target.current = null;
          }}
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            if (step(event.key === "ArrowRight" ? 1 : -1))
              event.preventDefault();
          }}
          onScroll={(event) => scroll(event.currentTarget)}
        >
          {loop.map((slide, index) => {
            const clone = index === 0 || index === last + 1;
            const image = (
              <img
                src={slide.variants.at(-1)?.url}
                srcSet={slide.variants
                  .map(({ url, width }) => `${url} ${width}w`)
                  .join(", ")}
                sizes="(max-width: 700px) 85vw, 76vw"
                width={slide.width}
                height={slide.height}
                alt={clone ? "" : slide.alt}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            );
            return (
              <figure
                key={index}
                data-active={index === active}
                aria-hidden={clone || undefined}
              >
                {clone ? (
                  <div className="interior-frame">{image}</div>
                ) : (
                  <Link
                    className="interior-frame"
                    to={`/projects/project-01#${slide.id}`}
                    aria-label={`Open full-size render: ${slide.title}`}
                  >
                    {image}
                  </Link>
                )}
                <figcaption>{slide.title}</figcaption>
              </figure>
            );
          })}
        </div>
        <button
          className="book-arrow book-prev"
          type="button"
          aria-label="Previous"
          onClick={() => step(-1)}
        >
          ‹
        </button>
        <button
          className="book-arrow book-next"
          type="button"
          aria-label="Next"
          onClick={() => step(1)}
        >
          ›
        </button>
        <span className="visually-hidden" role="status">
          View {active} of {last}
        </span>
      </div>
    </section>
  );
}
