import { Reveal, SectionLabel, Arrow } from "./UI";
import { copy } from "../content/site";
export function Services() {
  return (
    <section id="services" className="services-section">
      <Reveal>
        <SectionLabel number="04">Areas of practice</SectionLabel>
        <div className="section-heading">
          <h2>
            Our services<span className="title-period">.</span>
          </h2>
          <p>{copy.short}</p>
        </div>
      </Reveal>
      <div className="service-list">
        {["Architecture", "Interior design", "Planning & concepts"].map(
          (service, i) => (
            <Reveal key={service} delay={i * 0.06}>
              <div className="service-row">
                <span className="service-number">0{i + 1}</span>
                <h3>{service}</h3>
                <p>{copy.medium}</p>
                <Arrow />
              </div>
            </Reveal>
          ),
        )}
      </div>
    </section>
  );
}
