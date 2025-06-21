// Run everything only after the HTML has finished loading
document.addEventListener("DOMContentLoaded", () => {
    // ----- Select DOM elements -----
    const addButton  = document.getElementById("add-task-btn");
    const taskInput  = document.getElementById("task-input");
    const taskList   = document.getElementById("task-list");
    
    // Read tasks array from Local Storage (returns [] if nothing saved)
    function loadTasks() {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    }
  
    // Write tasks array back to Local Storage
    function saveTasks(tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // ----- Render a single task LI (with its “Remove” button) -----
    function renderTask(taskText, tasksArray) {
      const listItem = document.createElement("li");
      listItem.textContent = taskText;
  
      const rmvBtn = document.createElement("button");
      rmvBtn.textContent = "Remove";
      rmvBtn.classList.add("remove-btn");
  
      // When “Remove” is clicked, delete from DOM *and* Local Storage
      rmvBtn.onclick = () => {
        taskList.removeChild(listItem);
  
        // Update array and persist it
        const idx = tasksArray.indexOf(taskText);
        if (idx !== -1) tasksArray.splice(idx, 1);
        saveTasks(tasksArray);
      };
  
      listItem.appendChild(rmvBtn);
      taskList.appendChild(listItem);
    }
  
    // ----- Render any tasks that were previously stored -----
    const tasks = loadTasks();        // our in‑memory array
    tasks.forEach(task => renderTask(task, tasks));
  
    // ----- Add‑task function -----
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === "") {
        alert("Enter a task");
        return;
      }
  
      // Add to DOM
      renderTask(taskText, tasks);
  
      // Add to array & Local Storage
      tasks.push(taskText);
      saveTasks(tasks);
  
      // Clear input field
      taskInput.value = "";
    }
  
    // ----- Event listeners -----
    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", event => {
      if (event.key === "Enter") addTask();
    });
  });
  