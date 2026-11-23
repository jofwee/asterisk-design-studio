import { SectionLabel } from "../components/UI";
const details = [
  {
    label: "Email",
    value: "asteriskdesignstudio5@gmail.com",
    href: "mailto:asteriskdesignstudio5@gmail.com",
  },
  { label: "Phone", value: "09063608680", href: "tel:+639063608680" },
  {
    label: "Studio address",
    value:
      "Champions Loop, Ayala Vermosa Sports Hub, Vermosa Estate, Barangay Pasong Buaya I, Imus City, Cavite, Philippines 4103",
  },
];
export default function Contact() {
  return (
    <section className="contact-page">
      <SectionLabel number="03">Get in touch</SectionLabel>
      <div className="contact-page-heading">
        <h1>
          Let’s talk<span className="title-period">.</span>
        </h1>
        <p>Get in touch about an architecture or design project.</p>
      </div>
      <div className="contact-data">
        {details.map(({ label, value, href }, i) => (
          <div key={label}>
            <span className="contact-number">0{i + 1}</span>
            <h2>{label}</h2>
            {href ? (
              <a className="contact-value" href={href}>
                {value}
              </a>
            ) : (
              <address className="contact-value">{value}</address>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
