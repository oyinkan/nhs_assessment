const request = require("supertest");
const { expect } = require("chai");

const server = require("../app");

describe("Server Tests", () => {
  it("should handle OPTIONS request with CORS headers", (done) => {
    request(server)
      .options("/register")
      .expect("Content-Type", /text\/plain/)
      .expect(204, done);
  });

  it("should return 404 for unknown routes", (done) => {
    request(server)
      .get("/unknown")
      .expect("Content-Type", /text\/plain/)
      .expect(404, "Not Found", done);
  });

  it("should handle POST /register with valid data", (done) => {
    request(server)
      .post("/register")
      .send({
        fname: "John",
        lname: "Doe",
        email_address: "john.doe@example.com",
        password: "Password123!",
      })
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property(
          "message",
          "Form submitted successfully!"
        );
        done();
      });
  });
});
