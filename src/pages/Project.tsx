import { Link, useParams } from "react-router-dom";
import { RenderGallery, ShowcaseViews } from "../components/Showcase";
import { Arrow, ProjectImage } from "../components/UI";
import { projectName, imageNames } from "../content/site";
export default function Project() {
  const { slug } = useParams();
  if (slug !== "project-01")
    return (
      <section className="page-heading">
        <h1>Project not found</h1>
        <Link className="text-link" to="/projects">
          Back to Projects <Arrow />
        </Link>
      </section>
    );
  return (
    <article className="project-detail">
      <div className="project-intro">
        <Link className="text-link" to="/projects">
          Back to Projects <Arrow />
        </Link>
        <div className="page-title-row">
          <h1>
            {projectName}
            <span className="title-period">.</span>
          </h1>
        </div>
      </div>
      <figure>
        <ProjectImage
          className="project-lead"
          id="exterior"
          alt="Establishing exterior render of the studio building"
          eager
        />
        <figcaption className="project-lead-caption">
          {imageNames.exterior}
        </figcaption>
      </figure>
      <RenderGallery projectPage>
        {(openGallery) => <ShowcaseViews onOpenGallery={openGallery} />}
      </RenderGallery>
      <div className="project-end">
        <Link className="text-link" to="/projects">
          All Projects <Arrow />
        </Link>
      </div>
    </article>
  );
}
