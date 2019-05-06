export const jwtDecoder = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export function statusColorizer(status) {
  switch (status) {
    case "released":
      return "bg-primary";
    case "unreleased":
      return "bg-danger";
    case "solved":
      return "bg-success";
    case "failed":
      return "red";
    case "reset":
      return "bg-grey";
    default:
      return "bg-info";
  }
}

export function getDate(dateString) {
  var date = new Date(dateString);
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  return year + "-" + month + "-" + day;
}
