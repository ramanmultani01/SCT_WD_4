let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = 'all';

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = `task ${task.completed ? "completed" : ""}`;
      li.innerHTML = `
        <strong>${task.title}</strong>
        <p>${task.description}</p>
        <small>Due: ${new Date(task.dueDate).toLocaleString()}</small>
        <div class="task-actions">
          <button class="complete" onclick="toggleComplete(${index})">
            ${task.completed ? "Undo" : "Complete"}
          </button>
          <button class="edit" onclick="editTask(${index})">Edit</button>
          <button class="delete" onclick="deleteTask(${index})">Delete</button>
        </div>
      `;
      list.appendChild(li);
    });
}

function addTask(e) {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const dueDate = document.getElementById("dueDate").value;

  if (!title || !dueDate) return alert("Title and due date are required!");

  tasks.push({
    title,
    description,
    dueDate,
    completed: false
  });
  saveTasks();
  renderTasks();
  e.target.reset();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById("title").value = task.title;
  document.getElementById("description").value = task.description;
  document.getElementById("dueDate").value = task.dueDate;
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function filterTasks(type) {
  filter = type;
  renderTasks();
}

document.getElementById("task-form").addEventListener("submit", addTask);
renderTasks();
