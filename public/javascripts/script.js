// New item template, item list
const template = document.getElementById("list-item-template");
const list = document.getElementById("list");

// Question input, answer input, add button, item form
const input = document.getElementById("todo");
const addButton = document.getElementById("add-button");
const itemForm = document.getElementById("item-form");

// Number input, send button, number form
const numberInput = document.getElementById("phone-number");
const sendButton = document.getElementById("send-button");
const numberForm = document.getElementById("number-form");

// Define constants for local storage
const LOCAL_STORAGE_PREFIX = "CARRIER_GOOSE";
const ITEM_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-items`;

// Initialize array of items & render them
let items = loadItems();
items.forEach(renderItems);

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(items)
};

fetch("/todos", options);

// Create new item when question & answer form is submitted
addButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value === "") return;

  // Template for new list item
  const newItem = {
    todo: input.value,
    id: new Date().valueOf().toString()
  };

  // Add the item to the items array and local storage
  items.push(newItem);
  renderItems(newItem);
  saveItems();

  // POST items array to server
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(items)
  };

  fetch("/todos", options);

  // Clear the question and answer inputs
  input.value = "";
});

// Event listener to remove items on click
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest(".list-item");
  const listId = parent.dataset.listId;
  parent.remove();
  items = items.filter((item) => item.id !== listId);
  loadItems();
  saveItems();

  // POST items array to server
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(items)
  };

  fetch("/todos", options);
});

// Function to render list of items
function renderItems(item) {
  // Create a clone of item template from HTML & assign an Id
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.listId = item.id;

  // Add the question & answer text to their corresponding span elements
  const inputElement = templateClone.querySelector("[data-list-item-input]");
  inputElement.innerText = item.todo;

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

// Array waiting for elements of source page to be pushed to it
const sourceElements = [];

// Function to format phone number input
function phoneFormat(input) {
  // Returns (###) ###-####
  input = input.replace(/\D/g, "");
  let size = input.length;
  if (size > 0) {
    input = "(" + input;
  }
  if (size > 3) {
    input = input.slice(0, 4) + ") " + input.slice(4, 11);
  }
  if (size > 6) {
    input = input.slice(0, 9) + "-" + input.slice(9);
  }
  return input;
}

/*
TODO LIST
\
- Delete All button
- Format answers to remove "/n" & "/t"
*/
