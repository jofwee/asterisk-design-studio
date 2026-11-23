import { ProjectCard, SectionLabel } from "../components/UI";
import { RenderGallery } from "../components/Showcase";
import { PortfolioGrid } from "../components/Portfolio";
import { portfolio } from "../content/portfolio";
export default function Projects() {
  return (
    <>
      <section className="page-heading">
        <SectionLabel number="01">Projects</SectionLabel>
        <div className="page-title-row">
          <h1>
            Selected works<span className="title-period">.</span>
          </h1>
          <div>
            <p>
              Residential, interior, and commercial work from Asterisk Design
              Studio.
            </p>
            <a className="text-link" href="#studio-headquarters">
              Explore the headquarters
            </a>
          </div>
        </div>
      </section>
      <section className="project-index">
        <PortfolioGrid projects={portfolio} />
        <div id="studio-headquarters" className="portfolio-headquarters">
          <h2>Studio headquarters</h2>
          <RenderGallery />
        </div>
        <ProjectCard eager />
      </section>
    </>
  );
}
