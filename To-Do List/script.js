const taskInput = document.querySelector(".task-input input"),
  filters = document.querySelectorAll(".filters span"),
  clearAll = document.querySelector(".clear-all"),
  taskBox = document.querySelector(".task-box");

let editId;
let isEditedTask = false;

let todo = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo(btn.id);
  });
});

function showTodo(filter) {
  let li = "";
  if (todo) {
    todo.forEach((todo, id) => {
      let isCompleted = todo.status == "completed" ? "checked" : "";
      if (filter == todo.status || filter == "all") {
        li += `<li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="settings">
                    <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li onclick="editTask(${id}, '${todo.name}')"><i class="uil uil-pen"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="uil uil-trash"></i>Delete</li>
                    </ul>
                </div>
            </li>`;
      }
    });
  }
  taskBox.innerHTML = li || `<span>You don't have any tasks here!</span>`;
}
showTodo("all");

function showMenu(selectedTask) {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      taskMenu.classList.remove("show");
    }
  });
}

function editTask(taskId, taskName) {
  editId = taskId;
  isEditedTask = true;
  taskInput.value = taskName;
}

function deleteTask(deleteId) {
  todo.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todo));
  showTodo("all");
}

clearAll.addEventListener("click", () => {
  todo.splice(0, todo.length);
  localStorage.setItem("todo-list", JSON.stringify(todo));
  showTodo("all");
});

function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todo[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todo[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditedTask) {
      if (!todo) {
        todo = [];
      }
      let taskInfo = { name: userTask, status: "pending" };
      todo.push(taskInfo);
    } else {
      isEditedTask = false;
      todo[editId].name = userTask;
    }

    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todo));
    showTodo("all");
  }
});
