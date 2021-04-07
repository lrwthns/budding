export default function createNewElement(
  container,
  type,
  className,
  idName,
  text = '',
) {
  const element = document.createElement(type);
  container.appendChild(element);
  if (className !== '') {
    element.classList.add(className);
  } else {
    element.setAttribute('id', idName);
  }
  element.textContent = text;
  return element;
}
