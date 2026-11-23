import { Link, useParams } from "react-router-dom";
import { RenderGallery, ShowcaseViews } from "../components/Showcase";
import { Arrow, ProjectImage } from "../components/UI";
import { projectName, imageNames } from "../content/site";
import { portfolio } from "../content/portfolio";
import { FloorPlans } from "../components/FloorPlans";
export default function Project() {
  const { slug } = useParams();
  const entry = portfolio.find((project) => project.slug === slug);
  if (entry) {
    return (
      <article className="project-detail portfolio-detail">
        <div className="project-intro">
          <Link className="text-link" to="/projects">
            Back to Projects <Arrow />
          </Link>
          <div className="page-title-row">
            <h1>{entry.title}</h1>
          </div>
          <p className="eyebrow">
            {entry.category} · {entry.location} · {entry.year}
          </p>
        </div>
        <div className="portfolio-views">
          <img
            className="portfolio-cover"
            {...entry.images[0]}
            alt={entry.title + " featured rendering"}
            fetchPriority="high"
          />
          <p className="portfolio-story">{entry.story}</p>
          {entry.images.length > 1 && (
            <section
              className="portfolio-image-grid"
              aria-label={entry.title + " gallery"}
            >
              {entry.images.slice(1).map((image, index) => (
                <a
                  key={image.src}
                  href={image.src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open render ${index + 2} of ${entry.title}`}
                >
                  <img
                    {...image}
                    alt={`Architectural rendering of ${entry.title}`}
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              ))}
            </section>
          )}
        </div>
      </article>
    );
  }
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
        <p className="eyebrow">Vermosa, Imus, Cavite</p>
        <p className="portfolio-story">
          The studio chose Vermosa for its proximity to residential communities,
          businesses, and prospective developers. The headquarters brings
          reception, meeting rooms, and the firm's design and coordination teams
          together across two floors.
        </p>
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
      <FloorPlans />
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
