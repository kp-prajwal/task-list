// defining UI vars

const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')
const timeInput = document.querySelector('#time')

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  //add task event
  form.addEventListener('submit', addTask)
  taskList.addEventListener('click', removeTask)
  clearBtn.addEventListener('click', clearTasks)
  filter.addEventListener('keyup', filterTasks)
}

// add task
function addTask(e) {
  if (taskInput.value === '' && timeInput.value === '') {
    alert('You have forgotten to add a task or time! Please check again')
  }
  else {
    //create li element
    const li = document.createElement('li')
    li.className = 'collection-item'
    // create text and append it to the li
    li.appendChild(document.createTextNode(taskInput.value))


    if (timeInput.value != '' && taskInput.value != '') {
      li.appendChild(document.createTextNode('        ' + 'Time :   ' + timeInput.value))
    }

    // create a new link
    const link = document.createElement('a')
    // add class
    link.className = 'delete-item secondary-content'
    // add icon html  
    link.innerHTML = '<i class =   "fa fa-remove"></i>'
    li.appendChild(link)
    // append li to ul
    taskList.appendChild(li)
    //store in LS
    storeTaskInLocalStorage(taskInput.value)
  }

  // clear input
  taskInput.value = ''
  timeInput.value = ''
  e.preventDefault()
}
// removing task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Delete task?')) {
      e.target.parentElement.parentElement.remove()
    }

  }
  e.preventDefault()
}

// clearing tasks
function clearTasks() {

  if (confirm('Do you want to clear your tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }
  }
}

//filtering tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase()
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}
// add it to local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))
}
