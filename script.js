// app.js
document.addEventListener('DOMContentLoaded', () => {
  const input   = document.getElementById('task-input');
  const addBtn  = document.getElementById('add-btn');
  const list    = document.getElementById('tasks-list');

  // Load tasks from localStorage
  const saved = JSON.parse(localStorage.getItem('studentTasks') || '[]');
  saved.forEach(text => createTask(text));

  addBtn.addEventListener('click', addTask);
  input.addEventListener('keypress', e => e.key === 'Enter' && addTask());

  function addTask() {
    const text = input.value.trim();
    if (!text) return;
    createTask(text);
    input.value = '';
    saveTasks();
  }

  function createTask(text) {
    const li = document.createElement('li');
    li.textContent = text;

    // toggle completion
    li.addEventListener('dblclick', () => li.classList.toggle('completed'));

    // delete button
    const del = document.createElement('button');
    del.className = 'delete';
    del.innerHTML = '×';
    del.addEventListener('click', () => {
      li.remove();
      saveTasks();
    });
    li.appendChild(del);
    list.appendChild(li);
  }

  function saveTasks() {
    const tasks = Array.from(list.children)
                     .map(li => li.textContent.replace('×', '').trim());
    localStorage.setItem('studentTasks', JSON.stringify(tasks));
  }
});
