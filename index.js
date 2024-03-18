// const userInput = document.querySelector(".userInput");
// const submitBtn = document.querySelector(".button");
// const appendContainer = document.querySelector("ul");

// submitBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   const li = document.createElement("li");
//   const para = document.createElement("p");
//   para.textContent = userInput.value;
//   li.appendChild(para);
//   appendContainer.appendChild(li);
//   userInput.value = "";

//   // delete btn
//   const deleteBtn = document.createElement("button");
//   deleteBtn.innerHTML = "Delete";
//   li.appendChild(deleteBtn);

//   //delete logic for li item deletion
//   deleteBtn.addEventListener("click", () => {
//     li.remove();
//     crossedOutEl.remove();
//   });

//   //checkbox
//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   li.insertBefore(checkbox, li.firstChild);
//   console.log(li.textContent);

//   //crossing out ligic for checbox
//   checkbox.addEventListener("change", () => {
//     if (checkbox.checked === true) {
//       const crossedOutEl = document.createElement("del");
//       para.parentNode.replaceChild(crossedOutEl, para);
//       crossedOutEl.appendChild(para);
//     }
//     if (!checkbox.checked) {
//       para.parentNode.remove();
//       li.appendChild(para)
//       li.appendChild(deleteBtn);
//     }
//   });
// });

//Refactored code

const ulItem = document.querySelector("ul");
const userInput = document.querySelector(".userInput");
const submitBtn = document.querySelector(".button");

//eventListener for submit form btn
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createdItemLi(userInput.value);
  userInput.value = "";
});

//to generate li task from input
function createdItemLi(input) {
  const listItem = document.createElement("li");
  ulItem.appendChild(listItem);
  listItem.textContent = input;

  deleteBtn(listItem);
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
