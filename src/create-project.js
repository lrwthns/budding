import createNewElement from './dom-manipulation-helper';

export default function createProject(name, container) {
  const project = createNewElement(container, 'div', 'nav-project', '', name);
  const projectDelete = createNewElement(
    project,
    'span',
    'material-icons',
    '',
    'delete',
  );
  projectDelete.setAttribute('id', 'delete-project-button');
  return {
    project,
    projectDelete,
  };
}
