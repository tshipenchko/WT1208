document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("post-form");
    const postsContainer = document.getElementById("posts");
    const postsPerPageInput = document.getElementById("posts-per-page");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");

    // noinspection JSUnresolvedReference
    const bsModal = new bootstrap.Modal(document.getElementById("update-modal"));

    let currentPage = 1;

    form.addEventListener("submit", handleFormSubmit);

    postsPerPageInput.addEventListener("change", () => {
        currentPage = 1;
        fetchPosts().then();
    });

    prevPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchPosts().then();
        }
    });

    nextPageButton.addEventListener("click", () => {
        currentPage++;
        fetchPosts().then();
    });

    async function handleFormSubmit(event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const author = document.getElementById("author").value;

        const response = await fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content, author }),
        });

        if (response.ok) {
            form.reset();
            fetchPosts().then();
        }
    }

    async function fetchPosts() {
        const limit = postsPerPageInput.value;
        const skip = (currentPage - 1) * limit;
        const response = await fetch(`/posts?skip=${skip}&limit=${limit}`);
        const posts = await response.json();

        postsContainer.innerHTML = "";
        for (const post of posts) {
            const postElement = document.createElement("div");
            postElement.className = "card mb-3";
            postElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.content}</p>
                    <p class="card-text"><small class="text-muted">By ${post.author}</small></p>
                    <button class="btn btn-danger delete-button" data-id="${post._id}">Delete</button>
                    <button class="btn btn-primary update-button" data-id="${post._id}">Update</button>
                </div>
            `;
            postsContainer.appendChild(postElement);
        }

        document.querySelectorAll(".delete-button").forEach(button => {
            button.addEventListener("click", async () => {
                const postId = button.dataset.id;
                await fetch(`/posts/${postId}`, { method: "DELETE" });
                fetchPosts().then();
            });
        });

        document.querySelectorAll(".update-button").forEach(button => {
            button.addEventListener("click", async () => {
                const postId = button.dataset.id;
                const post = await fetch(`/posts/${postId}`).then(response => response.json());

                const modal = document.getElementById("update-modal");
                modal.querySelector("input[name=\"title\"]").value = post.title;
                modal.querySelector("textarea[name=\"content\"]").value = post.content;
                modal.querySelector("input[name=\"author\"]").value = post.author;
                modal.querySelector("form").dataset.id = postId;

                // noinspection JSUnresolvedReference
                bsModal.show()
            });
        });
    }

    document.getElementById("update-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const modal = document.getElementById("update-modal");
        const postId = modal.querySelector("form").dataset.id;
        const title = modal.querySelector("input[name=\"title\"]").value;
        const content = modal.querySelector("textarea[name=\"content\"]").value;
        const author = modal.querySelector("input[name=\"author\"]").value;

        const response = await fetch(`/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content, author }),
        });

        if (response.ok) {
            // noinspection JSUnresolvedReference
            bsModal.hide();
            fetchPosts().then();
        }
    });

    fetchPosts().then();
});
