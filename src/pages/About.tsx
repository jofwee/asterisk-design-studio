import {
  ContactStrip,
  ProjectImage,
  Reveal,
  SectionLabel,
} from "../components/UI";
import { Team } from "../components/Team";
import { Services } from "../components/Services";
import { copy, imageNames } from "../content/site";
export default function About() {
  return (
    <>
      <section className="page-heading">
        <SectionLabel number="02">About Asterisk</SectionLabel>
        <div className="page-title-row">
          <h1>
            The studio<span className="title-period">.</span>
          </h1>
          <p>{copy.short}</p>
        </div>
      </section>
      <section className="about-content">
        <figure>
          <ProjectImage
            id="entrance"
            alt="Architectural render of the studio entrance"
            eager
          />
          <figcaption>{imageNames.entrance}</figcaption>
        </figure>
        <Reveal className="about-description">
          <span className="eyebrow">Asterisk Design Studio</span>
          <h2>Our perspective</h2>
          <p>{copy.long}</p>
        </Reveal>
      </section>
      <section className="studio-principles">
        {["Our approach", "Our vision"].map((title, index) => (
          <Reveal key={title} delay={index * 0.1}>
            <span className="eyebrow">0{index + 1}</span>
            <h2>{title}</h2>
            <p>{copy.medium}</p>
          </Reveal>
        ))}
      </section>
      <Services />
      <Team />
      <ContactStrip />
    </>
  );
}
