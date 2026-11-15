import { Link } from "react-router-dom";
import {
  Arrow,
  ContactStrip,
  ProjectCard,
  ProjectImage,
  Reveal,
  RevealItem,
  SectionLabel,
} from "../components/UI";
import { Hero } from "../components/Hero";
import { Team } from "../components/Team";
import { Services } from "../components/Services";
import { copy, imageNames } from "../content/site";
export function Home() {
  return (
    <div className="home-sections">
      <Hero />
      <section id="projects" className="work-section">
        <Reveal stagger>
          <RevealItem className="section-top">
            <SectionLabel number="01">Selected work</SectionLabel>
            <Link className="text-link" to="/projects">
              All Projects <Arrow />
            </Link>
          </RevealItem>
          <RevealItem className="section-heading">
            <h2>
              Selected works<span className="title-period">.</span>
            </h2>
            <p>{copy.short}</p>
          </RevealItem>
          <RevealItem image>
            <ProjectCard />
          </RevealItem>
        </Reveal>
      </section>
      <section id="details" className="detail-section">
        <Reveal className="detail-layout" stagger>
          <RevealItem className="detail-copy">
            <SectionLabel number="02">A closer look</SectionLabel>
            <h2>
              In the details<span className="title-period">.</span>
            </h2>
            <p>{copy.medium}</p>
            <Link className="text-link" to="/projects/project-01">
              Explore the project <Arrow />
            </Link>
          </RevealItem>
          <RevealItem as="figure" image direction="right">
            <ProjectImage
              id="entrance"
              alt="Entrance render with warm lighting, planting, and the supplied studio emblem"
              sizes="(max-width: 700px) 92vw, 52vw"
            />
            <figcaption>
              <span>{imageNames.entrance}</span>
              <span>Entrance perspective</span>
            </figcaption>
          </RevealItem>
        </Reveal>
      </section>
      <section id="studio" className="studio-section">
        <Reveal className="studio-layout" stagger>
          <RevealItem className="studio-label">
            <SectionLabel number="03">The studio</SectionLabel>
          </RevealItem>
          <RevealItem direction="right">
            <h2>
              About
              <br />
              Asterisk<span className="title-period">.</span>
            </h2>
            <p>{copy.medium}</p>
            <Link className="text-link" to="/about">
              Discover the studio <Arrow />
            </Link>
          </RevealItem>
          <RevealItem className="studio-note">
            Architecture
            <br />
            &amp; perspective
          </RevealItem>
        </Reveal>
      </section>
      <Services />
      <Team />
      <section id="get-in-touch" className="home-contact">
        <ContactStrip />
      </section>
    </div>
  );
}
