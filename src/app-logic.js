/* eslint-disable no-console */
/* eslint-disable no-plusplus */

const userModule = (() => {
  const taskList = [];
  const projectList = [];
  let isEditingTask = false;
  let currentTaskId = '';
  function changeTaskStatus(taskId, newBool) {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === taskId) {
        taskList[i].taskIsComplete = newBool;
      }
    }
  }
  function removeTaskFromList(taskId) {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === taskId) {
        taskList.splice(i, 1);
        console.log(taskList);
      }
    }
  }
  // function removeProjectFromList(projectId) {

  // }

  function showTaskInfo(taskId, container, titleElem, detailsElem, dateElem, low, medium, high) {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === taskId) {
        if (taskList[i].priority === 'low') {
          low.setAttribute('id', 'priority-low-checked');
        } else if (taskList[i].priority === 'medium') {
          medium.setAttribute('id', 'priority-medium-checked');
        } else if (taskList[i].priority === 'high') {
          high.setAttribute('id', 'priority-high-checked');
        }
        titleElem.value = taskList[i].title;
        detailsElem.value = taskList[i].details;
        dateElem.value = taskList[i].date;
        userModule.isEditingTask = true;
        userModule.currentTaskId = taskId;
      }
    }
    container.style.display = 'grid';
  }
  function editTask(taskId, title, details, date, priority) {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === taskId) {
        taskList[i].title = title;
        taskList[i].details = details;
        taskList[i].date = date;
        taskList[i].priority = priority;
        userModule.isEditingTask = false;
        userModule.currentTaskId = '';
      }
    }
  }
  return {
    taskList,
    projectList,
    isEditingTask,
    currentTaskId,
    changeTaskStatus,
    removeTaskFromList,
    showTaskInfo,
    editTask,
  };
})();

function projectFactory(title, tasks) {
  const getObjLiteral = () => {
    const id = Date.now();
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

function taskFactory(title, info, date, priority, project = 'Home') {
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
      id, title, details, date, priority, project, taskIsComplete,
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
