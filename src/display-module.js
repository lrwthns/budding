function displayAppLogo (container) {
    const appLogo = document.createElement('div');
    container.appendChild(appLogo);
    appLogo.textContent = 'budding';
    appLogo.setAttribute('id', 'app-logo');
}

function createTodayElement (container) {
    const todayElement = document.createElement('div');

    container.appendChild(todayElement);

    todayElement.setAttribute('id', 'nav-today');

    todayElement.textContent = 'Today';

}

function createThisWeekElement (container) {
    const thisWeekElement = document.createElement('div');

    container.appendChild(thisWeekElement);

    thisWeekElement.setAttribute('id', 'nav-this-week');

    thisWeekElement.textContent = 'This Week';
}

function createProject (name, container) {
    let project = document.createElement('div');
    
    container.appendChild(project);

    project.classList.add('nav-project');

    project.textContent = name;
}

function createNewProjectButton (container) {
    const newProject = document.createElement('div');
    const newProjectButton = document.createElement('button');
    const newProjectForm = document.createElement('form');
    const formInput = document.createElement('input');
    const formSubmit = document.createElement('button');
    const formCancel = document.createElement('button');

    container.appendChild(newProject);
    newProject.appendChild(newProjectButton);
    newProject.appendChild(newProjectForm);
    newProjectForm.appendChild(formInput);
    newProjectForm.appendChild(formSubmit);
    newProjectForm.appendChild(formCancel);

    newProject.setAttribute('id', 'np-container');
    newProjectButton.setAttribute('id', 'np-button');
    newProjectForm.setAttribute('id', 'np-form-container');
    formInput.setAttribute('id', 'np-form-input');
    formInput.setAttribute('type', 'text');
    formInput.setAttribute('required', '');
    formSubmit.setAttribute('id', 'np-form-submit');
    formSubmit.setAttribute('type', 'submit');

    newProjectButton.textContent = 'Add New Project';
    formSubmit.textContent = 'Submit';
    formCancel.textContent = 'Cancel';

    newProjectButton.addEventListener('click', () => {
        newProjectForm.style.display = 'block';
        newProjectButton.style.display = 'none';
    })

    formCancel.addEventListener('click', () => {
        newProjectForm.style.display = 'none';
        newProjectButton.style.display = 'block';
    })
}

function displayProjects (container) {
    const projectContainer = document.createElement('div');
    const projectHeadline = document.createElement('div');
    container.appendChild(projectContainer);
    projectContainer.appendChild(projectHeadline);

    projectContainer.setAttribute('id', 'project-container')
    projectHeadline.setAttribute('id', 'project-headline');

    projectHeadline.textContent = 'Projects';

    createNewProjectButton(container);
    createProject('Work', projectContainer);
    createProject('Gardening', projectContainer);

}

function displayProjectTitle (name, container) {
    let projectTitle = document.createElement('div');

    container.appendChild(projectTitle);

    projectTitle.setAttribute('id', 'dd-project-title');

    projectTitle.textContent = name;
}

function createTask (name, date, container) {
    let task = document.createElement('div');

    container.appendChild(task);

    task.classList.add('tasks');

}

function displayTasks () {

}

export function displayNavbar () {
    const navbar = document.querySelector('#navigation-bar');
    const dynamicDisplay = document.querySelector('#dynamic-display');
    displayAppLogo(navbar);
    createTodayElement(navbar);
    createThisWeekElement(navbar);
    displayProjects(navbar);
    displayProjectTitle('Work', dynamicDisplay);
}

