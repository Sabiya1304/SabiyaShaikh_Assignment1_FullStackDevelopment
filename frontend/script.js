document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuButton = document.getElementById("menuToggle");
    const menu = document.getElementById("navLinks");

    if (menuButton && menu) {

        menuButton.addEventListener("click", () => {

            const isOpen = menu.classList.toggle("active");

            // Update accessibility attribute
            menuButton.setAttribute("aria-expanded", isOpen);

            // Update button label
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });


        // Close menu when navigation link is clicked
        const links = document.querySelectorAll("#navLinks a");

        links.forEach(link => {

            link.addEventListener("click", () => {

                menu.classList.remove("active");

                menuButton.setAttribute("aria-expanded", "false");

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );
            });

        });
    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const form = document.getElementById("contactForm");

    if (form) {

        form.addEventListener("submit", async (event) => {

            event.preventDefault();


            /* ---------------------------------------------
               GET FORM VALUES
            --------------------------------------------- */

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            const formMessage = document.getElementById("formMessage");
            const submitButton = document.getElementById("submitButton");


            /* ---------------------------------------------
               EMAIL VALIDATION
            --------------------------------------------- */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            /* ---------------------------------------------
               BASIC VALIDATION
            --------------------------------------------- */

            if (!name || !email || !subject || !message) {

                formMessage.textContent =
                    "Please fill in all fields.";

                formMessage.style.color = "#ef4444";

                return;
            }


            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "Please enter a valid email address.";

                formMessage.style.color = "#ef4444";

                return;
            }


            if (message.length < 10) {

                formMessage.textContent =
                    "Message must be at least 10 characters long.";

                formMessage.style.color = "#ef4444";

                return;
            }


            /* ---------------------------------------------
               SHOW SENDING STATUS
            --------------------------------------------- */

            formMessage.textContent =
                "Sending message...";

            formMessage.style.color = "#2563eb";

            submitButton.disabled = true;

            submitButton.textContent = "Sending...";


            /* ---------------------------------------------
               BACKEND API
            --------------------------------------------- */

            const apiUrl =
                "https://sabiya-portfolio-backend.onrender.com/api/contact";


            try {

                const response = await fetch(apiUrl, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        subject,
                        message
                    })

                });


                /* -----------------------------------------
                   READ SERVER RESPONSE
                ----------------------------------------- */

                const data = await response.json();


                /* -----------------------------------------
                   SUCCESS
                ----------------------------------------- */

                if (response.ok) {

                    formMessage.textContent =
                        "Message sent successfully! Thank you for connecting.";

                    formMessage.style.color = "#22c55e";

                    form.reset();

                }


                /* -----------------------------------------
                   SERVER ERROR
                ----------------------------------------- */

                else {

                    formMessage.textContent =
                        data.error ||
                        "Failed to send message. Please try again.";

                    formMessage.style.color = "#ef4444";
                }


            } catch (error) {

                console.error(
                    "Connection error:",
                    error
                );

                formMessage.textContent =
                    "Unable to connect to the backend server.";

                formMessage.style.color = "#ef4444";

            }


            /* ---------------------------------------------
               RESTORE BUTTON
            --------------------------------------------- */

            finally {

                submitButton.disabled = false;

                submitButton.textContent =
                    "Send Message";

            }

        });
    }

});