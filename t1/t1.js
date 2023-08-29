// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here
class TaskManager {
  constructor(taskList) {
    this.taskList = taskList;
  }

  addTask(task) {
    this.taskList.push(task);
    console.log(this.taskList);
    document.getElementById('list').appendChild(this.renderTask(task));
  }

  removeTask(taskId) {
    this.taskList.splice(
      this.taskList.findIndex(task => task.id === taskId),
      1
    );
    console.log(this.taskList);
    document
      .getElementById('list')
      .removeChild(document.getElementById(`todo-${taskId}`).parentElement);
  }

  getTask(taskId) {
    return this.taskList.find(task => task.id === taskId);
  }

  getAllTasks() {
    return this.taskList;
  }

  renderTask(task) {
    const list = document.createElement('li');
    const input = document.createElement('input');
    const deleteButton = document.createElement('button');
    const label = document.createElement('label');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', `todo-${task.id}`);
    if (task.completed) input.setAttribute('checked', 'checked');
    input.addEventListener('click', () => this.checkCompleted(task.id));
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('id', `delete-${task.id}`);
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => this.removeTask(task.id));
    label.htmlFor = `todo-${task.id}`;
    label.textContent = task.task;
    list.appendChild(input);
    list.appendChild(deleteButton);
    list.appendChild(label);
    return list;
  }

  render() {
    document.getElementById('list').innerHTML = '';
    for (const i of this.getAllTasks())
      document.getElementById('list').appendChild(this.renderTask(i));
  }

  checkCompleted(taskId) {
    const task = this.getTask(taskId);
    task.completed = !task.completed;
    this.render();
  }
}

const taskManager = new TaskManager(todoList);

document.addEventListener('DOMContentLoaded', taskManager.render());
document.getElementsByClassName('add-btn')[0].addEventListener('click', () => {
  const dialog = document.getElementsByTagName('dialog')[0];
  dialog.showModal();

  dialog.getElementsByTagName('form')[0].addEventListener('submit', evt => {
    evt.preventDefault();
    const task = {
      id: taskManager.getAllTasks().length + 1,
      task: dialog.getElementsByTagName('input')[0].value,
      completed: false,
    };
    taskManager.addTask(task);
    dialog.close();
  });
});
