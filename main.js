let saveCreateButton = document.querySelector('#btn-create-task')
let saveEditButton = document.querySelector('#btn-edit-task')
let inputCreate = document.querySelector('#i-create-task')
let inputEdit = document.querySelector('#i-edit-task')
let input = document.querySelector('.input')
let res = document.querySelector('#task-list')
let addButton = document.querySelector('#add-button')
let overlayCreateTask = document.querySelector('#overlayCreateTask')
let overlayEditTask = document.querySelector('#overlayEditTask')
let taskCreatePage = document.querySelector('#task-input-page')
let taskEditPage = document.querySelector('#task-edit-page')
let closeCreatePage = document.querySelector('#close-createTask-button')
let closeEditPage = document.querySelector('#close-editTask-button')

let taskToEdit;

addButton.addEventListener('click', (e) => {
  handlePageClose(true, overlayCreateTask, taskCreatePage)
})

inputCreate.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    if (!inputCreate.value) return;
    createTask(inputCreate.value)
    handlePageClose(false, overlayCreateTask, taskCreatePage)
  }
})

saveCreateButton.addEventListener('click', (e) => {
  if (!inputCreate.value) return
  createTask(inputCreate.value)
  handlePageClose(false, overlayCreateTask, taskCreatePage)
})

inputEdit.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    if (!inputEdit.value) return;
    saveEditTask()
    handlePageClose(false, overlayEditTask, taskEditPage)
  }
})

saveEditButton.addEventListener('click', (e) => {
  if (!inputEdit.value || !taskToEdit) return

  saveEditTask()

  handlePageClose(false, overlayEditTask, taskEditPage);
})

closeEditPage.addEventListener('click', (e) => {
  handlePageClose(false, overlayEditTask, taskEditPage)
})

closeCreatePage.addEventListener('click', (e) => {
  handlePageClose(false, overlayCreateTask, taskCreatePage)
})

res.addEventListener('click', (e) => {
  let button = e.target
  if (button.classList.contains('erase')) {
    button.parentElement.remove()
    saveTask()
  }
})

function handlePageClose(animationState, overlay, taskPage) {
  if (animationState) {
    overlay.style.display = 'flex'
    overlay.style.opacity = 1
    taskPage.style.transform = 'scale(1)'
  } else {
    overlay.style.opacity = 0
    taskPage.style.transform = 'scale(0.8)'
    setTimeout(() => overlay.style.display = 'none', 500)
  }
}

function createTaskText(text) {
  let content = document.createElement('p')
  content.setAttribute('class', 'taskContent')
  content.innerText = text + ' '
  return content
}

function createFrameTask() {
  let frame = document.createElement('div')
  frame.setAttribute('class', 'task')
  return frame
}

function createDeleteButton() {
  let deleteButton = document.createElement('img')
  deleteButton.setAttribute('src', 'img/delete.png')
  deleteButton.setAttribute('class', 'erase')
  return deleteButton
}

function createCheckButton() {
  let checkButton = document.createElement('img')
  checkButton.setAttribute('src', 'img/unchecked.png')
  checkButton.setAttribute('class', 'check-button')
  checkTask(checkButton)
  return checkButton
}

function createEditButton() {
  let editButton = document.createElement('img')
  editButton.setAttribute('src', 'img/edit.png')
  editButton.setAttribute('class', 'edit-button')
  openEditPage(editButton)

  return editButton
}

function createTask(text) {
  let task = createFrameTask()
  let content = createTaskText(text)
  let deleteButton = createDeleteButton()
  let checkButton = createCheckButton()
  let editButton = createEditButton()
  task.insertBefore(checkButton, task.firstChild)
  task.appendChild(content)
  task.appendChild(editButton)
  task.appendChild(deleteButton)
  res.appendChild(task)
  saveTask()
  clearInput()
}

function checkTask(checkButton) {
  checkButton.addEventListener('click', () => {
    let task = checkButton.parentNode
    checkButton.classList.add('checked')
    setTimeout(() => {
      if (checkButton.src.endsWith('unchecked.png')) {
        checkButton.src = 'img/checked.png'
        task.style.backgroundColor = '#1de78262'
        task.style.textDecoration = 'line-through'
      } else {
        checkButton.src = 'img/unchecked.png'
        task.style.backgroundColor = '#1dc9e74f'
        task.style.textDecoration = 'none'
      }

      checkButton.classList.remove('checked')
    }, 300);
  })
}

function saveEditTask() {
  taskToEdit.textContent = inputEdit.value
  saveTask()
  clearInput()
}

function saveTask() {
  const tasks = []
  const task = res.querySelectorAll('div')
  task.forEach((item) => {
    let text = item.textContent
    tasks.push(text)
    let tasksJSON = JSON.stringify(tasks)
    localStorage.setItem('Tarefas', tasksJSON)
  })
}

function loadTasks() {
  let tasksJSON = localStorage.getItem('Tarefas')
  let tasks = JSON.parse(tasksJSON)
  tasks.forEach((item) => createTask(item))
}

function openEditPage(editButton) {
  editButton.addEventListener('click', (e) => {
    handlePageClose(true, overlayEditTask, closeEditPage)
    taskToEdit = editButton.previousElementSibling
  })
}

function clearInput() {
  input.value = ''
  input.focus()
}

loadTasks()