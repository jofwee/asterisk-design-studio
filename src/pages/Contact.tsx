import { SectionLabel } from "../components/UI";
import { copy } from "../content/site";
export default function Contact() {
  return (
    <section className="contact-page">
      <SectionLabel number="03">Get in touch</SectionLabel>
      <div className="contact-page-heading">
        <h1>
          Let’s talk<span className="title-period">.</span>
        </h1>
        <p>{copy.medium}</p>
      </div>
      <div className="contact-data">
        {["Email", "Phone", "Studio address"].map((label, i) => (
          <div key={label}>
            <span className="contact-number">0{i + 1}</span>
            <h2>{label}</h2>
            <span>Lorem ipsum</span>
          </div>
        ))}
      </div>
    </section>
  );
}
