const { test, after, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");

const api = supertest(app);

describe("back end tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are five blogs", async () => {
    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, 5);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
