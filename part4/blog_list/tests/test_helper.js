const Blog = require("../models/blog.js");
const User = require("../models/user");

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

const initialUsers = [
  {
    username: "kevin",
    name: "Kevin Hughes",
    passwordHash:
      "$2b$10$mdeKL7znCjwZcqVnSHc2yOVG/DT5ZGhZC2Rq25LA2IBGeAXlQ5fPS",
    blogs: [],
    id: "675db963d988a0c2a28596a2",
  },
  {
    username: "john",
    name: "John Smith",
    passwordHash:
      "$2b$10$mdeKL7znCjwZcqVnSHc2yOVG/DT5ZGhZC2Rq25LA2IBGeAXlQ5fQF",
    blogs: [],
    id: "675db963d988a0c2a28596a1",
  },
  ,
  {
    username: "sarah",
    name: "Sarah Smith",
    passwordHash:
      "$2b$10$mdeKL7znCjwZcqVnSHc2yOVG/DT5ZGhZC2Rq25LA2IBGeAXlQ5fCF",
    blogs: [],
    id: "675db963d988a0c2a28596a2",
  },
  ,
  {
    username: "david",
    name: "David Jones",
    passwordHash:
      "$2b$10$mdeKL7znCjwZcqVnSHc2yOVG/DT5ZGhZC2Rq25LA2IBGeAXlQ5fLP",
    blogs: [],
    id: "675db963d988a0c2a28596a4",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "For Testing",
    author: "For Testing",
    url: "https://disneyparksblog.com/community-outreach/disney-parks-costumers-sew-holiday-happiness-behind-the-scenes/",
    likes: 1,
  });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  initialUsers,
  usersInDb,
};
