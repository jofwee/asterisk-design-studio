import { studio } from "../content/site";
import { Reveal } from "./UI";
import media from "../content/final-media.json";

export function StudioStory() {
  return (
    <section
      id="studio"
      className="studio-story"
      aria-labelledby="studio-story-heading"
    >
      <div className="studio-story-grid">
        <Reveal>
          <span className="eyebrow">The firm</span>
          <h2 id="studio-story-heading">
            {studio.motto}
            <span className="title-period">.</span>
          </h2>
        </Reveal>
        <Reveal direction="right" className="studio-story-copy">
          <p>{studio.background}</p>
          <p>{studio.approach}</p>
        </Reveal>
      </div>
      <div className="studio-values">
        <Reveal>
          <h3>Mission</h3>
          <p>{studio.mission}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h3>Vision</h3>
          <p>{studio.vision}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function LogoStory() {
  return (
    <section
      id="logo-story"
      className="studio-story logo-story"
      aria-labelledby="logo-story-heading"
    >
      <div className="studio-story-grid">
        <Reveal className="logo-story-copy">
          <span className="eyebrow">The studio mark</span>
          <h2 id="logo-story-heading">
            The story of the asterisk<span className="title-period">.</span>
          </h2>
          <p>
            The founder chose the asterisk for its ability to stay relevant
            across eras and adapt to different uses. That versatility reflects
            the studio’s approach to architecture that adapts to people and
            place.
          </p>
        </Reveal>
        <Reveal direction="right">
          <figure className="logo-study">
            <img
              className="logo-study-art"
              {...media.logo}
              alt="Construction grid and five components of the Asterisk studio mark"
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <ul aria-label="Elements of the studio mark">
                {[
                  "Connectivity",
                  "Nature",
                  "Human",
                  "“A” / Roof",
                  "Asterisk",
                ].map((part) => (
                  <li key={part}>{part}</li>
                ))}
              </ul>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
