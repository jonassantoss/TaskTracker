let saveButton = document.querySelector('#btn-task')
let input = document.querySelector('#itask')
let res = document.querySelector('#tasks')
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

function createTask(text) {
  let li = createLi(text)
  let button = createButton()
  li.appendChild(button)
  res.appendChild(li)
  saveTask()
  clearInput()
}

function saveTask() {
  const tasks = []
  const task = res.querySelectorAll('li')
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

function createLi(text) {
  let li = document.createElement('li')
  li.innerText = text + ' '
  return li
}

function createButton() {
  let button = document.createElement('button')
  button.setAttribute('class', 'erase')
  button.innerText = 'Apagar'
  return button
}

loadTasks()