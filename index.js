const ulItem = document.querySelector("ul");
const userInput = document.querySelector(".userInput");
const submitBtn = document.querySelector(".button");
const completedBtn = document.querySelector(".completed");
const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const clearCompletedBtn = document.querySelector(".clear-completed");
//Counter for generating unique id for li
// let checkboxCounter = 1;
let doubleTapCounter = 0;
let itemCounter = 0;

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (userInput.value === "") {
    // preventEmptySubmit();
  } else {
    createdLabelwithLi(userInput.value);
  }
  userInput.value = "";
});

function createdLabelwithLi(input) {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  const labelEl = document.createElement("label");
  const liEl = document.createElement("li");
  ulItem.appendChild(liEl);
  liEl.appendChild(checkbox);
  liEl.appendChild(labelEl);
  labelEl.textContent = input;
  // logic for generating unique id for each li item.
  // const id = "cb" + checkboxCounter;
  // checkbox.setAttribute("id", id);
  // labelEl.setAttribute("for", id);
  // checkboxCounter++;
  crossOutText(labelEl, checkbox, liEl);
  deleteBtn(liEl, checkbox);
  // preventEmptySubmit(userInput, liEl);
  editListItem(labelEl, liEl, checkbox);
  incremenetCounter();
  addAllClassList(liEl);
}

function deleteBtn(listItem, checkbox) {
  const deleteBtn = document.createElement("button");
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-xmark");
  deleteBtn.appendChild(icon);
  listItem.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    listItem.remove();
    if (!checkbox.checked) {
      decrementCounter();
    }
  });
}

// to cross out label text (inside li) when checkbox gets checked
function crossOutText(labelEl, checkbox, liEl) {
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      labelEl.classList.add("crossed-out");
      //decrement li item count if checkbox is checked
      decrementCounter();
      addCompletedClass(checkbox, liEl);
    } else {
      labelEl.classList.remove("crossed-out");
      //increment li item count if checkbox is checked
      incremenetCounter();
      addCompletedClass(checkbox, liEl);
    }
  });
}

// Sortables function to sort and reorganize li items by drag & drop
(function (ulItem) {
  new Sortable(ulItem, {
    animation: 150,
    // ghostClass: 'blue-background-class'
  });
})(ulItem);

// function preventEmptySubmit(input, liEl) {
//   return "Empty submit";
// }

function editListItem(label, liEl, checkbox) {
  //listening for mouse clicks. If time length between 1st and 2nd mouse click (or tap) is < 300ms, then it registers as doubleclick (or double tap).
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

      //test
      const editInput = document.querySelector(".editInput");
      console.log(editInput.value);

      //To remove input when Enter key is pressed
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          label.textContent = input.value;
          input.remove();
          label.style.display = "block";
          console.log("Enter is pressed");

          //test
          delOnEmptyEdit(editInput, liEl, checkbox)
          // if (checkbox.checked) {
          //   incremenetCounter();
          // }
        }
      });
      //To remove input when clicked outside of input (lost focus)
      input.addEventListener("blur", () => {
        label.textContent = input.value;
        input.remove();
        label.style.display = "block";

        //test
        delOnEmptyEdit(editInput, liEl, checkbox)
        // if (checkbox.checked) {
        //   incremenetCounter();
        // }
      });
    }
    doubleTapCounter = currentTime;
  });
}

function incremenetCounter() {
  let counter = document.querySelector(".counter");

  if (itemCounter === 0) {
    counter.textContent = `${++itemCounter} item left`;
  } else {
    counter.textContent = `${++itemCounter} items left`;
  }
}

function decrementCounter() {
  let counter = document.querySelector(".counter");

  if (itemCounter === 2) {
    counter.textContent = `${--itemCounter} item left`;
  } else {
    counter.textContent = `${--itemCounter} items left`;
  }
}

function addCompletedClass(checkbox, liEl) {
  if (checkbox.checked) {
    liEl.classList.add("completed");
  } else {
    liEl.classList.remove("completed");
  }
}

function filterCompleted() {
  const selectAllLiEl = document.querySelectorAll("li");
  selectAllLiEl.forEach((element) => {
    if (element.classList.contains("completed")) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  });
}

function addAllClassList(liEl) {
  return liEl.classList.add("all");
}

function filterAll() {
  const selectAllLiEl = document.querySelectorAll("li");
  selectAllLiEl.forEach((element) => {
    if (element.classList.contains("all")) {
      element.style.display = "flex";
    }
  });
}

function filterActive() {
  const selectAllLiEl = document.querySelectorAll("li");
  selectAllLiEl.forEach((element) => {
    if (!element.classList.contains("completed")) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  });
}

function clearCompletedBtnFilter() {
  const selectAllLiEl = document.querySelectorAll("li");
  selectAllLiEl.forEach((element) => {
    if (element.classList.contains("completed")) {
      element.remove();
    }
  });
}

(function () {
  completedBtn.addEventListener("click", () => {
    filterCompleted();
  });

  allBtn.addEventListener("click", () => {
    filterAll();
  });

  activeBtn.addEventListener("click", () => {
    filterActive();
  });

  clearCompletedBtn.addEventListener("click", () => {
    clearCompletedBtnFilter();
  });
})();

function delOnEmptyEdit(editInput, liEl, checkbox) {
  if (editInput.value === "") {
    liEl.remove();
    if (!checkbox.checked) {
      decrementCounter()
    }
  }
}
