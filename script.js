// script.js
// Handles dynamic posting with Firestore persistence

const form = document.getElementById('post-form');
const input = document.getElementById('post-input');
const container = document.getElementById('blog-posts');

// Render an array of post objects
tdfunction renderPosts(posts) {
  container.innerHTML = '';
  posts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'post';
    article.innerHTML = `
      <small>${new Date(post.timestamp).toLocaleString()}</small>
      <p>${post.content}</p>
    `;
    container.appendChild(article);
  });
}

// Fetch and listen for updates from Firestore
function subscribePosts() {
  db.collection('posts')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      const posts = snapshot.docs.map(doc => doc.data());
      renderPosts(posts);
    });
}

// Add a new post to Firestore
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  await db.collection('posts').add({
    content: text,
    timestamp: Date.now()
  });

  input.value = '';
});

// Initialize listener
subscribePosts();
