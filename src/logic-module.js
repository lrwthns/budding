import { format, addDays, subDays, isBefore, isAfter, parseISO } from 'date-fns';
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
    const priorityDiv = document.querySelector('#priority-div');

    let taskList = [];

    let projectList = [];

    const taskFactory = (title, details, date, priority, project = 'Home') => {
        return { title, details, date, priority, project};
    }

    function populateStorage (arr) {
        localStorage.setItem('savedTaskList', JSON.stringify(arr));
    }

    function checkLocalStorage (arr) {
        if (localStorage.length > 0) {
            let savedTaskList = localStorage.getItem('savedTaskList');
            arr = JSON.parse(savedTaskList);
            return showTaskList(arr);
        }
    }

    function checkPriority (container) {
        const low = document.querySelector('#priority-low-checked');
        const medium = document.querySelector('#priority-medium-checked');
        const high = document.querySelector('#priority-high-checked');
        if (container.contains(low)) {
            return 'low';
        } else if (container.contains(medium)) {
            return 'medium';
        } else if (container.contains(high)) {
            return 'high';
        } else {
            return '';
        }
    }

    function clearTaskInput (priority) {
        document.querySelector('#title-input').value = '';
        document.querySelector('#details-input').value = '';
        document.querySelector('#due-date-input').value = '';
        if (priority == 'low') {
            document.querySelector('#priority-low-checked').setAttribute('id', 'priority-low');
        } else if (priority == 'medium') {
            document.querySelector('#priority-medium-checked').setAttribute('id', 'priority-medium');
        } else if (priority == 'high') {
            document.querySelector('#priority-high-checked').setAttribute('id', 'priority-high');
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
        if (projectName == 'Home') {
            //this displays all tasks
            for (let i = 0; i < arr.length; i ++) {
                let taskDueDate = format(new Date(arr[i].date),'MMMM do');
                createTask(arr[i].title, taskDueDate, arr[i].priority, taskContainer);
            }
        } else if (projectName == 'Today') {
            //this checks for tasks which are due today and put them in an array
            let today = format(new Date(), 'y-MM-dd');
            let todayArr = taskList.filter(task => task.date == today);
            for (let i = 0; i < todayArr.length; i ++) {
                let taskDueDate = format(new Date(todayArr[i].date),'MMMM do');
                createTask(todayArr[i].title, taskDueDate, todayArr[i].priority, taskContainer);
            }
        } else if (projectName == 'This Week') {
            //this checks for tasks which are due in the incoming week and put them in an array
            let thisWeekArr = taskList.filter(task => { 
                let today = new Date();
                let beforeToday = subDays(today, 1);
                let endOfWeek = addDays(today, 6);
                return isAfter(parseISO(task.date), beforeToday) && isBefore(parseISO(task.date), endOfWeek);
            })
            for (let i = 0; i < thisWeekArr.length; i ++) {
                let taskDueDate = format(new Date(thisWeekArr[i].date),'MMMM do');
                createTask(thisWeekArr[i].title, taskDueDate, thisWeekArr[i].priority, taskContainer);
            }
        } else {
            //this checks for tasks that belong in a project category
            let projectArr = taskList.filter(task => task.project == projectName);
            for (let i = 0; i < projectArr.length; i ++) {
                let taskDueDate = format(new Date(projectArr[i].date),'MMMM do');
                createTask(projectArr[i].title, taskDueDate, projectArr[i].priority, taskContainer);
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
        let taskPriority = checkPriority(priorityDiv);
        let taskProject = document.querySelector('#dd-project-title').textContent;
        let isTaskChecked = false;
        let newTask = taskFactory(taskTitle, taskDetails, taskDueDate, taskPriority, taskProject);
        taskList.push(newTask);
        populateStorage(taskList);
        showTaskList(taskList);
        console.log(taskList);
        clearTaskInput(taskPriority)
        taskFormContainer.style.display = 'none';
    })

    projectForm.addEventListener('submit', (event) => {
        event.preventDefault();
        cleanContainer(taskContainer);
        let projectInput = document.querySelector('#np-form-input');
        projectList.push(projectInput.value);
        showProjectList(projectList);
        projectForm.style.display = 'none';
        newProjectButton.style.display = 'flex';
        displayProjectTitle(projectInput.value);
        projectInput.value = '';
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
        showTaskList(taskList);
    })
    thisWeekPage.addEventListener('click', () => {
        displayProjectTitle('This Week');
        showTaskList(taskList);
    })

}