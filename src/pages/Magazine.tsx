import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import media from "../content/final-media.json";
import { useWheelStep } from "../components/useWheelStep";

const pages = media.magazine;
const singlePageQuery = "(max-width: 700px)";
const spreadStarts = [
  0,
  ...pages.flatMap((_, index) => (index % 2 ? [index] : [])),
];
const chapters = [
  [0, "Cover"],
  [3, "The firm"],
  [5, "Meet the team"],
  [19, "Headquarters"],
  [21, "Residential projects"],
  [27, "Commercial projects"],
  [31, "The studio mark"],
] as const;

function Sheet({
  index,
  decorative = false,
}: {
  index?: number;
  decorative?: boolean;
}) {
  const page = index === undefined ? undefined : pages[index];
  return page ? (
    <img
      {...page}
      alt={
        decorative
          ? ""
          : "Asterisk Design Studio magazine, page " + (index! + 1)
      }
      decoding="async"
      draggable={false}
    />
  ) : null;
}

export default function Magazine() {
  const [single, setSingle] = useState(
    () => matchMedia(singlePageQuery).matches,
  );
  const [page, setPage] = useState(0);
  const [turn, setTurn] = useState<{ direction: number; to: number } | null>(
    null,
  );
  const reduced = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; id: number } | null>(null);
  const starts = single ? pages.map((_, index) => index) : spreadStarts;
  const start = single || page === 0 || page % 2 === 1 ? page : page - 1;
  const position = starts.indexOf(start);
  const currentLeft = single || start === 0 ? undefined : start;
  const currentRight = single || start === 0 ? start : start + 1;
  const destination = turn?.to ?? start;
  const nextLeft = single || destination === 0 ? undefined : destination;
  const nextRight = single || destination === 0 ? destination : destination + 1;
  const forward = turn?.direction === 1;

  useEffect(() => {
    const query = matchMedia(singlePageQuery);
    const onChange = () => {
      setSingle(query.matches);
      setTurn(null);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const neighboringPages = single
      ? [start - 1, start + 1]
      : [start - 2, start - 1, start + 1, start + 2, start + 3];
    for (const index of neighboringPages) {
      if (pages[index]) new Image().src = pages[index].src;
    }
  }, [start, single]);

  function step(direction: number) {
    const to = starts[position + direction];
    if (to === undefined) return false;
    if (turn) return true;
    if (reduced) setPage(to);
    else setTurn({ direction, to });
    return true;
  }

  useWheelStep(stage, step);

  return (
    <div className="magazine-page">
      <section className="page-heading">
        <div className="page-title-row">
          <h1>
            Studio magazine<span className="title-period">.</span>
          </h1>
          <div>
            <p>The firm, its headquarters, and its notable works in print.</p>
            <a
              className="text-link"
              href="/edition/asterisk-magazine.html"
              target="_blank"
              rel="noreferrer"
            >
              Open original flipbook
            </a>
          </div>
        </div>
      </section>
      <section className="magazine-reader" aria-label="Magazine flipbook">
        <div className="magazine-controls">
          <select
            aria-label="Jump to a chapter"
            value=""
            onChange={(event) => {
              setTurn(null);
              setPage(Number(event.target.value));
            }}
          >
            <option value="" disabled>
              Jump to a chapter
            </option>
            {chapters.map(([index, title]) => (
              <option value={index} key={index}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div
          className="book-stage"
          ref={stage}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              step(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
          onPointerDown={(event) => {
            if (
              !event.isPrimary ||
              event.button !== 0 ||
              (event.target as Element).closest("button")
            )
              return;
            drag.current = {
              x: event.clientX,
              y: event.clientY,
              id: event.pointerId,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
          onPointerUp={(event) => {
            const from = drag.current;
            drag.current = null;
            if (!from || from.id !== event.pointerId) return;
            const dx = event.clientX - from.x;
            const dy = event.clientY - from.y;
            if (Math.abs(dx) >= 38 && Math.abs(dx) > Math.abs(dy))
              step(dx < 0 ? 1 : -1);
          }}
        >
          <div
            className="book-pages"
            data-single={single}
            data-cover={destination === 0}
            data-back-cover={!single && nextRight >= pages.length}
          >
            {!single && (
              <div className="book-page book-left">
                <Sheet index={turn && !forward ? nextLeft : currentLeft} />
              </div>
            )}
            <div className="book-page book-right">
              <Sheet
                index={turn && (forward || single) ? nextRight : currentRight}
              />
            </div>
            {!single &&
              currentLeft !== undefined &&
              currentRight < pages.length && (
                <div className="book-gutter" aria-hidden="true" />
              )}
            {turn && (
              <div
                className="book-leaf"
                data-direction={forward ? "forward" : "backward"}
                aria-hidden="true"
                onAnimationEnd={() => {
                  setPage(turn.to);
                  setTurn(null);
                }}
              >
                <div className="book-face book-front">
                  <Sheet
                    index={forward || single ? currentRight : nextRight}
                    decorative
                  />
                </div>
                <div className="book-face book-back">
                  <Sheet index={forward ? nextLeft : currentLeft} decorative />
                </div>
              </div>
            )}
          </div>
          <button
            className="book-arrow book-prev"
            type="button"
            aria-label="Previous page"
            disabled={position === 0}
            onClick={() => step(-1)}
          >
            ‹
          </button>
          <button
            className="book-arrow book-next"
            type="button"
            aria-label="Next page"
            disabled={position === starts.length - 1}
            onClick={() => step(1)}
          >
            ›
          </button>
          <span className="visually-hidden" role="status">
            Page {start + 1} of {pages.length}
          </span>
        </div>
      </section>
    </div>
  );
}
