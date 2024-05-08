const projectsSection = document.querySelector("#Projects");
const projectsList = projectsSection.querySelector("ul");

fetch("https://api.github.com/users/Bearandbird/repos")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Error fetching data");
    }
    return res.json();
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const project = document.createElement("li");
      project.innerText = data[i].name;
      projectsList.appendChild(project);
    }
  })
  .catch((error) => {
    const errorElement = document.createElement("p");
    errorElement.innerText = error.message;
    projectsSection.appendChild(errorElement);
  });