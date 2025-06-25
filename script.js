// script.js
// Handles dynamic posting and localStorage persistence

// Load existing posts or initialize empty array
const saved = localStorage.getItem('posts');
let posts = saved ? JSON.parse(saved) : [];

// Render posts into the DOM
function renderPosts(posts) {
  const container = document.getElementById('blog-posts');
  container.innerHTML = '';
  posts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'post';
    article.innerHTML = `
      <small>${post.date}</small>
      <p>${post.content}</p>
    `;
    container.appendChild(article);
  });
}

// Initial render
renderPosts(posts);

// Handle new post submissions
document.getElementById('post-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('post-input');
  const text = input.value.trim();
  if (!text) return;

  const newPost = {
    date: new Date().toLocaleString(),
    content: text
  };

  // Add new post to front, save, and re-render
  posts.unshift(newPost);
  localStorage.setItem('posts', JSON.stringify(posts));
  renderPosts(posts);

  // Clear input
  input.value = '';
});
