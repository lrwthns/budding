import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const userModule = (() => {
  const projectList = [];
  const isEditingTask = false;
  const currentTaskId = '';
  const currentProjectIndex = 0;

  function populateStorage(arr) {
    localStorage.setItem('savedProjectList', JSON.stringify(arr));
  }

  function checkLocalStorage(
    projectContainer,
    taskContainer,
    cbDisplayProjects,
    cbDisplayTasks,
    cbCreateTask,
  ) {
    if (localStorage.length > 0) {
      const savedProjectList = localStorage.getItem('savedProjectList');
      userModule.projectList = JSON.parse(savedProjectList);
      cbDisplayProjects(userModule.projectList, projectContainer);
      cbDisplayTasks(userModule.projectList, taskContainer, cbCreateTask);
    }
  }

  function changeTaskStatus(taskId, newBool) {
    for (let i = 0; i < userModule.projectList.length; i++) {
      const taskList = userModule.projectList[i].tasks;
      for (let j = 0; j < taskList.length; j++) {
        if (taskList[j].id === taskId) {
          taskList[j].taskIsComplete = newBool;
          populateStorage(userModule.projectList);
        }
      }
    }
  }
  function removeTaskFromList(taskId) {
    for (let i = 0; i < userModule.projectList.length; i++) {
      const taskList = userModule.projectList[i].tasks;
      for (let j = 0; j < taskList.length; j++) {
        if (taskList[j].id === taskId) {
          taskList.splice(j, 1);
          populateStorage(userModule.projectList);
        }
      }
    }
  }
  function removeProjectFromList(projectId) {
    for (let i = 0; i < userModule.projectList.length; i++) {
      if (userModule.projectList[i].id === projectId) {
        userModule.projectList.splice(i, 1);
        // when a project is deleted from the list the page will go back to 'Home'
        if (userModule.currentProjectIndex > 0) {
          userModule.currentProjectIndex -= 1;
        }
        populateStorage(userModule.projectList);
      }
    }
  }

  function showTaskInfo(taskId, container, titleElem, detailsElem, dateElem, low, medium, high) {
    for (let i = 0; i < userModule.projectList.length; i++) {
      const taskList = userModule.projectList[i].tasks;
      for (let j = 0; j < taskList.length; j++) {
        if (taskList[j].id === taskId) {
          if (taskList[j].priority === 'low') {
            low.setAttribute('id', 'priority-low-checked');
          } else if (taskList[j].priority === 'medium') {
            medium.setAttribute('id', 'priority-medium-checked');
          } else if (taskList[j].priority === 'high') {
            high.setAttribute('id', 'priority-high-checked');
          }
          titleElem.value = taskList[j].title;
          detailsElem.value = taskList[j].details;
          dateElem.value = taskList[j].date;
          userModule.isEditingTask = true;
          userModule.currentTaskId = taskId;
        }
      }
    }
    container.style.display = 'grid';
  }
  function editTask(taskId, title, details, date, priority) {
    for (let i = 0; i < userModule.projectList.length; i++) {
      const taskList = userModule.projectList[i].tasks;
      for (let j = 0; j < taskList.length; j++) {
        if (taskList[j].id === taskId) {
          taskList[j].title = title;
          taskList[j].details = details;
          taskList[j].date = date;
          taskList[j].priority = priority;
          userModule.isEditingTask = false;
          userModule.currentTaskId = '';
          populateStorage(userModule.projectList);
        }
      }
    }
  }
  return {
    projectList,
    isEditingTask,
    currentTaskId,
    currentProjectIndex,
    populateStorage,
    checkLocalStorage,
    changeTaskStatus,
    removeTaskFromList,
    removeProjectFromList,
    showTaskInfo,
    editTask,
  };
})();

function projectFactory(title, tasks) {
  const getObjLiteral = () => {
    // generates a random id for each project
    const id = Math.floor(Math.random() * 100000);
    return {
      id,
      title,
      tasks,
    };
  };
  return {
    getObjLiteral,
  };
}

function taskFactory(title, info, date, priority, projectId) {
  const getObjLiteral = () => {
    let details;
    if (info === '') {
      details = 'There are no details for this task.';
    } else {
      details = info;
    }
    const taskIsComplete = false;
    // generates a random id for each task
    const id = Date.now();
    return {
      id, title, details, date, priority, projectId, taskIsComplete,
    };
  };
  return {
    getObjLiteral,
  };
}

// triggers when the auth state change for instance when the user signs-in or signs-out
function authStateObserver(user) {
  if (user) { // User is signed in!
  } else { // User is signed out!
  }
}

function signIn() {
  // sign into Firebase using popup auth & Google as the identity provider
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

function signOut() {
  firebase.auth().signOut();
}

// initiates Firebase Auth
function initFirebaseAuth() {
  // listens to auth state changes
  firebase.auth().onAuthStateChanged(authStateObserver);
}

export {
  userModule,
  projectFactory,
  taskFactory,
  signIn,
  signOut,
  initFirebaseAuth,
};
