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
export const team = ["01", "02", "03", "04"].map((id) => ({
  id,
  name: `Team member ${id}`,
  role: "Role to be added",
}));
