const dummy = (blogs) => {
  return 1;
};

module.exports = {
  dummy,
};

const totalLikes = (blogs) => {
  const totalLikes = blogs.reduce((acc, blog) => acc + blog.likes, 0);

  return totalLikes;
};

module.exports = {
  dummy,
  totalLikes,
};
