/* eslint-disable no-console */
/* eslint-disable no-plusplus */

const userModule = (() => {
  const projectList = [];
  const isEditingTask = false;
  const currentTaskId = '';
  const currentProjectIndex = 0;

  function changeTaskStatus(taskId, newBool) {
    for (let i = 0; i < projectList.length; i++) {
      const taskList = projectList[i].tasks;
      for (let j = 0; j < taskList.length; j++) {
        if (taskList[j].id === taskId) {
          taskList[j].taskIsComplete = newBool;
        }
      }
    }
  }
  function removeTaskFromList(taskId) {
    for (let i = 0; i < projectList.length; i++) {
      const taskList = projectList[i].tasks;
      for (let j = 0; j < taskList.length; j++) {
        if (taskList[j].id === taskId) {
          taskList.splice(j, 1);
          console.log(taskList);
        }
      }
    }
  }
  function removeProjectFromList(projectId) {
    for (let i = 0; i < projectList.length; i++) {
      if (projectList[i].id === projectId) {
        projectList.splice(i, 1);
        console.log(projectList);
      }
    }
  }

  function showTaskInfo(taskId, container, titleElem, detailsElem, dateElem, low, medium, high) {
    for (let i = 0; i < projectList.length; i++) {
      const taskList = projectList[i].tasks;
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
    for (let i = 0; i < projectList.length; i++) {
      const taskList = projectList[i].tasks;
      for (let j = 0; j < taskList.length; j++) {
        if (taskList[j].id === taskId) {
          taskList[j].title = title;
          taskList[j].details = details;
          taskList[j].date = date;
          taskList[j].priority = priority;
          userModule.isEditingTask = false;
          userModule.currentTaskId = '';
        }
      }
    }
  }
  return {
    projectList,
    isEditingTask,
    currentTaskId,
    currentProjectIndex,
    changeTaskStatus,
    removeTaskFromList,
    removeProjectFromList,
    showTaskInfo,
    editTask,
  };
})();

function projectFactory(title, tasks) {
  const getObjLiteral = () => {
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
    // generate a random id for each task
    const id = Date.now();
    return {
      id, title, details, date, priority, projectId, taskIsComplete,
    };
  };
  return {
    getObjLiteral,
  };
}

export {
  userModule,
  projectFactory,
  taskFactory,
};
