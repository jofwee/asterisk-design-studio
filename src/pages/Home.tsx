import { Link } from "react-router-dom";
import {
  Arrow,
  ContactStrip,
  ProjectCard,
  Reveal,
  RevealItem,
  SectionLabel,
} from "../components/UI";
import { Hero } from "../components/Hero";
import { Team } from "../components/Team";
import { Services } from "../components/Services";
import { RenderGallery, Walkthrough } from "../components/Showcase";
import { LogoStory, StudioStory } from "../components/StudioStory";
import { InteriorGallery } from "../components/InteriorGallery";
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
            <p>Exterior and interior renderings for Asterisk Design Studio.</p>
          </RevealItem>
          <RevealItem image>
            <ProjectCard />
          </RevealItem>
          <RenderGallery />
        </Reveal>
      </section>
      <InteriorGallery />
      <Walkthrough />
      <StudioStory />
      <LogoStory />
      <Services />
      <Team />
      <section id="get-in-touch" className="home-contact">
        <ContactStrip />
      </section>
    </div>
  );
}
