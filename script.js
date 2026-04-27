document.addEventListener("DOMContentLoaded", () => {
    const url = 'data.json';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Błąd podczas pobierania danych JSON");
            }
            return response.json();
        })
        .then(data => {
            console.log("Dane załadowane pomyślnie dla indeksu:", data.index);
            
            renderSkills(data.skills);
            renderProjects(data.projects);
        })
        .catch(error => {
            console.error("Wystąpił problem:", error);
        });
});

function renderSkills(skillsArray) {
    const listElement = document.getElementById('skills-list');

    skillsArray.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        listElement.appendChild(li);
    });
}

function renderProjects(projectsArray) {
    const listElement = document.getElementById('projects-list');

    projectsArray.forEach(project => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${project.name}</strong>: ${project.desc}`;
        listElement.appendChild(li);
    });
}