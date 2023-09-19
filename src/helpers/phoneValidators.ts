export function phoneValidators(phone) {
  const phoneRegex = /^(\+\d{1,4}\s?)?(\d{10,15})$/;
  if (!phone) return "Mobile number can't be empty.";
  if (!phoneRegex.test(phone)) return "Oops! We need a valid mobile number.";
  return "";
}
