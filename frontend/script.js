document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menuToggle");
    const menu = document.getElementById("navLinks");

    // Mobile menu toggle
    menuButton.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    const links = document.querySelectorAll("#navLinks a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("active");
        });
    });

    // Contact form submission and validation
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();
            const formMessage = document.getElementById("formMessage");

            formMessage.style.color = "#38bdf8";
            formMessage.textContent = "Sending message...";

            if (!name || !email || !subject || !message) {
                formMessage.style.color = "#ef4444";
                formMessage.textContent = "Please fill in all fields.";
                return;
            }

            if (!email.includes("@") || !email.includes(".")) {
                formMessage.style.color = "#ef4444";
                formMessage.textContent = "Please enter a valid email address.";
                return;
            }

            if (message.length < 10) {
                formMessage.style.color = "#ef4444";
                formMessage.textContent = "Message must be at least 10 characters long.";
                return;
            }

            try {
                // Change URL to your production backend URL once deployed (e.g., Render/Railway)
                const apiUrl = "http://localhost:5000/api/contact";
                
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, subject, message })
                });

                const data = await response.json();

                if (response.ok || data.success) {
                    formMessage.style.color = "#22c55e";
                    formMessage.textContent = "Message sent successfully! Thank you for connecting.";
                    form.reset();
                } else {
                    formMessage.style.color = "#ef4444";
                    formMessage.textContent = data.error || "Failed to send message. Please try again.";
                }
            } catch (error) {
                console.error("Connection error:", error);
                formMessage.style.color = "#ef4444";
                formMessage.textContent = "Unable to connect to the backend server.";
            }
        });
    }
});
