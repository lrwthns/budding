/* eslint-disable no-console */
/* eslint-disable no-plusplus */

const userModule = (() => {
  const taskList = [];
  const projectList = [];
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
  return {
    taskList,
    projectList,
    changeTaskStatus,
    removeTaskFromList,
  };
})();

function projectFactory(name, tasks) {
  const getObjLiteral = () => {
    console.log(name);
    return {
      name,
      tasks,
    };
  };
  return {
    getObjLiteral,
  };
}

function taskFactory(title, details, date, priority, project = 'Home') {
  const getObjLiteral = () => {
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
