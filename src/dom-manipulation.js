/* eslint-disable no-plusplus */
import {
  format,
  addDays,
  subDays,
  isBefore,
  isAfter,
  parseISO,
} from 'date-fns';
import createNewElement from './dom-manipulation-helper';
import { userModule as User, taskFactory as Task, projectFactory as Project } from './app-logic';

function changeHeader(name) {
  const header = document.querySelector('#header-element');
  header.textContent = name;
}

function cleanContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function createProject(name, container) {
  const project = createNewElement(container, 'div', 'nav-project', '', name);
  const projectDelete = createNewElement(
    project,
    'span',
    'material-icons',
    '',
    'delete',
  );
  projectDelete.setAttribute('id', 'delete-project-button');
  return {
    project,
    projectDelete,
  };
}

function createTask(name, date, priority, container) {
  const task = createNewElement(container, 'li', 'user-tasks', '');
  const taskLeftSide = createNewElement(task, 'div', '', 'task-left-side');
  const taskRightSide = createNewElement(task, 'div', '', 'task-right-side');
  const taskPriority = createNewElement(
    taskLeftSide,
    'div',
    '',
    'task-priority-checked',
  );
  const taskCheckbox = createNewElement(
    taskLeftSide,
    'span',
    'material-icons',
    '',
    'radio_button_unchecked',
  );
  const taskDesc = createNewElement(taskLeftSide, 'div', '', 'task-desc', name);
  const taskDueDate = createNewElement(
    taskRightSide,
    'div',
    '',
    'task-due-date',
    date,
  );
  const taskEdit = createNewElement(
    taskRightSide,
    'span',
    'material-icons',
    '',
    'edit',
  );
  const taskDelete = createNewElement(
    taskRightSide,
    'span',
    'material-icons',
    '',
    'delete',
  );

  taskEdit.setAttribute('id', 'task-edit-span');
  taskDelete.setAttribute('id', 'task-edit-span');

  function setPriority(element) {
    if (element === 'low') {
      taskPriority.setAttribute('id', 'task-priority-low');
    } else if (element === 'medium') {
      taskPriority.setAttribute('id', 'task-priority-medium');
    } else if (element === 'high') {
      taskPriority.setAttribute('id', 'task-priority-high');
    } else {
      taskPriority.setAttribute('id', 'task-priority');
    }
  }
  setPriority(priority);

  function toggleTask(bool) {
    if (bool === true) {
      taskCheckbox.textContent = 'check_circle';
      taskDesc.setAttribute('id', 'task-desc-checked');
      taskDueDate.setAttribute('id', 'task-due-date-checked');
      taskPriority.setAttribute('id', 'task-priority-checked');
    } else {
      taskCheckbox.textContent = 'radio_button_unchecked';
      taskDesc.setAttribute('id', 'task-desc');
      taskDueDate.setAttribute('id', 'task-due-date');
      setPriority(priority);
    }
  }

  //let tasks = document.querySelectorAll('.user-tasks'); 
  // tasks.forEach((task) => {
  //   task.delete.addEventListener()
  //   task.edit.addEventListener()
  //   task.toggle.addEventListener()
  // })

  taskCheckbox.addEventListener('click', () => {
    if (taskCheckbox.textContent === 'radio_button_unchecked') {
      toggleTask(true);
    } else {
      toggleTask(false);
    }
  });

  // taskDelete.addEventListener('click', () => {
  //   logic.removeTaskFromList(taskDesc.textContent, taskDueDate.textContent);
  // });
}

function displayProjects(arr, container) {
  cleanContainer(container);
  for (let i = 0; i < arr.length; i++) {
    createProject(arr[i], container);
  }
}

function displayTasks(arr, container) {
  cleanContainer(container);
  const projectName = document.querySelector('#header-element').textContent;
  if (projectName === 'Home') {
    // this displays all tasks
    for (let i = 0; i < arr.length; i++) {
      // let taskDueDate = format(new Date(arr[i].date),'MMMM do');
      // createTask(arr[i].title, taskDueDate, arr[i].priority, container);
      createTask(arr[i].title, arr[i].date, arr[i].priority, container);
    }
  } else if (projectName === 'Today') {
    // this checks for tasks which are due today and put them in an array
    const today = format(new Date(), 'y-MM-dd');
    const todayArr = arr.filter((task) => task.date === today);
    for (let i = 0; i < todayArr.length; i++) {
      const taskDueDate = format(new Date(todayArr[i].date), 'MMMM do');
      createTask(
        todayArr[i].title,
        taskDueDate,
        todayArr[i].priority,
        container,
      );
    }
  } else if (projectName === 'This Week') {
    // this checks for tasks which are due in the incoming week and put them in an array
    const thisWeekArr = arr.filter((task) => {
      const today = new Date();
      const beforeToday = subDays(today, 1);
      const endOfWeek = addDays(today, 6);
      return (
        isAfter(parseISO(task.date), beforeToday)
        && isBefore(parseISO(task.date), endOfWeek)
      );
    });
    for (let i = 0; i < thisWeekArr.length; i++) {
      const taskDueDate = format(new Date(thisWeekArr[i].date), 'MMMM do');
      createTask(
        thisWeekArr[i].title,
        taskDueDate,
        thisWeekArr[i].priority,
        container,
      );
    }
  } else {
    // this checks for tasks that belong in a project category
    const projectArr = arr.filter((task) => task.project === projectName);
    for (let i = 0; i < projectArr.length; i++) {
      const taskDueDate = format(new Date(projectArr[i].date), 'MMMM do');
      createTask(
        projectArr[i].title,
        taskDueDate,
        projectArr[i].priority,
        container,
      );
    }
  }
}

const createNavbarElements = (container) => {
  const appLogo = createNewElement(container, 'div', '', 'app-logo', 'budding');
  const homeElement = createNewElement(
    container,
    'div',
    'navbar-elements',
    'nav-home',
    'Home',
  );
  const todayElement = createNewElement(
    container,
    'div',
    'navbar-elements',
    'nav-today',
    'Today',
  );
  const thisWeekElement = createNewElement(
    container,
    'div',
    'navbar-elements',
    'nav-this-week',
    'This Week',
  );

  const navbarElements = document.querySelectorAll('.navbar-elements');

  navbarElements.forEach((element) => {
    element.addEventListener('click', () => {
      const taskContainer = document.querySelector('#task-container');
      changeHeader(element.textContent);
      displayTasks(User.taskList, taskContainer);
    });
  });
};

function createProjectForm(container) {
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

  function cleanForm() {
    formInput.value = '';
    newProjectForm.style.display = 'none';
    newProjectButton.style.display = 'flex';
  }

  newProjectButton.addEventListener('click', () => {
    newProjectForm.style.display = 'grid';
    newProjectButton.style.display = 'none';
  });

  formCancel.addEventListener('click', () => {
    cleanForm();
  });

  newProjectForm.addEventListener('submit', (event) => {
    const taskContainer = document.querySelector('#task-container');
    const projectContainer = document.querySelector('#project-container');
    event.preventDefault();
    cleanContainer(taskContainer);
    User.projectList.push(formInput.value);
    displayProjects(User.projectList, projectContainer);
    console.log(User.projectList);
    changeHeader(formInput.value);
    cleanForm();
    const projects = document.querySelectorAll('.nav-project');
    projects.forEach((project) => {
      project.addEventListener('click', () => {
        const str = project.textContent;
        const newStr = str.slice(0, str.length - 6);
        changeHeader(newStr);
        displayTasks(User.taskList, taskContainer);
      });
    });
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
  createProjectForm(container);
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
  let priority = '';
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
  // titleInput.setAttribute('required', '');
  detailsInput.setAttribute('placeholder', 'Details');
  dueDateInput.setAttribute('placeholder', 'Due Date');
  dueDateInput.setAttribute('type', 'date');
  // dueDateInput.setAttribute('required', '');

  low.addEventListener('click', () => {
    low.setAttribute('id', 'priority-low-checked');
    medium.setAttribute('id', 'priority-medium');
    high.setAttribute('id', 'priority-high');
    priority = 'low';
  });
  medium.addEventListener('click', () => {
    low.setAttribute('id', 'priority-low');
    medium.setAttribute('id', 'priority-medium-checked');
    high.setAttribute('id', 'priority-high');
    priority = 'medium';
  });
  high.addEventListener('click', () => {
    low.setAttribute('id', 'priority-low');
    medium.setAttribute('id', 'priority-medium');
    high.setAttribute('id', 'priority-high-checked');
    priority = 'high';
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

  // this stores and displays the form values
  popUp.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskContainer = document.querySelector('#task-container');
    const header = document.querySelector('#header-element').textContent;
    const newTask = Task(
      titleInput.value,
      detailsInput.value,
      dueDateInput.value,
      priority,
      header,
    );
    User.taskList.push(newTask.getObjLiteral());
    console.log(User.taskList);
    displayTasks(User.taskList, taskContainer);
    popUpContainer.style.display = 'none';
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

function updateDisplay() {
  const navbar = document.querySelector('#navigation-bar');
  const dynamicDisplay = document.querySelector('#dynamic-display');
  createNavbarElements(navbar);
  createNavbarProjectElements(navbar);
  createHeaderElement(dynamicDisplay);
  createTaskPopUp(dynamicDisplay);
  createAddTaskButton(dynamicDisplay);
  createTaskContainer(dynamicDisplay);
}

export {
  updateDisplay,
};
