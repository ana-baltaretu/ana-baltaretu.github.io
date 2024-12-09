import { journey } from '../data/journey.js';

function loadCSS(filePath) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = filePath;
    document.head.appendChild(link);
}

// Load the CSS file
loadCSS("assets/css/cards.css");

// Group projects by year
function groupProjectsByYear(projects) {
    const grouped = {};
    projects.forEach(project => {
        if (!grouped[project.year]) {
            grouped[project.year] = [];
        }
        grouped[project.year].push(project);
    });
    return grouped;
}

// Function to create a project card
function createProjectCard(title, imgSrc, description, codeLink = null, resourceLink = null, resourceLabel = "Relevant Resources") {
    // Check for optional links and generate buttons conditionally
    const codeButton = codeLink
        ? `<li><a href="${codeLink}" target="_blank" class="button">Code</a></li>`
        : "";
    const resourceButton = resourceLink
        ? `<li><a href="${resourceLink}" target="_blank" class="button">${resourceLabel}</a></li>`
        : "";

    return `
        <section class="card">
            <div class="card-image">
                ${imgSrc ? `<img src="${imgSrc}" alt="${title}" />` : ""}
            </div>

            <div class="card-content">
                <h2 class="card-title">${title}</h2>
                <p>${description}</p>
            </div>

            <div class="align-buttons">
                <ul class="actions stacked">
                    ${codeButton}
                    ${resourceButton}
                </ul>
            </div>

            
        </section>
        
    `;
}

// Render grouped and sorted projects
function renderProjectsByYear(projects) {
    const groupedProjects = groupProjectsByYear(projects);
    const sortedYears = Object.keys(groupedProjects).sort((a, b) => {
        const getStartYear = year => parseInt(year.split('-')[0]); // Extract the starting year
        return getStartYear(b) - getStartYear(a); // Sort descending based on the starting year
    });
    const projectsContainer = document.getElementById("projects-container");

    sortedYears.forEach(year => {
        // Add year heading
        projectsContainer.innerHTML += `<h2>${year}</h2>`;

        // Add projects for that year
        groupedProjects[year].forEach(project => {
            projectsContainer.innerHTML += createProjectCard(
                project.title,
                project.imgSrc,
                project.description,
                project.codeLink,
                project.resourceLink,
                project.resourceLabel
            );
        });
    });
}

// Call render function
renderProjectsByYear(journey);


