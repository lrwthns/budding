import createNewElement from './dom-manipulation-helper';

const createNavbarElements = (container) => {
  const appLogo = createNewElement(container, 'div', '', 'app-logo', 'budding');
  const homeElement = createNewElement(
    container,
    'div',
    '',
    'nav-home',
    'Home',
  );
  const todayElement = createNewElement(
    container,
    'div',
    '',
    'nav-today',
    'Today',
  );
  const thisWeekElement = createNewElement(
    container,
    'div',
    '',
    'nav-this-week',
    'This Week',
  );
  return {
    appLogo,
    homeElement,
    todayElement,
    thisWeekElement,
  };
};

function createProjectButton(container) {
  const newProject = createNewElement(container, 'div', '', 'np-container');
  const newProjectButton = createNewElement(
    newProject,
    'button',
    '',
    'np-button',
  );
  const newProjectForm = createNewElement(
    newProject,
    'form',
    '',
    'np-form-container',
  );
  const formInput = createNewElement(
    newProjectForm,
    'input',
    '',
    'np-form-input',
  );
  const formSubmit = createNewElement(
    newProjectForm,
    'button',
    '',
    'np-form-submit',
    'Submit',
  );
  const formCancel = createNewElement(
    newProjectForm,
    'button',
    '',
    'np-form-cancel',
    'Cancel',
  );

  formInput.setAttribute('type', 'text');
  formInput.setAttribute('placeholder', 'project name');
  formInput.setAttribute('required', '');
  formSubmit.setAttribute('type', 'submit');

  newProjectButton.innerHTML = '<span class="material-icons">add</span> Add Project';

  newProjectButton.addEventListener('click', () => {
    newProjectForm.style.display = 'grid';
    newProjectButton.style.display = 'none';
  });

  formCancel.addEventListener('click', () => {
    formInput.value = '';
    newProjectForm.style.display = 'none';
    newProjectButton.style.display = 'flex';
  });
}

// Displays projects in nav-bar
function createNavbarProjectElements(container) {
  const projectHeadline = createNewElement(
    container,
    'div',
    '',
    'project-headline',
    'Projects',
  );
  createProjectButton(container);
  const projectContainer = createNewElement(
    container,
    'div',
    '',
    'project-container',
  );
  return {
    projectHeadline,
    projectContainer,
  };
}

function createHeaderElement(container) {
  const title = createNewElement(
    container,
    'div',
    '',
    'header-element',
    'Home',
  );
  return title;
}

function createTaskPopUp(container) {
  const popUpContainer = createNewElement(
    container,
    'div',
    '',
    'pop-up-container',
  );
  const popUp = createNewElement(popUpContainer, 'form', '', 'pop-up');
  const titleInput = createNewElement(popUp, 'input', '', 'title-input');
  const detailsInput = createNewElement(popUp, 'input', '', 'details-input');
  const dueDateInput = createNewElement(popUp, 'input', '', 'due-date-input');
  const priorityInput = createNewElement(popUp, 'div', '', 'priority-div');
  const submitButton = createNewElement(
    popUp,
    'button',
    '',
    'pop-up-submit',
    'Submit',
  );
  const priorityLabel = createNewElement(
    priorityInput,
    'div',
    '',
    'priority-label',
    'Priority',
  );
  const low = createNewElement(priorityInput, 'div', '', 'priority-low', 'LOW');
  const medium = createNewElement(
    priorityInput,
    'div',
    '',
    'priority-medium',
    'MEDIUM',
  );
  const high = createNewElement(
    priorityInput,
    'div',
    '',
    'priority-high',
    'HIGH',
  );

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
  });
  medium.addEventListener('click', () => {
    low.setAttribute('id', 'priority-low');
    medium.setAttribute('id', 'priority-medium-checked');
    high.setAttribute('id', 'priority-high');
  });
  high.addEventListener('click', () => {
    low.setAttribute('id', 'priority-low');
    medium.setAttribute('id', 'priority-medium');
    high.setAttribute('id', 'priority-high-checked');
  });

  // this closes the pop-up form if user clicks outside of the form
  popUpContainer.addEventListener('click', (event) => {
    if (
      event.target !== popUp
      && event.target.parentNode !== popUp
      && event.target.parentNode !== priorityInput
    ) {
      titleInput.value = '';
      detailsInput.value = '';
      dueDateInput.value = '';
      low.setAttribute('id', 'priority-low');
      medium.setAttribute('id', 'priority-medium');
      high.setAttribute('id', 'priority-high');
      popUpContainer.style.display = 'none';
    }
  });
}

function createAddTaskButton(container) {
  const addTaskButton = createNewElement(
    container,
    'button',
    '',
    'add-task-button',
  );
  addTaskButton.innerHTML = '<span class="material-icons">add</span>Add Task';

  addTaskButton.addEventListener('click', () => {
    const popUpContainer = document.querySelector('#pop-up-container');
    popUpContainer.style.display = 'grid';
  });
}

function createTaskContainer(container) {
  const taskContainer = createNewElement(
    container,
    'div',
    '',
    'task-container',
  );
  return taskContainer;
}

function displayInitialElements() {
  const navbar = document.querySelector('#navigation-bar');
  const dynamicDisplay = document.querySelector('#dynamic-display');
  createNavbarElements(navbar);
  createNavbarProjectElements(navbar);
  createHeaderElement(dynamicDisplay);
  createTaskPopUp(dynamicDisplay);
  createAddTaskButton(dynamicDisplay);
  createTaskContainer(dynamicDisplay);
}

// Displays current project title in header
function changeHeader(name) {
  const header = document.querySelector('#header-element');
  header.textContent = name;
}

export {
  displayInitialElements,
  changeHeader,
};
