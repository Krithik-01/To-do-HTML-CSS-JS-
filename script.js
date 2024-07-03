const addbtn = document.querySelector(".add-btn");
const taskinput = document.querySelector(".wrapper input");
const taskcontainer = document.querySelector(".tasks");
const error = document.querySelector(".error");
const countvalue = document.querySelector(".count-value");

let tasks = []; 

const displayCount = () => {
    countvalue.innerText = tasks.length;
    
}

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const loadTasks = () => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            renderTask(task);
        });
        displayCount();
    }
}

const renderTask = (task) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
        <input type="checkbox" class="task-check">
        <span class="taskname">${task.name}</span>
        <button class="edit">
            <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="delete">
            <i class="fa-solid fa-trash"></i>    
        </button>
    `;
    taskcontainer.appendChild(taskElement);

    setupTaskEvents(taskElement, task);
}

const addTask = () => {
    const taskName = taskinput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        error.style.display = "block";
        return;
    }

    const newTask = {
        id: Date.now().toString(), 
        name: taskName,
        completed: false
    };

    tasks.push(newTask);
    saveTasks(); 
    renderTask(newTask);

    taskinput.value = "";
    displayCount();
}

const setupTaskEvents = (taskElement, task) => {
    const deleteButton = taskElement.querySelector('.delete');
    const editButton = taskElement.querySelector('.edit');
    const checkbox = taskElement.querySelector('.task-check');

    deleteButton.addEventListener('click', () => {
        taskcontainer.removeChild(taskElement);
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks(); 
        displayCount();
    });

    editButton.addEventListener('click', () => {
        taskinput.value = task.name;
        taskcontainer.removeChild(taskElement);
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks(); 
        displayCount();
    });

    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTasks(); 
        if (checkbox.checked) {
            taskElement.querySelector('.taskname').classList.add('completed');
        } else {
            taskElement.querySelector('.taskname').classList.remove('completed');
        }
    });
}

addbtn.addEventListener('click', addTask);

window.onload = () => {
    loadTasks(); 
}
