document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.getElementById('createPostForm');
    const postList = document.getElementById('postList');

    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const postTitle = document.getElementById('postTitle').value;
        const authorName = document.getElementById('authorName').value;

        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: postTitle, author: authorName }),
        });

        const newPost = await response.json();
        displayPost(newPost);
    });

    const displayPost = (post) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${post.title}</strong> by ${post.author} 
                              <button onclick="deletePost(${post.id})">Видалити</button>`;
        postList.appendChild(listItem);
    };

    const deletePost = async (postId) => {
        const response = await fetch(`/posts/${postId}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        alert(result.message);

        postList.innerHTML = '';
        loadPosts();
    };

    const loadPosts = async () => {
        const response = await fetch('/posts');
        const posts = await response.json();
        posts.forEach(displayPost);
    };

    loadPosts();
});