export const jwtDecoder = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export function statusColorizer(status) {
  switch (status) {
    case "released":
      return "bg-success text-black";
    case "unreleased":
      return "bg-success";
    case "solved":
      return "bg-success";
    default:
      return "bg-info";
  }
}
