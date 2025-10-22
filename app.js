const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return alert("Please enter a task!");

  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" />
    <span>${taskText}</span>
    <button class="delete">Delete</button>
  `;

  taskList.appendChild(li);
  taskInput.value = "";

  li.querySelector(".delete").addEventListener("click", () => li.remove());
  li.querySelector("input").addEventListener("change", (e) => {
    li.querySelector("span").style.textDecoration = e.target.checked
      ? "line-through"
      : "none";
  });
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => e.key === "Enter" && addTask());
