const { test, after, describe, beforeEach } = require("node:test");
const Blog = require("../models/blog.js");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[3]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[4]);
  await blogObject.save();
});

describe("GET /api/blogs - Fetching all blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
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
});

describe("POST /api/blogs - Creating a new blog & validation and error handling", () => {
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

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    assert(titles.includes("A Day Out In The Park With Friends Four"));
  });

  test("if the likes property is missing it defaults to zero", async () => {
    const blogWithoutLikes = {
      title: "Starting Out",
      author: "Fanny Smith",
      url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes/",
    };

    await api
      .post("/api/blogs")
      .send(blogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    // Ensure the number of blogs has increased by 1
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
    // Check that the new blog has 'likes' set to 0
    assert.strictEqual(blogsAtEnd[helper.initialBlogs.length].likes, 0);
  });

  test("if no url property is provided in the request, a 400 status response is given", async () => {
    const blogWithoutUrl = {
      title: "Starting Out",
      author: "Fanny Smith",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .send(blogWithoutUrl)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("if no title property is provided in the request, a 400 status response is given", async () => {
    const blogWithoutTitle = {
      author: "Fanny Smith",
      url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes/",
      likes: 2,
    };

    await api
      .post("/api/blogs")
      .send(blogWithoutTitle)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

describe("GET /api/blogs/:id - Fetching a specific blog by its ID", () => {
  test("fails with statuscode 404 if blog does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("PUT /api/blogs/:id - Updating a blog by ID", () => {
  test("succeeds with status code 200 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const initialLikes = blogToUpdate.likes;
    const updatedLikes = initialLikes + 1;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: updatedLikes })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);
    assert.strictEqual(updatedBlog.likes, updatedLikes);
  });

  test("fails with status code 404 if blog does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.put(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.put(`/api/blogs/${invalidId}`).expect(400);
  });
});

describe("DELETE /api/blogs/:id - Deleting a blog by ID", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((b) => b.title);
    assert(!contents.includes(blogToDelete.title));
  });

  test("fails with status code 404 if blog does not exist", async () => {
    const validNonexistingId = await helper.nonExistingId();

    await api.delete(`/api/blogs/${validNonexistingId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.delete(`/api/blogs/${invalidId}`).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
