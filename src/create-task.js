import createNewElement from './dom-manipulation-helper';
// import appLogic from './logic-module';

export default function createTask(name, date, priority, container) {
  // const logic = appLogic();
  const task = createNewElement(container, 'li', 'user-tasks', '');
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

  taskCheckbox.addEventListener('click', () => {
    if (taskCheckbox.textContent === 'radio_button_unchecked') {
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
  });

  // taskDelete.addEventListener('click', () => {
  //   logic.removeTaskFromList(taskDesc.textContent, taskDueDate.textContent);
  // });
}
