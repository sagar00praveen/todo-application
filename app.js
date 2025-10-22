const API_URL = "https://dummyjson.com/todos";
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

async function fetchTodos() {
  try {
    taskList.innerHTML = "<li>Loading tasks...</li>";
    const res = await fetch(API_URL + "?limit=5");
    const data = await res.json();

    taskList.innerHTML = "";
    data.todos.forEach((t) => createTaskItem(t.todo, t.completed));
  } catch (err) {
    taskList.innerHTML = "<li>Failed to load todos.</li>";
    console.error(err);
  }
}

function createTaskItem(text, completed = false) {
  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox" ${completed ? "checked" : ""}/>
    <span style="text-decoration:${completed ? "line-through" : "none"}">${text}</span>
    <button class="delete">Delete</button>
  `;

  li.querySelector(".delete").addEventListener("click", () => li.remove());
  li.querySelector("input").addEventListener("change", (e) => {
    li.querySelector("span").style.textDecoration = e.target.checked
      ? "line-through"
      : "none";
  });

  taskList.appendChild(li);
}

function addTask() {
  const text = taskInput.value.trim();
  if (!text) return alert("Please enter a task");
  createTaskItem(text);
  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => e.key === "Enter" && addTask());

fetchTodos();
