import { Link, useParams } from "react-router-dom";
import { Arrow, ProjectImage, Reveal } from "../components/UI";
import { copy, projectName, imageNames } from "../content/site";
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
          <span className="eyebrow">01 / 01</span>
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
      <Reveal className="project-information">
        <p>{copy.medium}</p>
        <dl>
          {["Category", "Location", "Year", "Area"].map((label) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>
                {label === "Category" ? "Architectural visualization" : "—"}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <div className="project-gallery">
        <Reveal>
          <figure>
            <ProjectImage
              id="wide"
              alt="Wide view showing the building frontage and landscape"
            />
            <figcaption>{imageNames.wide}</figcaption>
          </figure>
        </Reveal>
        <Reveal className="gallery-pair">
          <figure>
            <ProjectImage
              id="entrance"
              alt="Detail render of the entrance and planting"
              sizes="(max-width: 700px) 92vw, 44vw"
            />
            <figcaption>{imageNames.entrance}</figcaption>
          </figure>
          <figure className="gallery-offset">
            <ProjectImage
              id="detail"
              alt="Upward view of the facade and illuminated signage"
              sizes="(max-width: 700px) 92vw, 44vw"
            />
            <figcaption>{imageNames.detail}</figcaption>
          </figure>
        </Reveal>
        <Reveal className="gallery-final">
          <figure>
            <ProjectImage
              id="facade"
              alt="Front elevation detail of timber fins and the facade"
              sizes="(max-width: 700px) 92vw, 65vw"
            />
            <figcaption>{imageNames.facade}</figcaption>
          </figure>
        </Reveal>
      </div>
      <div className="project-end">
        <Link className="text-link" to="/projects">
          All Projects <Arrow />
        </Link>
        <span>01 / 01</span>
      </div>
    </article>
  );
}
