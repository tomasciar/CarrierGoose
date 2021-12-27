const template = document.querySelector("#list-item-template");

function renderList(item) {
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = item.id;
  const textElement = templateClone.querySelector("[data-list-item-text]");
  textElement.innerText = item.name;
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]");
  checkbox.checked = item.complete;
  list.appendChild(templateClone);
}
