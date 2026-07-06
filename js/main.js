const output = document.getElementById("output");
const getPostsBtn = document.getElementById("getPostsBtn");
const createPostBtn = document.getElementById("createPostBtn");
const createPostForm = document.getElementById("createPostForm");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");

const showPosts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const { posts } = await res.json();
    output.innerHTML = posts
      .map((post) => `<div><h3>${post.title}</h3><p>${post.content}</p></div>`)
      .join("");
  } catch (error) {
    output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
};

const createPost = async () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    output.innerHTML = `<p style="color: red;">Error: Title and content are required</p>`;
    return;
  }
  try {
    const res = await fetch("http://localhost:5000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    if (!res.ok) {
      throw new Error("Failed to create post");
    }
    titleInput.value = "";
    contentInput.value = "";
    showPosts();
  } catch (error) {
    output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
};

getPostsBtn.addEventListener("click", showPosts);

createPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createPost();
});
