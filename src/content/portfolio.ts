import media from "./final-media.json";

const entries = [
  [
    "guevara-heights",
    "Guevara Heights",
    "Residential",
    "Muntinlupa City",
    "2023",
    "A modern Gothic residence in Ayala Alabang. The design makes room for open space and a closer connection to nature, pairing dark exterior finishes with warmly lit interiors.",
  ],
  [
    "polilo-residence",
    "Polilo Residence",
    "Residential",
    "Polilo, Quezon",
    "2023",
    "A house organized around filtered light and a close connection to the outdoors. Timber screens, planted terraces, and warm interior finishes bring privacy and softness to an open plan.",
  ],
  [
    "kirigun-residence",
    "Kirigun Residence",
    "Residential",
    "Batangas City",
    "2024",
    "A two-storey residence with layered gables, neutral finishes, stone accents, and generous windows. The covered entrance and balanced front elevation give the house a quiet presence.",
  ],
  [
    "monreal-residence-1",
    "Monreal Residence 1",
    "Residential",
    "Tarlac City",
    "2024",
    "A two-storey residence with stone accents, warm wood, and a covered entrance. Large windows, decorative balcony railings, and layered rooflines define the exterior.",
  ],
  [
    "monreal-residence-2",
    "Monreal Residence 2",
    "Interiors",
    "Makati City",
    "2025",
    "A bedroom with neoclassical detailing, including paneled walls, crown molding, and a ceiling medallion. Warm herringbone flooring and a soft neutral palette give the room a restful character.",
  ],
  [
    "victorian-heights",
    "Victorian Heights",
    "Residential",
    "Kawit, Cavite",
    "2024",
    "A residence defined by an octagonal corner turret, a wraparound porch, and tall windows. A planted approach leads to the veranda, while cream siding and decorative spindlework pick out the exterior details.",
  ],
  [
    "plumeria",
    "Plumeria",
    "Commercial",
    "Marikina City",
    "2025",
    "A public market, park, and civic pavilion centered on a petal-shaped canopy. An arched walkway links the central plaza to stalls and seating through planted grounds.",
  ],
  [
    "siloy",
    "Siloy",
    "Commercial",
    "Cebu City",
    "2025",
    "A domestic airport terminal concept inspired by the siloy bird in flight. Its sweeping roof gives the terminal a recognizable profile and shelters the approach for arriving and departing passengers.",
  ],
  [
    "saluhan",
    "Saluhan",
    "Commercial",
    "Pasig City",
    "2025",
    "A landscaped esplanade with winding paths, shaded seating, and open gathering areas. Its curved layout follows the surrounding greenery and creates room for recreation and everyday use.",
  ],
] as const satisfies readonly (readonly [
  keyof typeof media.projects,
  string,
  string,
  string,
  string,
  string,
])[];

export const portfolio = entries.map(
  ([slug, title, category, location, year, story]) => ({
    slug,
    title,
    category,
    location,
    year,
    story,
    images: media.projects[slug],
  }),
);

export const featuredPortfolio = portfolio.filter(({ slug }) =>
  ["guevara-heights", "polilo-residence", "plumeria", "siloy"].includes(slug),
);
