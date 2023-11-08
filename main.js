let btn = document.querySelector('#btn-task')
let input = document.querySelector('#itask')
let res = document.querySelector('#tasks')

input.addEventListener('keypress', (e) => {
  if (e.keyCode == 13) {
    if (!input.value) return;
    createTask(input.value)
  }
})

btn.addEventListener('click', (e) => {
  if (!input.value) return
  createTask(input.value)
})

res.addEventListener('click', (e) => {
  let button = e.target
  if (button.className == 'erase') {
    button.parentElement.remove()
    saveTask()
  }
})

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