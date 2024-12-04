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

const favoriteBlog = (blogs) => {
  const mostLikedBlogObject = blogs.reduce((mostLikedBlog, currentBlog) => {
    return currentBlog.likes > mostLikedBlog.likes ? currentBlog : mostLikedBlog;
  }, blogs[0]);

  const { title, author, likes } = mostLikedBlogObject;
  return { title, author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
