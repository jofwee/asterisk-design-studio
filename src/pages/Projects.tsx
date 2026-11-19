import { ProjectCard, SectionLabel } from "../components/UI";
import { RenderGallery } from "../components/Showcase";
export default function Projects() {
  return (
    <>
      <section className="page-heading">
        <SectionLabel number="01">Projects</SectionLabel>
        <div className="page-title-row">
          <h1>
            Selected works<span className="title-period">.</span>
          </h1>
          <p>
            Explore exterior and interior renderings for Asterisk Design Studio.
          </p>
        </div>
      </section>
      <section className="project-index">
        <RenderGallery />
        <ProjectCard eager />
      </section>
    </>
  );
}
