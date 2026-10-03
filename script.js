// 找到页面上的输入框、按钮和列表。
const input = document.querySelector('#task-input');
const button = document.querySelector('#add-button');
const list = document.querySelector('#task-list');

// 读取上次保存的任务；第一次打开时，从空列表开始。
const savedTasks = localStorage.getItem('three-things-tasks');
const tasks = savedTasks ? JSON.parse(savedTasks) : [];

// 把一件任务显示到页面上。
function showTask(task) {
  const item = document.createElement('li');
  item.textContent = task;
  list.appendChild(item);
}

// 页面打开时，显示之前保存的每一件任务。
tasks.forEach(showTask);

// 点击按钮时，执行大括号里的步骤。
button.addEventListener('click', function () {
  const task = input.value.trim();

  // 空白内容不添加到列表。
  if (task === '') {
    return;
  }

  // 更新任务数组，并将它保存到浏览器中。
  tasks.push(task);
  localStorage.setItem('three-things-tasks', JSON.stringify(tasks));
  showTask(task);

  input.value = '';
  input.focus();
});
