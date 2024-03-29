const ulItem = document.querySelector("ul");
const userInput = document.querySelector(".userInput");
const submitBtn = document.querySelector(".button");
let checkboxCounter = 1;

//eventListener for submit form btn
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

  const id = "cb" + checkboxCounter;
  checkbox.setAttribute("id", id);
  labelEl.setAttribute("for", id);
  checkboxCounter++;
  crossOutText(labelEl, checkbox);
  deleteBtn(liEl);
  sortables();
  preventEmptySubmit(userInput, liEl);
}

//delete btn for li item
function deleteBtn(listItem) {
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "Delete";
  listItem.appendChild(deleteBtn);

  deleteBtn.addEventListener("click", () => {
    listItem.remove();
  });
}

// to cross out li text when checkbox checked
function crossOutText(labelEl, checkbox) {
  const crossedOutEl = document.createElement("del");

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      labelEl.innerHTML = "<del>" + labelEl.innerHTML + "</del>";
    } else {
      labelEl.innerHTML = labelEl.innerHTML
        .replace("<del>", "")
        .replace("</del>", "");
    }
  });
}

//to be able to sort and reorganize list
function sortables() {
  let sortables = document.getElementById("sortables-list");

  new Sortable(sortables, {
    animation: 150,
    // ghostClass: 'blue-background-class'
  });
}

function preventEmptySubmit(input, liEl) {
  if (input.value === "") {
    // alert("Empty submit")
    liEl.remove();
  }
}
