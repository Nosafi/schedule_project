export const dataValidation = (type, data) => {
  let re = / /;
  switch (type) {
    case "only numbers":
      re = /[\d]{1,60}$/g;
      break;
    case "notLimited string":
      re = /[\s\w]{1,60}$/g;
      break;
    case "limited string":
      re = /[А-Яа-яA-Za-z]{1,60}$/g;
      break;
    default:
      break;
  }
  const check = data.match(re);
  return check ? check.join("") : "" === data ? true : false;
};
export const stringLimit = (str) => {
  if (str.split("").length > 30) {
    return str.split("").splice(0, 30).join("") + "...";
  } else {
    return str;
  }
};
