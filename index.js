const ulItem = document.querySelector("ul");
const userInput = document.querySelector(".userInput");
const submitBtn = document.querySelector(".button");
const completedBtn = document.querySelector(".completed");
const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const clearCompletedBtn = document.querySelector(".clear-completed");
// let checkboxCounter = 1;
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
  crossOutText(labelEl, checkbox, liEl);
  deleteBtn(liEl, checkbox);
  // preventEmptySubmit(userInput, liEl);
  editListItem(labelEl, liEl, checkbox);

  incrmenetCounter();
  // filterButton()
  // filterCompleted()
  addAllClassList(liEl)
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
      addCompletedClass(checkbox, liEl);
      // filterCompleted()
    } else {
      labelEl.classList.remove("crossed-out");
      incrmenetCounter();
      addCompletedClass(checkbox, liEl);
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

function incrmenetCounter() {
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

//Grab all li elements, convert them into an array and then use filter method to filter out completed li elements.

// function filterCompleted() {
//   // //all li elements grabbed
//   const selectAllLiEl = document.querySelectorAll("li");
//   // //li elements converted to array
//   const convertedToArray = Array.from(selectAllLiEl)
//   // //Filter that will show only items with class="checked"
//   const filteredLiEl = convertedToArray.filter(element => {
//     return element.classList.contains("completed");
//   })
//   console.log(filteredLiEl);
// }


function filterCompleted() {
  const selectAllLiEl = document.querySelectorAll("li");
  selectAllLiEl.forEach(element => {
    if (element.classList.contains("completed")) {
      element.style.display = "flex"
    } else {
      element.style.display = "none"
    }
  })
}

function addAllClassList(liEl) {
  return liEl.classList.add("all")
}

function filterAll() {
  const selectAllLiEl = document.querySelectorAll("li");
  selectAllLiEl.forEach(element => {
    if (element.classList.contains("all")) {
      element.style.display = "flex"
    } 
  })
}

function filterActive() {
  const selectAllLiEl = document.querySelectorAll("li");
  selectAllLiEl.forEach(element => {
    if (!element.classList.contains("completed")) {
      element.style.display = "flex"
    } else {
      element.style.display = "none"
    }
  })
}

function clearCompletedBtnFilter() {
  const selectAllLiEl = document.querySelectorAll("li");
  selectAllLiEl.forEach(element => {
    if (element.classList.contains("completed")) {
      element.remove()
    } 
  })
}


completedBtn.addEventListener("click", () => {
  filterCompleted()
})

allBtn.addEventListener("click", () => {
  filterAll()
})

activeBtn.addEventListener("click", () => {
  filterActive()
})

clearCompletedBtn.addEventListener("click", () => {
  clearCompletedBtnFilter()
})