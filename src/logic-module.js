import { createTask, createProject, displayProjectTitle } from './display-module';

export function createNewTask () {
    const navbar = document.querySelector('#navigation-bar');
    const dynamicDisplay = document.querySelector('#dynamic-display');
    const taskFormContainer = document.querySelector('#pop-up-container');
    const taskForm = document.querySelector('#pop-up');
    const taskContainer = document.querySelector('#task-container');
    const projectForm = document.querySelector('#np-form-container');
    const projectContainer = document.querySelector('#project-container');
    const newProjectButton = document.querySelector('#np-button');
    const homePage = document.querySelector('#nav-home');
    const todayPage = document.querySelector('#nav-today');
    const thisWeekPage = document.querySelector('#nav-this-week');

    let taskList = [];

    let projectList = [];

    const taskFactory = (title, details, date, priority, project = 'Home') => {
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

    function cleanContainer (container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    function showTaskList (arr) {
        cleanContainer(taskContainer);
        let projectName = document.querySelector('#dd-project-title').textContent;
        if (projectName == 'Home' || projectName == 'Today' || projectName == 'This Week') {
            for (let i = 0; i < arr.length; i ++) {
                createTask(arr[i].title, arr[i].date, arr[i].priority, taskContainer);
            }
        } else {
            let projectArr = taskList.filter(task => task.project == projectName);
            for (let i = 0; i < projectArr.length; i ++) {
                createTask(projectArr[i].title, projectArr[i].date, projectArr[i].priority, taskContainer);
            }
        }
        
    }

    function showProjectList (arr) {
        cleanContainer(projectContainer);
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
        let taskProject = document.querySelector('#dd-project-title').textContent;
        let newTask = taskFactory(taskTitle, taskDetails, taskDueDate, taskPriority, taskProject);
        taskList.push(newTask);
        showTaskList(taskList);
        console.log(taskList);
        taskFormContainer.style.display = 'none';
        
    })

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        cleanContainer(taskContainer);
        let projectName = document.querySelector('#np-form-input').value;
        projectList.push(projectName);
        showProjectList(projectList);
        projectForm.style.display = 'none';
        newProjectButton.style.display = 'flex';
        displayProjectTitle(projectName);
        const projects = document.querySelectorAll('.nav-project');
        projects.forEach((project) => {
            project.addEventListener('click', () => {
                displayProjectTitle(project.textContent);
                
                showTaskList(taskList);
            })
        })
    })

    homePage.addEventListener('click', () => {
        displayProjectTitle('Home');
        showTaskList(taskList);
    })
    todayPage.addEventListener('click', () => {
        displayProjectTitle('Today');
    })
    thisWeekPage.addEventListener('click', () => {
        displayProjectTitle('This Week');
    })

    
}