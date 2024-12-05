const dummy = (blogs) => {
  return 1;
};

module.exports = {
  dummy,
};

const totalLikes = (blogs) => {
  // Edge case for empty array
  if (blogs.length === 0) {
    return 0;  
  }

  const totalLikes = blogs.reduce((acc, blog) => acc + blog.likes, 0);

  return totalLikes;
};

const favoriteBlog = (blogs) => {
  // Edge case for empty array
  if (blogs.length === 0) {
    return { title: "", author: "", likes: "" };  
  }

  const mostLikedBlogObject = blogs.reduce((mostLikedBlog, currentBlog) => {
    return currentBlog.likes > mostLikedBlog.likes ? currentBlog : mostLikedBlog;
  }, blogs[0]);

  const { title, author, likes } = mostLikedBlogObject;
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  // Edge case for empty array
  if (blogs.length === 0) {
    return { author: "", blogs: 0 };  
  }

  // Count how many blogs each author has
  const authorBlogCount = blogs.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + 1;
    return acc;
  }, {});

  // Find the author with the most blogs
  const mostBloggedAuthor = Object.keys(authorBlogCount).reduce((maxAuthor, author) => {
    if (authorBlogCount[author] > authorBlogCount[maxAuthor]) {
      return author;  // Update to the author with more blogs
    }
    return maxAuthor;
  });

  // Return the result
  return { author: mostBloggedAuthor, blogs: authorBlogCount[mostBloggedAuthor] };
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
};
