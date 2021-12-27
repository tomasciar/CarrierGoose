// Select each element by id
const template = document.getElementById("list-item-template");
const list = document.getElementById("list");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const itemForm = document.getElementById("item-form");
const quizlet = document.getElementById("quizlet");
const numberForm = document.getElementById("number-form");

sendButton.addEventListener;

// Function to render list of items
function renderList(item) {
  // Create a clone of item template from HTML
  const templateClone = template.content.cloneNode(true);

  // Select the list item class
  const listItem = templateClone.querySelector(".list-item");
  // Assign the item's Id to the list item
  listItem.dataset.listId = item.id;

  // Select the text element that holds the question
  const questionElement = templateClone.querySelector(
    "[data-list-item-question]"
  );
  // Enter the question
  questionElement.innerText = item.question;

  // Select the text element that holds the answer
  const answerElement = templateClone.querySelector(
    "[data-list-item-question]"
  );
  // Enter the answer
  answerElement.innerText = item.answer;

  // Append the template clone onto the list element
  list.appendChild(templateClone);
}

// question      answer     X
