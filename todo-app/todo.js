const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// LOAD TASKS

displayTasks(tasks);

// ADD TASK

function addTask(){

  const text = taskInput.value.trim();

  if(text === ""){
    alert("Please enter a task");
    return;
  }

  const task = {
    id:Date.now(),
    text:text,
    completed:false
  };

  tasks.push(task);

  saveTasks();

  displayTasks(tasks);

  taskInput.value = "";

}

// DISPLAY TASKS

function displayTasks(taskArray){

  taskList.innerHTML = "";

  taskArray.forEach(task => {

    const li = document.createElement("li");

    li.classList.add("task-item");

    if(task.completed){
      li.classList.add("completed");
    }

    li.innerHTML = `

      <span class="task-text">
        ${task.text}
      </span>

      <div class="task-buttons">

        <button
        class="complete-btn"
        onclick="toggleComplete(${task.id})">

        <i class="fa-solid fa-check"></i>

        </button>

        <button
        class="edit-btn"
        onclick="editTask(${task.id})">

        <i class="fa-solid fa-pen"></i>

        </button>

        <button
        class="delete-btn"
        onclick="deleteTask(${task.id})">

        <i class="fa-solid fa-trash"></i>

        </button>

      </div>

    `;

    taskList.appendChild(li);

  });

  updateProgress();

}

// COMPLETE TASK

function toggleComplete(id){

  tasks = tasks.map(task => {

    if(task.id === id){
      task.completed = !task.completed;
    }

    return task;

  });

  saveTasks();

  displayTasks(tasks);

}

// DELETE TASK

function deleteTask(id){

  tasks = tasks.filter(task => task.id !== id);

  saveTasks();

  displayTasks(tasks);

}

// EDIT TASK

function editTask(id){

  const task = tasks.find(task => task.id === id);

  const updatedText = prompt(
    "Edit your task:",
    task.text
  );

  if(updatedText !== null){

    task.text = updatedText;

    saveTasks();

    displayTasks(tasks);

  }

}

// FILTERS

function filterTasks(type){

  if(type === "completed"){

    const completedTasks =
    tasks.filter(task => task.completed);

    displayTasks(completedTasks);

  }

  else if(type === "pending"){

    const pendingTasks =
    tasks.filter(task => !task.completed);

    displayTasks(pendingTasks);

  }

  else{

    displayTasks(tasks);

  }

}

// LOCAL STORAGE

function saveTasks(){

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

}

// PROGRESS BAR

function updateProgress(){

  const completed =
  tasks.filter(task => task.completed).length;

  const total = tasks.length;

  let percent = 0;

  if(total > 0){
    percent = (completed / total) * 100;
  }

  document.getElementById("progressFill")
  .style.width = percent + "%";

  document.getElementById("progressText")
  .innerText = Math.round(percent) + "%";

}