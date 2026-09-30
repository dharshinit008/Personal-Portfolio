const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        });

        const data = await response.json();

        formMessage.textContent = data.message;
        formMessage.style.color = "green";

        contactForm.reset();

    } catch (error) {
        formMessage.textContent = "Something went wrong. Please try again.";
        formMessage.style.color = "red";
    }
});
async function loadProjects() {
    try {
        const response = await fetch("http://localhost:5000/projects");
        const projects = await response.json();

        console.log("Projects from MongoDB:", projects);

        const projectsContainer = document.querySelector(".projects-container");

        projectsContainer.innerHTML = "";

        projects.forEach(project => {
            projectsContainer.innerHTML += `
                <div class="project-card">
                    <h3>${project.title}</h3>

                    <p>${project.description}</p>

                    <p class="tech">
                        Technologies: ${project.technologies.join(", ")}
                    </p>

                    <a href="${project.githubLink}" target="_blank">
                        GitHub
                    </a>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

loadProjects();
