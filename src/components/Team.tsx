import { Reveal, SectionLabel } from "./UI";
import { team } from "../content/site";
import media from "../content/final-media.json";
export function Team() {
  return (
    <section className="team-section" id="team" aria-labelledby="team-heading">
      <Reveal>
        <div className="section-top">
          <SectionLabel number="05">The people</SectionLabel>
        </div>
        <div className="section-heading">
          <h2 id="team-heading">
            Meet the team<span className="title-period">.</span>
          </h2>
        </div>
      </Reveal>
      <div className="team-profiles">
        {team.map((person, index) => (
          <Reveal
            key={person.id}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <article
              className="team-card"
              aria-labelledby={`team-${person.id}`}
            >
              <img
                className="team-portrait"
                {...media.portraits[person.id]}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="team-caption">
                <h3 id={`team-${person.id}`}>{person.name}</h3>
                <span>{person.role}</span>
                <p>{person.bio}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
