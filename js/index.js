// Error handler
let errorObject = {
  fname: true,
  lname: true,
  email_address: true,
};

// error message function
const showError = (elementId, message, color) => {
  let errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.style.color = color;
};

// validate email address value
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// inputs change handler
const handleChange = (id, value) => {
  switch (id) {
    case "fname":
      if (value.trim() === "" || value.length < 3) {
        errorObject.fname = true;
        showError(`${id}_help`, "First name is invalid", "tomato");
      } else {
        errorObject.fname = false;
        showError(`${id}_help`, "Add your first name", "#90EE90");
      }
      break;
    case "lname":
      if (value.trim() === "" || value.length < 3) {
        errorObject.lname = true;
        showError(`${id}_help`, "Last name is invalid", "tomato");
      } else {
        errorObject.lname = false;
        showError(`${id}_help`, "Add your last name", "#90EE90");
      }
      break;
    case "email_address":
      if (value.trim() === "" || value.length < 3 || !validateEmail(value)) {
        errorObject.email_address = true;
        showError(`${id}_help`, "Email address is invalid", "tomato");
      } else {
        errorObject.email_address = false;
        showError(`${id}_help`, "Enter a valid email address", "#90EE90");
      }
      break;

    default:
      break;
  }
};
