const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password, firstName, lastName) => {
  console.log(password, firstName, lastName, "FXN BLOCK");
  const baseRegex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,255}$/;
  console.log(firstName.toLowerCase(), "FNAME");

  if (
    (firstName !== "" &&
      password.toLocaleLowerCase().includes(firstName.toLocaleLowerCase())) ||
    (lastName !== "" &&
      password.toLocaleLowerCase().includes(lastName.toLocaleLowerCase())) ||
    !baseRegex.test(password)
  ) {
    console.log("Im here");
    return false;
  } else {
    console.log("miss me");
    return true;
  }
};

const validate = (data) => {
  let invalidFieldExists = [];
  Object.keys(data).forEach((field) => {
    if (
      field === "fname" &&
      (data["fname"].trim() === "" || data["fname"].length < 3)
    ) {
      invalidFieldExists.push(field);
    }
    if (
      field === "lname" &&
      (data["lname"].trim() === "" || data["lname"].length < 3)
    ) {
      invalidFieldExists.push(field);
    }
    if (field === "email_address" && !validateEmail(data.email_address)) {
      invalidFieldExists.push(field);
    }
    if (
      field === "password" &&
      !validatePassword(data.password, data.fname, data.lname)
    ) {
      invalidFieldExists.push(field);
    }
    if (
      field === "confirm_password" &&
      data.password !== data.confirm_password
    ) {
      invalidFieldExists.push(field);
    }
  });
  console.log(invalidFieldExists, "Inside validate");
  return invalidFieldExists;
};

module.exports = { validate, validatePassword, validateEmail };
