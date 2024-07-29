// Error handler
let errorObject = {
  fname: true,
  lname: true,
  email_address: true,
  password: true,
  confirm_password: true,
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

// validates password field
const validatePassword = (password) => {
  const firstName = document.querySelector("#fname").value;
  const lastName = document.querySelector("#lname").value;
  const minLengthRegex = /.{8,}/;
  const maxLengthRegex = /^.{0,255}$/;
  const digitRegex = /(?=.*\d)/;
  const specialCharRegex = /(?=.*[!@#$%^&*(),.?":{}|<>])/;

  if (!minLengthRegex.test(password)) {
    showError("min_char", "Password must be at least 8 characters", "tomato");
  } else {
    showError("min_char", "Password must be at least 8 characters", "#90EE90");
  }
  if (!maxLengthRegex.test(password)) {
    showError("max_char", "Maximum 255 characters", "tomato");
  } else {
    showError("max_char", "Maximum 255 characters", "#90EE90");
  }
  if (!digitRegex.test(password)) {
    showError("one_num", "At least one number", "tomato");
  } else {
    showError("one_num", "At least one number", "#90EE90");
  }
  if (!specialCharRegex.test(password)) {
    showError("one_spec_char", "At least one special character", "tomato");
  } else {
    showError("one_spec_char", "At least one special character", "#90EE90");
  }
  if (
    (firstName !== "" && password.includes(firstName)) ||
    (lastName !== "" && password.includes(lastName))
  ) {
    showError("no_names", "Must not contain first name or last name", "tomato");
  } else {
    showError(
      "no_names",
      "Must not contain first name or last name",
      "#90EE90"
    );
  }
  return true;
};

// checks if password and confirm_password values match
const validatePasswordMatch = () => {
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm_password").value;

  if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
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
    case "password":
      errorObject.password = true;
      validatePassword(value);
      errorObject.password = false;
      break;

    case "confirm_password":
      if (value.trim() === "" || value.length < 3 || !validatePasswordMatch()) {
        errorObject.confirm_password = true;
        showError(`${id}_help`, "Both passwords must match", "tomato");
      } else {
        errorObject.confirm_password = false;
        showError(
          `${id}_help`,
          "Value must be the same as password input",
          "#90EE90"
        );
      }

    default:
      break;
  }
};

// handles form submission and API call
const handleSubmit = (e) => {
  e.preventDefault();
  let invalidFieldExists = [];
  Object.keys(errorObject).forEach((field) => {
    if (errorObject[field]) {
      invalidFieldExists.push(field);
      handleChange(field, "");
    }
  });

  if (invalidFieldExists.length > 0) {
    alert("Invalid field(s): ", +invalidFieldExists);
  } else {
    // make api call
    const apiUrl = "http://127.0.0.1:5000/register";

    const data = new FormData(e.target);

    // Convert FormData to a JSON object
    const formDataObject = {};
    data.forEach((value, key) => {
      formDataObject[key] = value;
    });

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObject), // Convert data to JSON string
    })
      .then((response) => {
        // Check if the response status is OK
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        // Parse the JSON from the response
        return response.json();
      })
      .then((data) => {
        // Handle the parsed data
        console.log(data);
      })
      .catch((error) => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);
      });
  }
};
