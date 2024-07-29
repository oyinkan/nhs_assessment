const { expect } = require("chai");
const { validate, validateEmail, validatePassword } = require("../validate");

// Test the validateEmail function
describe("validateEmail", () => {
  it("should return true for valid email addresses", () => {
    expect(validateEmail("test@example.com")).to.be.true;
    expect(validateEmail("user.name+tag+sorting@example.com")).to.be.true;
    expect(validateEmail("user@subdomain.example.com")).to.be.true;
  });

  it("should return false for invalid email addresses", () => {
    expect(validateEmail("plainaddress")).to.be.false;
    expect(validateEmail("user@.com")).to.be.false;
    expect(validateEmail("@example.com")).to.be.false;
    expect(validateEmail("user@com")).to.be.false;
  });
});

// Test the validatePassword function
describe("validatePassword", () => {
  it("should return false for passwords that do not meet requirements", () => {
    expect(validatePassword("short", "John", "Doe")).to.be.false; // too short
    expect(validatePassword("NoSpecialChar123", "John", "Doe")).to.be.false; // missing special character
    expect(validatePassword("Special@123".repeat(59), "", "")).to.be.false; // longer than 255 characters
    expect(validatePassword("SHAKIRAT@123", "Shakirat", "Usman")).to.be.false; // should not contain firstname
    expect(validatePassword("usman@123", "Shakirat", "Usman")).to.be.false; // should not contain lastname
  });

  it("should return true for valid passwords", () => {
    expect(validatePassword("Password123!", "John", "Doe")).to.be.true;
    expect(validatePassword("ValidPassword1@", "John", "Doe")).to.be.true;
    expect(validatePassword("Another$Valid1", "", "")).to.be.true;
  });
});

// Test the overall validate function
describe("validate", () => {
  it("should return an array with invalid fields for invalid data", () => {
    const invalidData = {
      fname: "Jo", // too short
      lname: "Do", // too short
      email_address: "invalid-email", // invalid email
      password: "short", // too short
      confirm_password: "notmatching", // does not match password
    };

    const invalidFields = validate(invalidData);
    expect(invalidFields).to.include.members([
      "fname",
      "lname",
      "email_address",
      "password",
      "confirm_password",
    ]);
  });

  it("should return an empty array for valid data", () => {
    const validData = {
      fname: "John",
      lname: "Doe",
      email_address: "john.doe@example.com",
      password: "ValidPass123@",
      confirm_password: "ValidPass123@",
    };

    const invalidFields = validate(validData);
    console.log(invalidFields, "TEST");
    expect(invalidFields).to.be.empty;
  });
});
