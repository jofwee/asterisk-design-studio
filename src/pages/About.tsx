import { ContactStrip, SectionLabel } from "../components/UI";
import { Team } from "../components/Team";
import { Services } from "../components/Services";
import { LogoStory, StudioStory } from "../components/StudioStory";
export default function About() {
  return (
    <>
      <section className="page-heading">
        <SectionLabel number="02">About Asterisk</SectionLabel>
        <div className="page-title-row">
          <h1>
            The studio<span className="title-period">.</span>
          </h1>
        </div>
      </section>
      <StudioStory />
      <LogoStory />
      <Services />
      <Team />
      <ContactStrip />
    </>
  );
}
