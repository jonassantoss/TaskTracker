let saveButton = document.querySelector('#btn-task')
let input = document.querySelector('#itask')
let res = document.querySelector('#task-list')
let addButton = document.querySelector('#add-button')
let closeButton = document.querySelector('#close-button')
let overlay = document.querySelector('#overlay')
let inputPage = document.querySelector('.task-input-page')

addButton.addEventListener('click', () => {
  animationInputPage(true)
})

input.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    if (!input.value) return;
    createTask(input.value)
    animationInputPage(false)
  }
})

saveButton.addEventListener('click', (e) => {
  if (!input.value) return
  createTask(input.value)
  animationInputPage(false)
})

closeButton.addEventListener('click', () => {
  animationInputPage(false)
})

res.addEventListener('click', (e) => {
  let button = e.target
  if (button.className == 'erase') {
    button.parentElement.remove()
    saveTask()
  }
})

function animationInputPage(animationState) {
  if (animationState) {
    overlay.style.display = 'flex'
    overlay.style.opacity = 1
    inputPage.style.transform = 'scale(1)'
  } else {
    overlay.style.opacity = 0
    inputPage.style.transform = 'scale(0.8)'
    setTimeout(() => overlay.style.display = 'none', 500)
  }
}

function createTaskText(text) {
  let div = document.createElement('div')
  div.setAttribute('class', 'task taskAvailable')
  div.innerText = text + ' '
  return div
}

function createDeleteButton() {
  let deleteButton = document.createElement('img')
  deleteButton.setAttribute('src', 'img/delete.png')
  deleteButton.setAttribute('class', 'erase')
  return deleteButton
}

function createCheck() {
  let checkButton = document.createElement('img')
  let checkedButton = document.createElement('img')
  checkButton.setAttribute('src', 'img/unchecked.png')
  checkButton.setAttribute('class', 'check-button')
  checkTask(checkButton)
  return checkButton
}

function createTask(text) {
  let task = createTaskText(text)
  let deleteButton = createDeleteButton()
  let checkButton = createCheck()
  task.insertBefore(checkButton, task.firstChild)
  task.appendChild(deleteButton)
  res.appendChild(task)
  saveTask()
  clearInput()
}

function checkTask(checkButton) {
  checkButton.addEventListener('click', () => {
    checkButton.classList.add('checked')
    setTimeout(() => {
      if (checkButton.src.includes('unchecked.png')) {
        checkButton.src = 'img/checked.png'
      } else {
        checkButton.src = 'img/unchecked.png'
      }

      checkButton.classList.remove('checked')
    }, 300);
  })
}

function saveTask() {
  const tasks = []
  const task = res.querySelectorAll('div')
  task.forEach((item) => {
    let text = item.textContent
    text = text.replace('Apagar', '')
    tasks.push(text)
  })
  let tasksJSON = JSON.stringify(tasks)
  localStorage.setItem('Tarefas', tasksJSON)
}

function loadTasks() {
  let tasksJSON = localStorage.getItem('Tarefas')
  let tasks = JSON.parse(tasksJSON)
  tasks.forEach((item) => createTask(item))
}

function clearInput() {
  input.value = ''
  input.focus()
}

loadTasks()