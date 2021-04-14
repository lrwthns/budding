/* eslint-disable no-console */
/* eslint-disable no-plusplus */

const userModule = (() => {
  const taskList = [];
  const projectList = [];
  return {
    taskList,
    projectList,
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
    return {
      title, details, date, priority, project, taskIsComplete,
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

// function removeTaskFromList(taskTitle, taskDate, container) {
//   // eslint-disable-next-line consistent-return
//   function findTaskIndex() {
//     for (let i = 0; i < taskList.length; i++) {
//       if (taskList[i].title === taskTitle && taskList[i].date === taskDate) {
//         return i;
//       }
//     }
//   }
//   taskList.splice(findTaskIndex(), 1);
//   console.log(taskList);
//   showTaskList(taskList, container);
// }
