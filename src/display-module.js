function displayAppLogo (container) {
    const appLogo = document.createElement('div');
    container.appendChild(appLogo);
    appLogo.textContent = 'budding';
    appLogo.setAttribute('id', 'app-logo');
}

function createNavElement (container, text, id) {
    const element = document.createElement('div');
    container.appendChild(element);
    element.setAttribute('id', id);
    element.textContent = text;
    return element;
}

function createNavbarElements (container) {
    const homeElement = createNavElement(container, 'Home', 'nav-home')
    const todayElement = createNavElement(container, 'Today', 'nav-today');
    const thisWeekElement = createNavElement(container, 'This Week', 'nav-this-week');
    return {
        homeElement,
        todayElement,
        thisWeekElement
    }
}

export function createProject (name, container) {
    let project = document.createElement('div');
    
    container.appendChild(project);

    project.classList.add('nav-project');

    project.textContent = name;
}

function createProjectButton (container) {
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
    formInput.setAttribute('placeholder', 'project name');
    formInput.setAttribute('required', '');
    formSubmit.setAttribute('id', 'np-form-submit');
    formSubmit.setAttribute('type', 'submit');
    formCancel.setAttribute('id', 'np-form-cancel')

    newProjectButton.innerHTML = '<span class="material-icons">add</span>' + 'Add Project';
    formSubmit.textContent = 'Submit';
    formCancel.textContent = 'Cancel';

    newProjectButton.addEventListener('click', () => {
        newProjectForm.style.display = 'grid';
        newProjectButton.style.display = 'none';
    })

    formCancel.addEventListener('click', () => {
        newProjectForm.style.display = 'none';
        newProjectButton.style.display = 'flex';
    })
}

//Displays projects in nav-bar
function displayProjects (container) {
    const projectContainer = document.createElement('div');
    const projectHeadline = document.createElement('div');
    container.appendChild(projectHeadline);
    createProjectButton(container);
    container.appendChild(projectContainer);

    projectContainer.setAttribute('id', 'project-container')
    projectHeadline.setAttribute('id', 'project-headline');

    projectHeadline.textContent = 'Projects';
}

function createProjectTitle (name, container) {
    
    let projectTitle = document.createElement('div');

    container.appendChild(projectTitle);

    projectTitle.setAttribute('id', 'dd-project-title');

    projectTitle.textContent = name;
}

//Displays current project title in dynamic display
export function displayProjectTitle (name) {
    let projectTitle = document.querySelector('#dd-project-title');
    
    projectTitle.textContent = name;
}

function createTaskPopUp (container) {
    const popUpContainer = document.createElement('div');
    const popUp = document.createElement('form');
    const titleInput = document.createElement('input');
    const detailsInput = document.createElement('input');
    const dueDateInput = document.createElement('input');
    const priorityInput = document.createElement('div');
    const submitButton = document.createElement('button');
    const priorityLabel = document.createElement('div');
    const low = document.createElement('div');
    const medium = document.createElement('div');
    const high = document.createElement('div');
    
    container.appendChild(popUpContainer);
    popUpContainer.appendChild(popUp);
    popUp.appendChild(titleInput);
    popUp.appendChild(detailsInput);
    popUp.appendChild(dueDateInput);
    popUp.appendChild(priorityInput);
    popUp.appendChild(submitButton);
    priorityInput.appendChild(priorityLabel);
    priorityInput.appendChild(low);
    priorityInput.appendChild(medium);
    priorityInput.appendChild(high);

    popUpContainer.setAttribute('id', 'pop-up-container');
    popUp.setAttribute('id', 'pop-up');
    titleInput.setAttribute('id', 'title-input');
    titleInput.setAttribute('placeholder', 'Title');
    titleInput.setAttribute('required', '');
    detailsInput.setAttribute('id', 'details-input');
    detailsInput.setAttribute('placeholder', 'Details');
    dueDateInput.setAttribute('id', 'due-date-input');
    dueDateInput.setAttribute('placeholder', 'Due Date');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('required', '');
    priorityInput.setAttribute('id', 'priority-div');
    submitButton.setAttribute('id', 'pop-up-submit');
    priorityLabel.setAttribute('id', 'priority-label');
    low.setAttribute('id', 'priority-low');
    medium.setAttribute('id', 'priority-medium');
    high.setAttribute('id', 'priority-high');

    submitButton.textContent = 'Submit';
    priorityLabel.textContent = 'Priority';
    low.textContent = 'LOW';
    medium.textContent = 'MEDIUM';
    high.textContent = 'HIGH';

    low.addEventListener('click', () => {
        low.setAttribute('id', 'priority-low-checked');
        medium.setAttribute('id', 'priority-medium');
        high.setAttribute('id', 'priority-high');
    })
    medium.addEventListener('click', () => {
        low.setAttribute('id', 'priority-low');
        medium.setAttribute('id', 'priority-medium-checked');
        high.setAttribute('id', 'priority-high');
    })
    high.addEventListener('click', () => {
        low.setAttribute('id', 'priority-low');
        medium.setAttribute('id', 'priority-medium');
        high.setAttribute('id', 'priority-high-checked');
    })

};

function createAddTaskButton (container) {
    const addTaskButton = document.createElement('button');

    container.appendChild(addTaskButton);

    addTaskButton.setAttribute('id', 'add-task-button');

    addTaskButton.innerHTML = '<span class="material-icons">add</span>' + 'Add Task';

    addTaskButton.addEventListener('click', () => {
        const popUpContainer = document.querySelector('#pop-up-container');
        popUpContainer.style.display = 'grid';
    })
    
}

export function createTask (name, date, priority, container) {
    let task = document.createElement('li');
    let taskLeftSide = document.createElement('div')
    let taskRightSide = document.createElement('div');
    let taskCheckbox = document.createElement('span');
    let taskDesc = document.createElement('div');
    let taskPriority = document.createElement('div');
    let taskDueDate = document.createElement('div');
    let taskEdit = document.createElement('span');
    let taskDelete = document.createElement('span');

    container.appendChild(task);
    task.appendChild(taskLeftSide);
    taskLeftSide.appendChild(taskPriority);
    taskLeftSide.appendChild(taskCheckbox);
    taskLeftSide.appendChild(taskDesc);
    task.appendChild(taskRightSide);
    taskRightSide.appendChild(taskDueDate);
    taskRightSide.appendChild(taskEdit);
    taskRightSide.appendChild(taskDelete);

    task.classList.add('user-tasks');
    taskCheckbox.classList.add('material-icons');
    taskEdit.classList.add('material-icons');
    taskDelete.classList.add('material-icons');
    taskLeftSide.setAttribute('id', 'task-left-side');
    taskDesc.setAttribute('id', 'task-desc');
    taskRightSide.setAttribute('id', 'task-right-side');
    taskDueDate.setAttribute('id', 'task-due-date');

    function setPriority (priority) {
        if (priority == 'low') {
            taskPriority.setAttribute('id', 'task-priority-low');
        } else if (priority == 'medium') {
            taskPriority.setAttribute('id', 'task-priority-medium');
        } else if (priority == 'high') {
            taskPriority.setAttribute('id', 'task-priority-high');
        } else {
            taskPriority.setAttribute('id', 'task-priority');
        }
    }

    setPriority(priority);
    taskCheckbox.textContent = 'radio_button_unchecked';
    taskDesc.textContent = name;
    taskDueDate.textContent = date;
    taskEdit.textContent = 'edit';
    taskDelete.textContent = 'delete';

    taskCheckbox.addEventListener('click', () => {
        if (taskCheckbox.textContent == 'radio_button_unchecked') {
            taskCheckbox.textContent = 'check_circle';
            taskDesc.setAttribute('id', 'task-desc-checked');
            taskDueDate.setAttribute('id', 'task-due-date-checked');
            taskPriority.setAttribute('id', 'task-priority-checked');
        }
        else {
            taskCheckbox.textContent = 'radio_button_unchecked';
            taskDesc.setAttribute('id', 'task-desc');
            taskDueDate.setAttribute('id', 'task-due-date');
            setPriority(priority);
        }
    })
}

function displayTasks (container) {
    const taskContainer = document.createElement('div');
    taskContainer.setAttribute('id', 'task-container');
    container.appendChild(taskContainer);
}

export function displayNavbar () {
    const navbar = document.querySelector('#navigation-bar');
    const dynamicDisplay = document.querySelector('#dynamic-display');
    displayAppLogo(navbar);
    createNavbarElements(navbar);
    displayProjects(navbar);
    createProjectTitle('Home', dynamicDisplay);
    createTaskPopUp(dynamicDisplay);
    createAddTaskButton(dynamicDisplay);
    displayTasks(dynamicDisplay);
}

