import { ProjectCard, SectionLabel } from "../components/UI";
import { copy } from "../content/site";
export default function Projects() {
  return (
    <>
      <section className="page-heading">
        <SectionLabel number="01">Projects</SectionLabel>
        <div className="page-title-row">
          <h1>
            Selected works<span className="title-period">.</span>
          </h1>
          <p>{copy.short}</p>
        </div>
      </section>
      <section className="project-index">
        <ProjectCard eager />
      </section>
    </>
  );
}
