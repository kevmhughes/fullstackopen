const { test, after, beforeEach } = require("node:test");
const Blog = require("../models/blog.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");

const api = supertest(app);

const initialBlogs = [
  {
    title: "A Day Out In The Park",
    author: "Fanny Swipes",
    url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes/",
    likes: 234,
    __v: 0,
    id: "674e83ea5aee91bf6c7f407b",
  },
  {
    title: "A Day Out In The Park With Friends",
    author: "Fanny Swipes",
    url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes/",
    likes: 23487,
    __v: 0,
    id: "674e84455aee91bf6c7f407e",
  },
  {
    title: "A Day Out In The Park Two",
    author: "Fanny Swipes",
    url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes/",
    likes: 234,
    __v: 0,
    id: "67562ee29adc1ed073d193e0",
  },
  {
    title: "A Day Out In The Park With Friends Two",
    author: "Fanny Swipes & Friends",
    url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes/",
    likes: 1,
    __v: 0,
    id: "67562f0c9adc1ed073d193e3",
  },
  {
    title: "A Day Out In The Park With Friends Three",
    author: "Fanny Swipes & More Friends",
    url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes/",
    likes: 1234,
    __v: 0,
    id: "67563201bfac82b17b7c568f",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[3]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[4]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("there are five blogs", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("blogs have an id property instead of _id", async () => {
  const response = await api.get("/api/blogs");

  response.body.forEach((blog) => {
    // Ensure that the blog has an 'id' property
    assert(blog.hasOwnProperty("id"), `Blog does not have an 'id' property`);
    // Ensure that the blog does not have an '_id' property
    assert(
      !blog.hasOwnProperty("_id"),
      `Blog has an '_id' property, but it should not`
    );
  });
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "A Day Out In The Park With Friends Four",
    author: "Fanny Swipes & More Friends",
    url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes/",
    likes: 1234,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);
  assert(contents.includes("A Day Out In The Park With Friends Four"));
});

after(async () => {
  await mongoose.connection.close();
});
