// Select each element by id
// New item template, item list
const template = document.getElementById("list-item-template");
const list = document.getElementById("list");

// Question input, answer input, add button, item form
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const addButton = document.getElementById("add-button");
const itemForm = document.getElementById("item-form");

// Quiz input, quiz button, quiz form
const quizInput = document.getElementById("quiz-input");
const quizButton = document.getElementById("quiz-button");
const quizForm = document.getElementById("quiz-form");

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

// Create new item when question & answer form is submitted
addButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (questionInput.value === "" || answerInput.value === "") return;

  // Template for new list item
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

// Event listener to remove items on click
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest(".list-item");
  const listId = parent.dataset.listId;
  parent.remove();
  items = items.filter((item) => item.id !== listId);
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

// Link for cors proxy
const CORS_API_URL = "https://cors-anywhere.herokuapp.com/";

// Array waiting for elements of source page to be pushed to it
const sourceElements = [];

function brainScrape(url) {
  fetch(`${CORS_API_URL}${url}`)
    .then((response) => {
      return response;
    })
    .then((data) => {
      return data.text();
    })
    .then((text) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const questions = doc.querySelectorAll(".card-question-text");
      const answers = doc.querySelectorAll(".card-answer-text");

      let questionPair = [];
      questions.forEach((pair) => {
        questionPair.push(pair.innerText);
      });

      let answerPair = [];
      answers.forEach((pair) => {
        answerPair.push(pair.innerText);
      });

      for (let i = 0; i < questionPair.length; i++) {
        if (answerPair[i] === null) return;

        sourceElements[i] = {
          question: questionPair[i],
          answer: answerPair[i],
          id: new Date().valueOf().toString() + i,
        };
      }
    });
}

// Function to add Brainscape items to the list
quizButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (quizInput.value === "") return;

  brainScrape(quizInput.value);

  for (let i = 0; i < sourceElements.length; i++) {
    items.push(sourceElements[i]);
    renderItems(sourceElements[i]);
    saveItems();
  }

  // Clear the question and answer inputs
  quizInput.value = "";
});

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
- Quiz button glitch
- Delete All button
- Format answers to remove "/n" & "/t"
- Maximum # of flashcards
- Host cors-anywhere (or figure out cors ??)
- How?
- Why?
*/
