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
import { PortfolioGrid } from "../components/Portfolio";
import { featuredPortfolio } from "../content/portfolio";
export function Home() {
  return (
    <div className="home-sections">
      <Hero />
      <section id="projects" className="work-section">
        <Reveal stagger>
          <RevealItem className="section-top">
            <SectionLabel number="01">The headquarters</SectionLabel>
            <Link className="text-link" to="/projects">
              All Projects <Arrow />
            </Link>
          </RevealItem>
          <RevealItem className="section-heading">
            <h2>
              Inside the studio<span className="title-period">.</span>
            </h2>
            <p>
              Explore the Asterisk Design Studio headquarters in Vermosa, Imus,
              Cavite.
            </p>
          </RevealItem>
          <RevealItem image>
            <ProjectCard />
          </RevealItem>
          <RenderGallery />
        </Reveal>
      </section>
      <InteriorGallery />
      <Walkthrough />
      <section
        className="home-portfolio"
        aria-labelledby="home-portfolio-title"
      >
        <Reveal className="showcase-heading">
          <h2 id="home-portfolio-title">
            Selected works<span className="title-period">.</span>
          </h2>
          <Link className="text-link" to="/projects">
            View all projects <Arrow />
          </Link>
        </Reveal>
        <PortfolioGrid projects={featuredPortfolio} />
      </section>
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
