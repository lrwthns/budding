import { createTask, createProject } from './display-module';

export function createNewTask () {
    const taskFormContainer = document.querySelector('#pop-up-container');
    const taskForm = document.querySelector('#pop-up');
    const taskContainer = document.querySelector('#task-container');
    const projectForm = document.querySelector('#np-form-container');
    const projectContainer = document.querySelector('#project-container');
    const newProjectButton = document.querySelector('#np-button');

    let taskList = [];

    let projectList = [];

    const taskFactory = (title, details, date, priority, project = 'home') => {
        return { title, details, date, priority, project};
    }

    let checkPriority = () => {
        const priorityDiv = document.querySelector('#priority-div');
        const low = document.querySelector('#priority-low-checked');
        const medium = document.querySelector('#priority-medium-checked');
        const high = document.querySelector('#priority-high-checked');
        if (priorityDiv.contains(low)) {
            return 'low';
        } else if (priorityDiv.contains(medium)) {
            return 'medium';
        } else if (priorityDiv.contains(high)) {
            return 'high';
        } else {
            return '';
        }
    }

    function showTaskList (arr) {
        while (taskContainer.firstChild) {
            taskContainer.removeChild(taskContainer.firstChild);
        }

        for (let i = 0; i < arr.length; i ++) {
            createTask(arr[i].title, arr[i].date, arr[i].priority, taskContainer);
        }
    }

    function showProjectList (arr) {
        while (projectContainer.firstChild) {
            projectContainer.removeChild(projectContainer.firstChild);
        }

        for (let i = 0; i < arr.length; i ++) {
            createProject(arr[i], projectContainer);
        }
    }

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let taskTitle = document.querySelector('#title-input').value;
        let taskDetails = document.querySelector('#details-input').value;
        let taskDueDate = document.querySelector('#due-date-input').value;
        let taskPriority = checkPriority();
        let newTask = taskFactory(taskTitle, taskDetails, taskDueDate, taskPriority);
        taskList.push(newTask);
        showTaskList(taskList);
        console.log(taskList);
        taskFormContainer.style.display = 'none';
    })

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let projectName = document.querySelector('#np-form-input').value;
        projectList.push(projectName);
        showProjectList(projectList);
        projectForm.style.display = 'none';
        newProjectButton.style.display = 'flex';
    })

}



