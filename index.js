const ulItem = document.querySelector("ul");
const userInput = document.querySelector(".userInput");
const submitBtn = document.querySelector(".submitBtn");
const completedBtn = document.querySelector(".completed");
const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const clearCompletedBtn = document.querySelector(".clear-completed");
const todoContainer = document.querySelector(".todo-container");
const container = document.querySelector(".container");
const section = document.querySelector("section");
const counterContainer = document.querySelector(".counter-container");
const filterContainer = document.querySelector(".filter-container");
const counterEl = document.querySelector(".counter");
const clearCompleted = document.querySelector(".clear-completed");
const controlBtns = filterContainer.querySelectorAll("button");
const listItems = document.querySelectorAll("ul > li");

let doubleTapCounter = 0;
let itemCounter = 0;

//To load li items from local storage when page is first opened
document.addEventListener("DOMContentLoaded", () => {
  loadItems();
  hideControls();
  controlBtnsCol();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (userInput.value !== "") {
    createdLabelwithLi(userInput.value);
    userInput.value = "";
  }
});

function createdLabelwithLi(input, completed = false) {
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  const labelEl = document.createElement("label");
  const liEl = document.createElement("li");
  ulItem.appendChild(liEl);
  liEl.appendChild(checkbox);
  liEl.appendChild(labelEl);
  labelEl.textContent = input;
  checkbox.checked = completed;
  if (completed) {
    // Add crossed-out class if completed
    labelEl.classList.add("crossed-out");
    // Add completed class to li if completed
    liEl.classList.add("completed");
  }
  crossOutText(labelEl, checkbox, liEl);
  deleteBtn(liEl, checkbox);
  editListItem(labelEl, liEl, checkbox);
  // Only increment the counter if the item is not completed
  if (!completed) {
    incremenetCounter();
  }
  addAllClassList(liEl);
  hideControls();
  controlBtnsCol();
  saveItems();
}

function deleteBtn(listItem, checkbox) {
  const deleteBtn = document.createElement("button");
  const icon = document.createElement("i");
  icon.classList.add("fa-solid", "fa-xmark");
  deleteBtn.appendChild(icon);
  listItem.appendChild(deleteBtn);
  deleteBtn.addEventListener("click", () => {
    listItem.remove();
    saveItems();
    if (!checkbox.checked) {
      decrementCounter();
    }
    hideControls();
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
      saveItems();
    } else {
      labelEl.classList.remove("crossed-out");
      //increment li item count if checkbox is checked
      incremenetCounter();
      addCompletedClass(checkbox, liEl);
      saveItems();
    }
  });
}

// Sortables function to sort and reorganize li items by drag & drop
(function (ulItem) {
  new Sortable(ulItem, {
    animation: 150,
    // ghostClass: 'blue-background-class',

    // Save the new order of li items to local storage
    onEnd: function (evt) {
      saveItems();
    },
  });
})(ulItem);

function editListItem(label, liEl, checkbox) {
  //listening for mouse clicks. If time length between 1st and 2nd mouse click is < 300ms, then it registers as doubleclick.
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
      const editInput = document.querySelector(".editInput");
      hideControls();
      //To remove input when Enter key is pressed
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          label.textContent = input.value;
          // input.remove();
          input.style.display = "none";
          label.style.display = "block";
          hideControls();
          saveItems();
        }
      });
      //To remove input when clicked outside of input (lost focus)
      input.addEventListener("blur", () => {
        // input.remove()
        label.textContent = input.value;
        input.style.display = "none";
        label.style.display = "block";
        if (editInput.style.display === "none") {
          input.remove();
          hideControls();
          saveItems();
        }

        delOnEmptyEdit(editInput, liEl, checkbox);
        hideControls();
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
  controlBtnsCol();
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
  controlBtnsCol();
  const selectAllLiEl = document.querySelectorAll("li");
  selectAllLiEl.forEach((element) => {
    if (element.classList.contains("all")) {
      element.style.display = "flex";
    }
  });
}

function filterActive() {
  controlBtnsCol();
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
      saveItems();
    }
  });
  hideControls();
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
      decrementCounter();
    }
  }
}

//logic for screen width detection to pull filter container outside of container
function reorganizeUI() {
  if (window.innerWidth < 600) {
    section.appendChild(filterContainer);
    // console.log(`width: ${innerWidth}`);
  } else {
    counterContainer.insertBefore(filterContainer, clearCompleted);
  }
}

//listener for screen width detection for drop down btns menu
(function () {
  window.addEventListener("resize", () => {
    reorganizeUI();
  });
  //to fire the function on page reload too
  reorganizeUI();
})();

function hideControls() {
  if (ulItem.children.length > 0) {
    counterContainer.style.display = "flex";
    filterContainer.style.display = "flex";
    container.style.boxShadow = "rgba(0, 0, 0, 0.45) 0px 15px 20px -20px";
    todoContainer.style.marginBottom = "1.5em";
  } else {
    counterContainer.style.display = "none";
    filterContainer.style.display = "none";
    todoContainer.style.marginBottom = "0em";
  }
}

hideControls();

//Color change on click for filter buttons
function controlBtnsCol() {
  controlBtns.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.className === "all") {
        button.style.color = "#3ab1c8";
        activeBtn.style.color = "black";
        completedBtn.style.color = "black";
      } else if (button.className === "active") {
        button.style.color = "#3ab1c8";
        allBtn.style.color = "black";
        // activeBtn.style.color = "black";
        completedBtn.style.color = "black";
      } else {
        button.style.color = "#3ab1c8";
        allBtn.style.color = "black";
        activeBtn.style.color = "black";
      }
    });
  });
}

allBtn.style.color = "#3ab1c8";

//LOGIC FOR LOCAL STORAGE
//To save items in local storage
function saveItems() {
  const listItems = [];
  ulItem.querySelectorAll("li").forEach((li) => {
    listItems.push({
      text: li.querySelector("label").textContent,
      completed: li.querySelector("input[type='checkbox']").checked,
    });
  });
  localStorage.setItem("listItems", JSON.stringify(listItems));
}

//To load items from local storage
function loadItems() {
  const listItems = JSON.parse(localStorage.getItem("listItems"));
  if (listItems) {
    listItems.forEach((item) => createdLabelwithLi(item.text, item.completed));
  }
}





