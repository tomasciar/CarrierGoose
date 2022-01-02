// Select each element by id
const template = document.getElementById("list-item-template");
const list = document.getElementById("list");
const questionInput = document.getElementById("question");
const answerInput = document.getElementById("answer");
const itemForm = document.getElementById("item-form");
const numberForm = document.getElementById("number-form");
const addButton = document.getElementById("add-button");
const quizInput = document.getElementById("quiz-input");
const numberInput = document.getElementById("phone-number");
const quizButton = document.getElementById("quiz-button");
const quizForm = document.getElementById("quiz-form");

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
    id: new Date().valueOf().toString()
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
          id: new Date().valueOf().toString() + i
        };
      }
    });
}

// Function to add Brainscape items to the list
quizButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (quizInput.value === "") return;
  console.log(quizInput.value);

  brainScrape(quizInput.value);

  for (let i = 0; i < sourceElements.length; i++) {
    console.log(sourceElements[i]);
    items.push(sourceElements[i]);
    renderItems(sourceElements[i]);
    saveItems();
  }

  console.log(items);

  // Clear the question and answer inputs
  quizInput.value = "";
});

/*
TODO LIST

- Twilio API
- Quiz button glitch
- Delete All button
- Format answers to remove "/n" & "/t"
- Maximum # of flashcards
- Host cors-anywhere
- CSS (once we acquire landing page from Fiverr)
- How does it work?
- Learn More
- Host website
*/
