function createNewElement (container, type, className, idName, text = '') {
    const element = document.createElement(type);
    container.appendChild(element);
    if (className != '') {
        element.classList.add(className)
    }
    else {
        element.setAttribute('id', idName);
    }
    element.textContent = text;
    return element;
}

const createNavbarElements = function (container) {
    const appLogo = createNewElement(container, 'div', '', 'app-logo', 'budding');
    const homeElement = createNewElement(container, 'div', '', 'nav-home', 'Home')
    const todayElement = createNewElement(container, 'div', '', 'nav-today', 'Today');
    const thisWeekElement = createNewElement(container, 'div', '', 'nav-this-week', 'This Week');
};

export function createProject (name, container) {
    let project = createNewElement(container, 'div', 'nav-project', '', name);
}

function createProjectButton (container) {
    const newProject = createNewElement(container, 'div', '', 'np-container');
    const newProjectButton = createNewElement(newProject, 'button', '', 'np-button');
    const newProjectForm = createNewElement(newProject, 'form', '', 'np-form-container');
    const formInput = createNewElement(newProjectForm, 'input', '', 'np-form-input');
    const formSubmit = createNewElement(newProjectForm, 'button', '', 'np-form-submit', 'Submit');
    const formCancel = createNewElement(newProjectForm, 'button', '', 'np-form-cancel', 'Cancel');

    formInput.setAttribute('type', 'text');
    formInput.setAttribute('placeholder', 'project name');
    formInput.setAttribute('required', '');
    formSubmit.setAttribute('type', 'submit');

    newProjectButton.innerHTML = '<span class="material-icons">add</span>' + 'Add Project';

    newProjectButton.addEventListener('click', () => {
        newProjectForm.style.display = 'grid';
        newProjectButton.style.display = 'none';
    })

    formCancel.addEventListener('click', () => {
        formInput.value = '';
        newProjectForm.style.display = 'none';
        newProjectButton.style.display = 'flex';
    })
}

//Displays projects in nav-bar
function displayProjects (container) {
    const projectHeadline = createNewElement(container, 'div', '', 'project-headline', 'Projects')
    createProjectButton(container);
    const projectContainer = createNewElement(container, 'div', '', 'project-container') 
}

function createProjectTitle (container) {
    let projectTitle = createNewElement(container, 'div', '', 'dd-project-title', 'Home');
}

//Displays current project title in dynamic display
export function displayProjectTitle (name) {
    let projectTitle = document.querySelector('#dd-project-title');
    projectTitle.textContent = name;
}

function createTaskPopUp (container) {
    const popUpContainer = createNewElement(container, 'div', '', 'pop-up-container');
    const popUp = createNewElement(popUpContainer, 'form', '', 'pop-up');
    const titleInput = createNewElement(popUp, 'input', '', 'title-input');
    const detailsInput = createNewElement(popUp, 'input', '', 'details-input');
    const dueDateInput = createNewElement(popUp, 'input', '', 'due-date-input');
    const priorityInput = createNewElement(popUp, 'div', '', 'priority-div');
    const submitButton = createNewElement(popUp, 'button', '', 'pop-up-submit', 'Submit');
    const priorityLabel = createNewElement(priorityInput, 'div', '', 'priority-label', 'Priority');
    const low = createNewElement(priorityInput, 'div', '', 'priority-low', 'LOW');
    const medium = createNewElement(priorityInput, 'div', '', 'priority-medium', 'MEDIUM');
    const high = createNewElement(priorityInput, 'div', '', 'priority-high', 'HIGH');

    titleInput.setAttribute('placeholder', 'Title');
    titleInput.setAttribute('required', '');
    detailsInput.setAttribute('placeholder', 'Details');
    dueDateInput.setAttribute('placeholder', 'Due Date');
    dueDateInput.setAttribute('type', 'date');
    dueDateInput.setAttribute('required', '');

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

    //this closes the pop-up form if user clicks outside of the form
    popUpContainer.addEventListener('click', (event) => {
        if (event.target != popUp && event.target.parentNode != popUp && event.target.parentNode != priorityInput) {
            titleInput.value = '';
            detailsInput.value = '';
            dueDateInput.value = '';
            low.setAttribute('id', 'priority-low');
            medium.setAttribute('id', 'priority-medium');
            high.setAttribute('id', 'priority-high');
            popUpContainer.style.display = 'none';
        }
    })
};

function createAddTaskButton (container) {
    const addTaskButton = createNewElement(container, 'button', '', 'add-task-button');
    addTaskButton.innerHTML = '<span class="material-icons">add</span>' + 'Add Task';

    addTaskButton.addEventListener('click', () => {
        const popUpContainer = document.querySelector('#pop-up-container');
        popUpContainer.style.display = 'grid';
    })
}

export function createTask (name, date, priority, container) {
    let task = createNewElement(container, 'li', 'user-tasks', '');
    let taskLeftSide = createNewElement(task, 'div', '', 'task-left-side');
    let taskRightSide = createNewElement(task, 'div', '', 'task-right-side');
    let taskPriority = createNewElement(taskLeftSide, 'div', '', 'task-priority-checked');
    let taskCheckbox = createNewElement(taskLeftSide, 'span', 'material-icons', '', 'radio_button_unchecked');
    let taskDesc = createNewElement(taskLeftSide, 'div', '', 'task-desc', name);
    let taskDueDate = createNewElement(taskRightSide, 'div', '', 'task-due-date', date);
    let taskEdit = createNewElement(taskRightSide, 'span', 'material-icons', '', 'edit');
    let taskDelete = createNewElement(taskRightSide, 'span', 'material-icons', '', 'delete');
  
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
    const taskContainer = createNewElement(container, 'div', '', 'task-container');
}

export function displayNavbar () {
    const navbar = document.querySelector('#navigation-bar');
    const dynamicDisplay = document.querySelector('#dynamic-display');
    createNavbarElements(navbar);
    displayProjects(navbar);
    createProjectTitle(dynamicDisplay);
    createTaskPopUp(dynamicDisplay);
    createAddTaskButton(dynamicDisplay);
    displayTasks(dynamicDisplay);
}

