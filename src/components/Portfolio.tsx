import { Link } from "react-router-dom";
import { portfolio } from "../content/portfolio";
import { Reveal } from "./UI";

export function PortfolioGrid({ projects }: { projects: typeof portfolio }) {
  return (
    <div className="portfolio-grid">
      {projects.map((project) => (
        <Reveal key={project.slug} className="portfolio-item">
          <Link to={`/projects/${project.slug}`} className="portfolio-card">
            <div className="portfolio-image">
              <img
                {...project.images[0]}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="portfolio-caption">
              <div>
                <h2>{project.title}</h2>
                <p>
                  {project.location} · {project.year}
                </p>
              </div>
              <span className="eyebrow">{project.category}</span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
