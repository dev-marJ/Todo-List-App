const ulItem = document.querySelector("ul");
const userInput = document.querySelector(".userInput");
const submitBtn = document.querySelector(".button");
let checkboxCounter = 1;
let doubleTapCounter = 0;

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createdLabelwithLi(userInput.value);
  userInput.value = "";
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
  deleteBtn(liEl);
  preventEmptySubmit(userInput, liEl);
  editListItem(labelEl, liEl, checkbox);
  liElCounter()
}

function deleteBtn(listItem) {
  const deleteBtn = document.createElement("button");
  // deleteBtn.innerHTML = "✖️";
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-xmark");
  deleteBtn.appendChild(icon);
  listItem.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    listItem.remove();
  });
}

// to cross out li text when checkbox checked
function crossOutText(labelEl, checkbox) {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      labelEl.classList.add("crossed-out");
    } else {
      labelEl.classList.remove("crossed-out");
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
  if (input.value === "") {
    // alert("Empty submit")
    liEl.remove();
  }
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
  const counter = document.querySelector(".counter");
  const ulEl = document.querySelector(".ulEl");
  counter.textContent = `${ulEl.children.length} items left`
  console.log();
}



