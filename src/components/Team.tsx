import { Reveal, SectionLabel } from "./UI";
import { team } from "../content/site";
export function Team() {
  return (
    <section className="team-section" id="team">
      <Reveal>
        <div className="section-top">
          <SectionLabel number="05">The people</SectionLabel>
        </div>
        <div className="section-heading">
          <h2>
            Meet the team<span className="title-period">.</span>
          </h2>
        </div>
      </Reveal>
      <div className="team-grid">
        {team.map((person, index) => (
          <Reveal key={person.id} delay={index * 0.08}>
            <article className="team-card">
              <div
                className="portrait-placeholder"
                role="img"
                aria-label={`Portrait placeholder for ${person.name}`}
              >
                <span className="portrait-index">{person.id}</span>
                <span className="portrait-center">
                  <span aria-hidden="true">+</span>Portrait
                </span>
                <span className="portrait-foot">Image to be added</span>
              </div>
              <div className="team-caption">
                <h3>{person.name}</h3>
                <span>{person.role}</span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
