console.log("Script loaded");

async function fetchTodos() {

  const list = document.getElementById("todoList");

  // Loading shimmer
  list.innerHTML = `
    <div class="loading"></div>
    <div class="loading"></div>
  `;

  const res = await fetch("/api/todos");
  const todos = await res.json();

  list.innerHTML = "";

  if (todos.length === 0) {
    list.innerHTML = "<p style='color:#6b7280;'>No tasks yet.</p>";
    return;
  }

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.style.animationDelay = `${index * 0.05}s`;

    if (index === todos.length - 1) {
      li.classList.add("new-task");
    }

    li.innerHTML = `
      <span class="${todo.done ? "done" : ""}">
        ${todo.task}
      </span>
      <div class="actions">
        <button onclick="markDone(${todo.id})">✓</button>
        <button onclick="deleteTodo(${todo.id})">✕</button>
      </div>
    `;

    list.appendChild(li);
  });
}


async function addTodo() {
  const input = document.getElementById("taskInput");
  if (!input.value.trim()) return;

  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: input.value })
  });

  input.value = "";
  fetchTodos();
}

async function markDone(id) {
  await fetch(`/api/todos/${id}`, { method: "PUT" });
  fetchTodos();
}

async function deleteTodo(id) {
  const listItem = [...document.querySelectorAll("li")]
    .find(li => li.innerHTML.includes(id));

  if (listItem) {
    listItem.classList.add("removing");
    setTimeout(async () => {
      await fetch(`/api/todos/${id}`, { method: "DELETE" });
      fetchTodos();
    }, 250);
  } else {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    fetchTodos();
  }
}


fetchTodos()

document.getElementById("addBtn").addEventListener("click", addTodo);
document.getElementById("taskInput")
  .addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  });



