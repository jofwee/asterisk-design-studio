export const copy = {
  short: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  medium:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  long: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};
export const imageNames = {
  wide: "Scene 3_1.png",
  exterior: "Scene 4_1.png",
  facade: "Scene 7.png",
  entrance: "Scene 8.png",
  detail: "Scene 9.png",
};
export const projectName = imageNames.exterior;
export const studio = {
  motto: "Adapting space to your story",
  background: "Architect Romniel John Capuras founded Asterisk Design Studio after two years of apprenticeship, three years at ALT+38, and two years in independent practice.",
  approach: "The studio takes a hands-on approach to design. Its work begins with the belief that architecture is deeply personal and should be shaped by the people who use it. The firm focuses on residential and commercial projects and works with consultants to provide full architectural services.",
  mission: "Provide exceptional services and creative solutions through architecture that adapts to the people and the environment.",
  vision: "Be globally recognized for providing exceptional architectural services and architecture that serves the people and the environment.",
};
export const team = ["01", "02", "03", "04", "05", "06"].map((id) => ({
  id,
  name: id === "01" ? "Romniel John Capuras" : `Team member ${id}`,
  role: id === "01" ? "Founder and Principal Architect" : "Role to be added",
}));
