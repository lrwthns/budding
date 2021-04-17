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

// selects the task elements to show according to the header and pass them to createTask
function displayTasks(arr, container, cbCreateTask, projectId = '') {
  cleanContainer(container);
  const projectName = document.querySelector('#header-element').textContent;
  if (projectName === 'Home') {
    // this displays all tasks
    for (let i = 0; i < arr.length; i++) {
      const taskList = arr[i].tasks;
      for (let j = 0; j < taskList.length; j++) {
        const taskDueDate = format(new Date(taskList[j].date), 'MMMM do');
        cbCreateTask(
          taskList[j].title,
          taskDueDate,
          taskList[j].priority,
          container,
          taskList[j].id,
          taskList[j].taskIsComplete,
          taskList[j].details,
        );
      }
    }
  } else if (projectName === 'Today') {
    // this checks for tasks which are due today and put them in an array
    for (let i = 0; i < arr.length; i++) {
      const taskList = arr[i].tasks;
      const today = format(new Date(), 'y-MM-dd');
      const todayArr = taskList.filter((task) => task.date === today);
      for (let j = 0; j < todayArr.length; j++) {
        const taskDueDate = format(new Date(todayArr[j].date), 'MMMM do');
        cbCreateTask(
          todayArr[j].title,
          taskDueDate,
          todayArr[j].priority,
          container,
          todayArr[j].id,
          todayArr[j].taskIsComplete,
          todayArr[j].details,
        );
      }
    }
  } else if (projectName === 'This Week') {
    for (let i = 0; i < arr.length; i++) {
      const taskList = arr[i].tasks;
      // this checks for tasks which are due in the incoming week and put them in an array
      const thisWeekArr = taskList.filter((task) => {
        const today = new Date();
        const beforeToday = subDays(today, 1);
        const endOfWeek = addDays(today, 6);
        return (
          isAfter(parseISO(task.date), beforeToday)
          && isBefore(parseISO(task.date), endOfWeek)
        );
      });
      for (let j = 0; j < thisWeekArr.length; j++) {
        const taskDueDate = format(new Date(thisWeekArr[j].date), 'MMMM do');
        cbCreateTask(
          thisWeekArr[j].title,
          taskDueDate,
          thisWeekArr[j].priority,
          container,
          thisWeekArr[j].id,
          thisWeekArr[j].taskIsComplete,
          thisWeekArr[j].details,
        );
      }
    }
  } else {
    // this checks for tasks that belong in a project category
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === projectId) {
        const taskList = arr[i].tasks;
        for (let j = 0; j < taskList.length; j++) {
          const taskDueDate = format(new Date(taskList[j].date), 'MMMM do');
          cbCreateTask(
            taskList[j].title,
            taskDueDate,
            taskList[j].priority,
            container,
            taskList[j].id,
            taskList[j].taskIsComplete,
            taskList[j].details,
          );
        }
      }
    }
  }
}

// creates the task element
function createTask(name, date, priority, container, id, taskIsComplete, details) {
  const taskId = id;
  const task = createNewElement(container, 'li', 'user-tasks', '');
  const taskDetails = createNewElement(container, 'div', 'task-details', '', details);
  let taskDetailsVisible = false;
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
  toggleTask(taskIsComplete);

  task.addEventListener('click', (event) => {
    if (event.target !== taskCheckbox && event.target !== taskDelete && event.target !== taskEdit) {
      if (taskDetailsVisible === false) {
        taskDetails.style.display = 'block';
        taskDetailsVisible = true;
      } else {
        taskDetails.style.display = 'none';
        taskDetailsVisible = false;
      }
    }
  });

  taskCheckbox.addEventListener('click', () => {
    let taskStatus = false;
    if (taskCheckbox.textContent === 'radio_button_unchecked') {
      taskStatus = true;
    }
    User.changeTaskStatus(taskId, taskStatus);
    toggleTask(taskStatus);
  });

  taskDelete.addEventListener('click', () => {
    const taskContainer = document.querySelector('#task-container');
    const projectId = User.projectList[User.currentProjectIndex].id;
    User.removeTaskFromList(taskId);
    displayTasks(User.projectList, taskContainer, createTask, projectId);
  });

  taskEdit.addEventListener('click', () => {
    const popUpContainer = document.querySelector('#pop-up-container');
    const titleInput = document.querySelector('#title-input');
    const detailsInput = document.querySelector('#details-input');
    const dateInput = document.querySelector('#due-date-input');
    const low = document.querySelector('#priority-low');
    const medium = document.querySelector('#priority-medium');
    const high = document.querySelector('#priority-high');
    // calls the function that will show the task info on the pop-up form
    User.showTaskInfo(
      taskId,
      popUpContainer,
      titleInput,
      detailsInput,
      dateInput,
      low,
      medium,
      high,
    );
  });
}

// creates the project element
function createProject(id, name, container, callback) {
  const project = createNewElement(container, 'div', 'nav-project', '', name);
  const projectDelete = createNewElement(
    project,
    'span',
    'material-icons',
    '',
    'delete',
  );
  projectDelete.setAttribute('id', 'delete-project-button');
  projectDelete.addEventListener('click', () => {
    const taskContainer = document.querySelector('#task-container');
    changeHeader('Home');
    User.removeProjectFromList(id);
    callback(User.projectList, container);
    displayTasks(User.projectList, taskContainer, createTask);
  });
}

// displays the projects from the project list array and attach an event listener to each of them
function displayProjects(arr, container) {
  cleanContainer(container);
  for (let i = 1; i < arr.length; i++) {
    createProject(arr[i].id, arr[i].title, container, displayProjects);
  }
  const projects = document.querySelectorAll('.nav-project');
  const taskContainer = document.querySelector('#task-container');
  projects.forEach((project, index) => {
    project.addEventListener('click', (e) => {
      // this is so that the delete button doesn't get triggered
      if (e.target.parentNode !== project) {
        // this is to ignore projectList[0] because it doesn't belong to the project container
        const currentIndex = index + 1;
        User.currentProjectIndex = currentIndex;
        const str = User.projectList[currentIndex].title;
        changeHeader(str);
        displayTasks(
          User.projectList,
          taskContainer,
          createTask,
          User.projectList[currentIndex].id,
        );
      }
    });
  });
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
      User.currentProjectIndex = 0;
      const taskContainer = document.querySelector('#task-container');
      changeHeader(element.textContent);
      displayTasks(User.projectList, taskContainer, createTask);
    });
  });
  return {
    appLogo,
    homeElement,
    todayElement,
    thisWeekElement,
  };
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
    event.preventDefault();
    // this is to avoid name conflict in a subsequent function like changeHeader
    // but I can do something better later on
    if (formInput.value === 'Home' || formInput.value === 'Today' || formInput.value === 'This Week') {
      alert('Please use another name!');
    } else {
      const taskContainer = document.querySelector('#task-container');
      const projectContainer = document.querySelector('#project-container');
      cleanContainer(taskContainer);
      const newProjectObj = Project(formInput.value, []);
      const projectObj = newProjectObj.getObjLiteral();
      User.projectList.push(projectObj);
      User.populateStorage(User.projectList);
      User.currentProjectIndex = User.projectList.indexOf(projectObj);
      changeHeader(projectObj.title);
      displayProjects(User.projectList, projectContainer);
      cleanForm();
    }
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
  const detailsInput = createNewElement(popUp, 'textarea', '', 'details-input');
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
  titleInput.setAttribute('required', '');
  detailsInput.setAttribute('placeholder', 'Details');
  dueDateInput.setAttribute('placeholder', 'Due Date');
  dueDateInput.setAttribute('type', 'date');
  dueDateInput.setAttribute('required', '');

  function cleanForm() {
    titleInput.value = '';
    detailsInput.value = '';
    dueDateInput.value = '';
    low.setAttribute('id', 'priority-low');
    medium.setAttribute('id', 'priority-medium');
    high.setAttribute('id', 'priority-high');
    popUpContainer.style.display = 'none';
  }

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
      cleanForm();
    }
  });

  // this stores and displays the form values
  popUp.addEventListener('submit', (event) => {
    event.preventDefault();
    const projectId = User.projectList[User.currentProjectIndex].id;
    const taskContainer = document.querySelector('#task-container');
    const isEditing = User.isEditingTask;
    const defaultProject = User.projectList[User.currentProjectIndex];
    // if it's a new task it goes here
    if (isEditing === false) {
      let header = document.querySelector('#header-element').textContent;
      if (header === 'This Week' || header === 'Today') {
        header = 'Home';
      }
      const newTask = Task(
        titleInput.value,
        detailsInput.value,
        dueDateInput.value,
        priority,
        defaultProject.id,
      );
      defaultProject.tasks.push(newTask.getObjLiteral());
      User.populateStorage(User.projectList);
    // if it's a task that's being edited it goes here
    } else {
      User.editTask(
        User.currentTaskId,
        titleInput.value,
        detailsInput.value,
        dueDateInput.value,
        priority,
      );
    }
    displayTasks(User.projectList, taskContainer, createTask, projectId);
    cleanForm();
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
  const projectContainer = document.querySelector('#project-container');
  const taskContainer = document.querySelector('#task-container');
  // this checks for a saved list in local storage
  User.checkLocalStorage(
    projectContainer,
    taskContainer,
    displayProjects,
    displayTasks,
    createTask,
  );
  // if there's no saved list it pushes a new default project to the projectList
  if (User.projectList === []) {
    const defaultProject = Project('default', []);
    User.projectList.push(defaultProject.getObjLiteral());
  }
}

export default updateDisplay;
