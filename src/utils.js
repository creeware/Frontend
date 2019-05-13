export const jwtDecoder = token => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export function roleColorizer(role) {
  switch (role) {
    case "teacher":
      return "bg-primary";
    case "student":
      return "orange";
    case "admin":
      return "bg-grey";
    case "user":
      return "green";
    default:
      return "bg-info";
  }
}

export function daysLeft(today, date) {
  if (today.getFullYear() == date.getFullYear()) {
    if (today.getMonth() == date.getMonth()) {
      return date.getDate() - today.getDate();
    } else if (today.getMonth() == date.getMonth() - 1) {
      var day1 = today.getDate();
      var day2 = date.getDate();
      switch (today.getMonth()) {
        case 0:
          return 31 - day1 + day2;
        case 1:
          return 28 - day1 + day2;
        case 2:
          return 31 - day1 + day2;
        case 3:
          return 30 - day1 + day2;
        case 4:
          return 31 - day1 + day2;
        case 5:
          return 30 - day1 + day2;
        case 6:
          return 31 - day1 + day2;
        case 7:
          return 31 - day1 + day2;
        case 8:
          return 30 - day1 + day2;
        case 9:
          return 31 - day1 + day2;
        case 10:
          return 30 - day1 + day2;
        case 11:
          return 31 - day1 + day2;
      }
    }
  }
}

export function statusColorizer(status) {
  switch (status) {
    case "released":
      return "bg-primary";
    case "unreleased":
      return "bg-danger";
    case "solved":
      return "success";
    case "failed":
      return "red";
    case "reset":
      return "bg-grey";
    default:
      return "bg-info";
  }
}

export function getDate(dateString) {
  if (dateString) {
    var date = new Date(dateString);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }

    if (month < 10) {
      month = "0" + month;
    }

    return year + "-" + month + "-" + day;
  }
  return "No Date Available";
}
