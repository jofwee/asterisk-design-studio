import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import views from "../content/showcase.json";

const project = "/projects/project-01";
const priorityCount = 6;

export function RenderGallery({
  projectPage = false,
  children,
}: {
  projectPage?: boolean;
  children?: (openGallery: () => void) => ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("All views");
  const [thumbnailStates, setThumbnailStates] = useState<
    Partial<Record<string, "ready" | "failed">>
  >({});
  const pictures = views.filter(
    (view) => filter === "All views" || view.group === filter,
  );
  const openGallery = () => {
    dialog.current?.showModal();
    setIsOpen(true);
  };
  const closeGallery = () => dialog.current?.close();
  const pending = pictures
    .slice(0, priorityCount)
    .some((view) => !thumbnailStates[view.id]);
  const settleThumbnail = (id: string, state: "ready" | "failed") => {
    setThumbnailStates((current) =>
      current[id] === state ? current : { ...current, [id]: state },
    );
  };

  return (
    <>
      <button
        type="button"
        className="gallery-trigger"
        onClick={openGallery}
        aria-haspopup="dialog"
      >
        Open render gallery <span>{views.length} views</span>
      </button>
      <dialog
        ref={dialog}
        className="gallery-dialog"
        aria-labelledby={headingId}
        onClose={() => setIsOpen(dialog.current?.open ?? false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeGallery();
        }}
      >
        <div className="gallery-panel">
          <div className="gallery-toolbar">
            <div className="showcase-heading">
              <h2 id={headingId}>Render gallery</h2>
              <button
                type="button"
                className="gallery-close"
                onClick={closeGallery}
                autoFocus
              >
                Close
              </button>
            </div>
            <div
              className="gallery-filters"
              role="group"
              aria-label="Filter renders"
            >
              {["All views", "Exteriors", "Interiors"].map((group) => (
                <button
                  key={group}
                  type="button"
                  aria-pressed={filter === group}
                  onClick={() => {
                    setFilter(group);
                    dialog.current?.scrollTo({ top: 0, behavior: "instant" });
                  }}
                >
                  {group}
                </button>
              ))}
            </div>
            <div className="gallery-progress">
              {isOpen && pending && (
                <span role="status" aria-label="Loading gallery previews" />
              )}
            </div>
          </div>
          <div className="showcase-thumbnails">
            {isOpen &&
              pictures.map((view, index) => {
                const state = thumbnailStates[view.id];
                const style = {
                  "--tile-delay": `${Math.min(index, 7) * 24}ms`,
                } as CSSProperties;
                const thumbnail = (
                  <>
                    <div
                      className="gallery-thumbnail"
                      data-state={state ?? "loading"}
                    >
                      {state === "failed" ? (
                        <span className="gallery-thumbnail-fallback">
                          Preview unavailable
                        </span>
                      ) : (
                        <img
                          src={view.variants[0].url}
                          alt=""
                          width="320"
                          height="208"
                          loading={index < priorityCount ? "eager" : "lazy"}
                          decoding="async"
                          onLoad={() => settleThumbnail(view.id, "ready")}
                          onError={() => settleThumbnail(view.id, "failed")}
                        />
                      )}
                    </div>
                    <span>{view.name}</span>
                  </>
                );
                const hash = "#" + view.id;
                return projectPage ? (
                  <a
                    key={view.id}
                    href={hash}
                    onClick={closeGallery}
                    style={style}
                  >
                    {thumbnail}
                  </a>
                ) : (
                  <Link
                    key={view.id}
                    to={project + hash}
                    onClick={closeGallery}
                    style={style}
                  >
                    {thumbnail}
                  </Link>
                );
              })}
          </div>
        </div>
      </dialog>
      {children?.(openGallery)}
    </>
  );
}

export function ShowcaseViews({
  onOpenGallery,
}: {
  onOpenGallery: () => void;
}) {
  return (
    <div className="showcase-views">
      {views.map((view) => (
        <figure
          className="showcase-view"
          key={view.id}
          id={view.id}
          tabIndex={-1}
        >
          <img
            src={view.variants.at(-1)?.url}
            srcSet={view.variants
              .map(({ url, width }) => `${url} ${width}w`)
              .join(", ")}
            sizes="(max-width: 700px) 90vw, (max-width: 1280px) 88vw, 1120px"
            alt={`${view.group === "Interiors" ? "Interior" : "Exterior"} architectural render, ${view.name}`}
            width={view.width}
            height={view.height}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <span>
              {view.name} · {view.group}
            </span>
            <button type="button" onClick={onOpenGallery}>
              Back to gallery
            </button>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

// Replace this URL with the hosted MP4 when the walkthrough moves to Cloudflare.
const walkthroughUrl = "/images/studio-walkthrough-v1.mp4";

export function Walkthrough() {
  const [playing, setPlaying] = useState(false);
  const poster = views
    .find((view) => view.name === "Scene 6.png")
    ?.variants.at(-1)?.url;
  return (
    <section
      className="walkthrough-section"
      id="walkthrough"
      aria-labelledby="walkthrough-heading"
    >
      <div className="showcase-heading">
        <div>
          <span className="eyebrow">The studio in motion</span>
          <h2 id="walkthrough-heading">Exterior walkthrough</h2>
        </div>
        <span className="eyebrow">1 min 03 sec</span>
      </div>
      {playing ? (
        <video
          src={walkthroughUrl}
          poster={poster}
          controls
          autoPlay
          playsInline
          muted
          aria-labelledby="walkthrough-heading"
        >
          <a href={walkthroughUrl}>Download the walkthrough</a>
        </video>
      ) : (
        <button
          type="button"
          className="walkthrough-cover"
          onClick={() => setPlaying(true)}
        >
          <img
            src={poster}
            alt=""
            width="1440"
            height="810"
            loading="lazy"
            decoding="async"
          />
          <span className="walkthrough-play">
            <span aria-hidden="true">▶︎</span> Play walkthrough
          </span>
        </button>
      )}
    </section>
  );
}
