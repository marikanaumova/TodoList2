let tasks = []
let inputValue = ''

const input = document.getElementById('input')
const btn = document.getElementById('btn')
const ul = document.querySelector('.list-ul')
const itemCount = document.getElementById('count')
const clearBtn = document.getElementById('btn-clear')
const li = document.createElement('li')

ul.appendChild(li)

itemCount.textContent = tasks.length

function getTasks (taskList) {
    return taskList.map((todo) => {
        return `
            <li class="list-item">
                <label class="task">
                    <input type="checkbox" class="checkbox" id="${todo.id}" ${todo.completed && 'checked'}>
                    <span class="checkmark"></span>
                    <span class="task-text">${todo.task}</span>
                </label>
            </li>
        `
    })
}

function getCheckboxes () {
    const checkboxes = document.querySelectorAll('.checkbox')
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            tasks = tasks.map(task => {
                if(task.id === +checkbox.getAttribute('id')) {
                    return {...task, completed: !task.completed}
                }
                return task
            })
            console.log(tasks)
        })
    })
}

function reRender() {
    li.innerHTML = getTasks(tasks).join('')
    itemCount.textContent = tasks.length
    getCheckboxes()
}

function resetInputValue() {
    input.value = ''
    inputValue = ''
}

const handleClick = (e) => {
    e.preventDefault()
    if (inputValue) {
        tasks.push({
            task: inputValue,
            id: Date.now(),
            completed: false
        })
    }
    resetInputValue()
    reRender()
}

const handleChange = () => {
    inputValue = input.value
}

const handleClear = () => {
    tasks = tasks.filter(task => task.completed === false)
    reRender()
}

btn.addEventListener('click', (e) => handleClick(e) )
input.addEventListener('change', handleChange)
clearBtn.addEventListener('click', handleClear)

