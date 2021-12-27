// Select each element by id
const template = document.getElementById("list-item-template");
const list = document.getElementById("list");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const itemForm = document.getElementById("item-form");
const quizlet = document.getElementById("quizlet");
const numberForm = document.getElementById("number-form");

// Define constants for local storage
const LOCAL_STORAGE_PREFIX = "CARRIER_GOOSE";
const ITEM_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-items`;

// Initialize array of items & render them
let items = loadItems();
items.forEach(renderItems);

// Create new item when question & answer form is submitted
itemForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(question.value);

  if (questionInput.value === "") return;

  const newItem = {
    question: questionInput.value,
    answer: answerInput.value,
    id: new Date().valueOf().toString(),
  };
  // Add the item to the items array and local storage
  items.push(newItem);
  renderItems(newItem);
  saveItems();

  // Clear the question and answer inputs
  questionInput.value = "";
  answerInput.value = "";
});

list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest(".list-item");
  const listID = parent.dataset.todoId;
  parent.remove();
  items = items.filter((item) => item.id !== itemId);
  saveItems();
});

// Function to render list of items
function renderItems(item) {
  // Create a clone of item template from HTML & assign an Id
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.listId = item.id;

  // Add the question & answer text to their corresponding span elements
  const questionElement = templateClone.querySelector(
    "[data-list-item-question]"
  );
  const answerElement = templateClone.querySelector("[data-list-item-answer]");
  questionElement.innerText = item.question;
  answerElement.innerText = item.answer;

  // Append the template clone onto the list element
  list.appendChild(templateClone);
}

// Function to load items currently stored in local storage
function loadItems() {
  const itemString = localStorage.getItem(ITEM_STORAGE_KEY);
  return JSON.parse(itemString) || [];
}

// Function to save items in local storage
function saveItems() {
  localStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(items));
}
