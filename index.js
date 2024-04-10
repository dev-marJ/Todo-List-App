const ulItem = document.querySelector("ul");
const userInput = document.querySelector(".userInput");
const submitBtn = document.querySelector(".button");

let checkboxCounter = 1;
let doubleTapCounter = 0;
let itemCounter = 0;

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (userInput.value === "") {
    preventEmptySubmit();
  } else {
    createdLabelwithLi(userInput.value);
  }
  userInput.value = "";
  console.log(itemCounter);
});

//to generate label task with checkbox with unique id that is tied to label
function createdLabelwithLi(input) {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  const labelEl = document.createElement("label");
  const liEl = document.createElement("li");
  ulItem.appendChild(liEl);
  liEl.appendChild(checkbox);
  liEl.appendChild(labelEl);
  labelEl.textContent = input;
  // const id = "cb" + checkboxCounter;
  // checkbox.setAttribute("id", id);
  // labelEl.setAttribute("for", id);
  // checkboxCounter++;
  crossOutText(labelEl, checkbox);
  deleteBtn(liEl, checkbox);
  // preventEmptySubmit(userInput, liEl);
  editListItem(labelEl, liEl, checkbox);

  liElCounter();
}

function deleteBtn(listItem, checkbox) {
  const deleteBtn = document.createElement("button");
  // deleteBtn.innerHTML = "✖️";
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-xmark");
  deleteBtn.appendChild(icon);
  listItem.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    listItem.remove();
    // liElCounter();
    if (!checkbox.checked) {
      decrementCounter();
    }
  });
}

// to cross out li text when checkbox checked
function crossOutText(labelEl, checkbox, liEl) {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      labelEl.classList.add("crossed-out");
      decrementCounter();
    } else {
      labelEl.classList.remove("crossed-out");
      incrmenetCounter();
    }
  });
}

//to be able to sort and reorganize list by drag & drop
function sortables(ulItem) {
  new Sortable(ulItem, {
    animation: 150,
    // ghostClass: 'blue-background-class'
  });
}
sortables(ulItem);

function preventEmptySubmit(input, liEl) {
  // if (input.value === "") {
  //   // alert("Empty submit")
  //   liEl.remove();
  // }
  return "Empty submit";
}

function editListItem(label, liEl, checkbox) {
  let currentTime;
  label.addEventListener("click", () => {
    currentTime = new Date().getTime();
    const timeDiff = currentTime - doubleTapCounter;
    if (timeDiff < 300) {
      let input = document.createElement("input");
      input.classList.add("editInput");
      checkbox.insertAdjacentElement("afterend", input);
      input.value = liEl.innerText;
      label.style.display = "none";

      //To remove input when Enter key is pressed
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          label.textContent = input.value;
          input.remove();
          label.style.display = "block";
          console.log("Enter is pressed");
        }
      });
      //To remove input when clicked outside of input (lost focus)
      input.addEventListener("blur", () => {
        label.textContent = input.value;
        input.remove();
        label.style.display = "block";
      });
    }
    doubleTapCounter = currentTime;
  });
}

//for testing purposes

function liElCounter() {
  let counter = document.querySelector(".counter");
  counter.textContent = `${++itemCounter} items left`;
}

function incrmenetCounter() {
  let counter = document.querySelector(".counter");
  counter.textContent = `${++itemCounter} items left`;
}

function decrementCounter() {
  let counter = document.querySelector(".counter");
  counter.textContent = `${--itemCounter} items left`;
}

function counterText() {}

// function liElCounter() {
//   let counter = document.querySelector(".counter");
//   itemCounter = ulItem.children.length;
//   counter.textContent = `${itemCounter} items left`;
//   console.log(itemCounter);
// }

// function liElCounter() {
//   let counter = document.querySelector(".counter");
//   if (userInput.value === "") {
//     itemCounter--;
//     if (itemCounter < 0) {
//       itemCounter = 1;
//     }
//   } else {
//     counter.textContent = `${++itemCounter} items left`;
//   }
// }
