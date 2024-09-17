const inputBox = document.getElementById('input-box');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filters button');

// Load tasks from localStorage on page load
window.onload = loadTasks;

// Add task on button click
addBtn.onclick = function() {
  const taskText = inputBox.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  addTask(taskText);
  saveTasks();
  inputBox.value = ''; 
};

// Add task to the list
function addTask(taskText, isCompleted = false) {
  const li = document.createElement('li');
  li.innerHTML = `
    ${taskText} <span class="delete-btn">✖</span>
  `;
  if (isCompleted) {
    li.classList.add('completed');
  }

  li.onclick = function() {
    li.classList.toggle('completed');
    saveTasks();
  };

  li.querySelector('.delete-btn').onclick = function(e) {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.ondblclick = function() {
    const newTaskText = prompt('Edit your task:', li.firstChild.textContent.trim());
    if (newTaskText) {
      li.firstChild.textContent = newTaskText;
      saveTasks();
    }
  };

  taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = Array.from(taskList.querySelectorAll('li')).map(li => ({
    text: li.firstChild.textContent.trim(),
    completed: li.classList.contains('completed')
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    JSON.parse(savedTasks).forEach(task => addTask(task.text, task.completed));
  }
}


filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    filterTasks(button.dataset.filter);
  });
});

function filterTasks(status) {
  const tasks = taskList.querySelectorAll('li');
  tasks.forEach(task => {
    switch (status) {
      case 'all':
        task.style.display = '';
        break;
      case 'completed':
        task.style.display = task.classList.contains('completed') ? '' : 'none';
        break;
      case 'pending':
        task.style.display = !task.classList.contains('completed') ? '' : 'none';
        break;
    }
  });
}




