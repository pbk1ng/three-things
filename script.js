// 找到页面上的输入框、按钮和列表。
const input = document.querySelector('#task-input');
const button = document.querySelector('#add-button');
const list = document.querySelector('#task-list');

// 读取上次保存的任务；第一次打开时，从空列表开始。
const savedTasks = localStorage.getItem('three-things-tasks');
const storedTasks = savedTasks ? JSON.parse(savedTasks) : [];

// 旧版任务只有文字；新版同时记录文字和是否完成。
const tasks = storedTasks.map(function (task) {
  return typeof task === 'string' ? { text: task, done: false } : task;
});

function saveTasks() {
  localStorage.setItem('three-things-tasks', JSON.stringify(tasks));
}

// 把一件任务显示到页面上。
function showTask(task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;

  const text = document.createElement('span');
  text.textContent = task.text;
  text.style.textDecoration = task.done ? 'line-through' : 'none';

  checkbox.addEventListener('change', function () {
    task.done = checkbox.checked;
    text.style.textDecoration = task.done ? 'line-through' : 'none';
    saveTasks();
  });

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.textContent = '删除';
  deleteButton.setAttribute('aria-label', '删除任务：' + task.text);

  deleteButton.addEventListener('click', function () {
    // 从数据中删除这件任务，再保存，并移除页面上的这一行。
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    saveTasks();
    item.remove();
  });

  label.appendChild(checkbox);
  label.appendChild(text);
  item.appendChild(label);
  item.appendChild(deleteButton);
  list.appendChild(item);
}

// 页面打开时，显示之前保存的每一件任务。
tasks.forEach(showTask);

// 点击按钮时，执行大括号里的步骤。
button.addEventListener('click', function () {
  const taskText = input.value.trim();

  // 空白内容不添加到列表。
  if (taskText === '') {
    return;
  }

  // 更新任务数组，并将它保存到浏览器中。
  const task = { text: taskText, done: false };
  tasks.push(task);
  saveTasks();
  showTask(task);

  input.value = '';
  input.focus();
});
