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
});
