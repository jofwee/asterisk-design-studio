import { Reveal, SectionLabel } from "./UI";

const services = [
  [
    "Conceptual design",
    "Explore design ideas and define the direction of the project.",
  ],
  ["Site analysis", "Study the site and the conditions that shape the design."],
  ["Schematic design services", "Develop the spatial layout and overall form."],
  [
    "Design development",
    "Refine the design, materials, and architectural details.",
  ],
];
export function Services() {
  return (
    <section id="services" className="services-section">
      <Reveal>
        <SectionLabel number="04">Areas of practice</SectionLabel>
        <div className="section-heading">
          <h2>
            Our services<span className="title-period">.</span>
          </h2>
        </div>
      </Reveal>
      <div className="service-list">
        {services.map(([service, description], i) => (
          <Reveal key={service} delay={i * 0.06}>
            <div className="service-row">
              <span className="service-number">0{i + 1}</span>
              <h3>{service}</h3>
              <p>{description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
