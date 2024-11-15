// Toggle Dark Mode
document.getElementById("toggle-theme").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.getElementById("toggle-theme").textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});

// Add Comment Functionality on Post Page
function addComment() {
    const commentInput = document.getElementById("comment-input");
    const commentText = commentInput.value.trim();
    if (commentText) {
        const commentItem = document.createElement("p");
        commentItem.textContent = commentText;
        document.getElementById("comments-list").appendChild(commentItem);
        commentInput.value = "";
    } else {
        alert("Please enter a comment.");
    }
}

// Contact Form Validation
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("All fields are required!");
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Thank you for your message!");
    this.reset();
});
