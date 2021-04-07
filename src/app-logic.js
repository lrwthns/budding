/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import {
  format,
  addDays,
  subDays,
  isBefore,
  isAfter,
  parseISO,
} from 'date-fns';
import { changeHeader } from './dom-manipulation';
import createProject from './create-project';
import createTask from './create-task';

const taskList = [];
const projectList = [];

const taskFactory = (title, details, date, priority, project) => ({
  title, details, date, priority, project,
});

// function populateStorage (arr) {
//     localStorage.setItem('savedTaskList', JSON.stringify(arr));
// }

// function checkLocalStorage (arr, container) {
//     if (localStorage.length > 0) {
//         let savedTaskList = localStorage.getItem('savedTaskList');
//         arr = JSON.parse(savedTaskList);
//         return showTaskList(arr, container);
//     }
// }

function checkPriority(container) {
  const low = document.querySelector('#priority-low-checked');
  const medium = document.querySelector('#priority-medium-checked');
  const high = document.querySelector('#priority-high-checked');
  if (container.contains(low)) {
    return 'low';
  } if (container.contains(medium)) {
    return 'medium';
  } if (container.contains(high)) {
    return 'high';
  } return '';
}

function clearTaskInput(priority) {
  document.querySelector('#title-input').value = '';
  document.querySelector('#details-input').value = '';
  document.querySelector('#due-date-input').value = '';
  if (priority === 'low') {
    document
      .querySelector('#priority-low-checked')
      .setAttribute('id', 'priority-low');
  } else if (priority === 'medium') {
    document
      .querySelector('#priority-medium-checked')
      .setAttribute('id', 'priority-medium');
  } else if (priority === 'high') {
    document
      .querySelector('#priority-high-checked')
      .setAttribute('id', 'priority-high');
  }
}

function cleanContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function showTaskList(arr, container) {
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
    const todayArr = taskList.filter((task) => task.date === today);
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
    const thisWeekArr = taskList.filter((task) => {
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
    const projectArr = taskList.filter((task) => task.project === projectName);
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

function showProjectList(arr, container) {
  cleanContainer(container);
  for (let i = 0; i < arr.length; i++) {
    createProject(arr[i], container);
  }
}

function removeTaskFromList(taskTitle, taskDate, container) {
  // eslint-disable-next-line consistent-return
  function findTaskIndex() {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].title === taskTitle && taskList[i].date === taskDate) {
        return i;
      }
    }
  }
  taskList.splice(findTaskIndex(), 1);
  console.log(taskList);
  showTaskList(taskList, container);
}

// eslint-disable-next-line func-names
const runLogic = () => {
  const taskFormContainer = document.querySelector('#pop-up-container');
  const taskForm = document.querySelector('#pop-up');
  const projectForm = document.querySelector('#np-form-container');
  const homePage = document.querySelector('#nav-home');
  const todayPage = document.querySelector('#nav-today');
  const thisWeekPage = document.querySelector('#nav-this-week');
  const taskContainer = document.querySelector('#task-container');
  const projectContainer = document.querySelector('#project-container');
  const newProjectButton = document.querySelector('#np-button');
  const priorityDiv = document.querySelector('#priority-div');
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskTitle = document.querySelector('#title-input').value;
    const taskDetails = document.querySelector('#details-input').value;
    const taskDueDate = document.querySelector('#due-date-input').value;
    const taskPriority = checkPriority(priorityDiv);
    const taskProject = document.querySelector('#header-element').textContent;
    const newTask = taskFactory(
      taskTitle,
      taskDetails,
      taskDueDate,
      taskPriority,
      taskProject,
    );
    taskList.push(newTask);
    // populateStorage(taskList);
    showTaskList(taskList, taskContainer);
    console.log(taskList);
    // clearTaskInput(taskPriority);
    taskFormContainer.style.display = 'none';
  });

  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    cleanContainer(taskContainer);
    const projectInput = document.querySelector('#np-form-input');
    projectList.push(projectInput.value);
    showProjectList(projectList, projectContainer);
    console.log(projectList);
    projectForm.style.display = 'none';
    newProjectButton.style.display = 'flex';
    changeHeader(projectInput.value);
    projectInput.value = '';
    const projects = document.querySelectorAll('.nav-project');
    // const projectDeleteButton = document.querySelector('#delete-project-button');
    projects.forEach((project, index) => {
      project.addEventListener('click', (e) => {
        // if (e.target.parentNode === project) {
        //   projectList.splice(index, 1);
        //   console.log(projectList);
        //   showProjectList(projectList);
        // } else {
          const str = project.textContent;
          const newStr = str.slice(0, str.length - 6);
          changeHeader(newStr);
          showTaskList(taskList, taskContainer);
        // }
      });
      // project.firstChild.addEventListener('click', () => {
      //   projectList.splice(index, 1);
      //   console.log(projectList);
      //   showProjectList(projectList);
      // });
    });
    // projectDeleteButton.addEventListener('click', () => {
    //   function findProjectIndex() {
    //     const str = projectDeleteButton.parentElement.textContent;
    //     const newStr = str.slice(0, str.length - 6);
    //     for (let i = 0; i < projectList.length; i++) {
    //       if (newStr === projectList[i]) {
    //         return i;
    //       }
    //     }
    //     return undefined;
    //   }
    //   projectList.splice(findProjectIndex(), 1);
    //   console.log(projectList);
    //   showProjectList(projectList);
    // });
  });

  homePage.addEventListener('click', () => {
    changeHeader('Home');
    showTaskList(taskList, taskContainer);
  });
  todayPage.addEventListener('click', () => {
    changeHeader('Today');
    showTaskList(taskList, taskContainer);
  });
  thisWeekPage.addEventListener('click', () => {
    changeHeader('This Week');
    showTaskList(taskList, taskContainer);
  });
};

export {
  runLogic,
  removeTaskFromList,
};
