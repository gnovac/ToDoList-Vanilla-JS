let $fullDate;
let $greeting;
let $taskCounter;
let $filterBtnsCollection;
let $clearAllBtn;
let $darkModeBtn;
let root = document.documentElement;
let $lightModeBtn;
let $alertInfo;
let $ulList;
let $newTask;
let $allTasks;
let $idNumber = 0;
let $todoinput;
let $addBtn;
let $popupWindow;
let $editTask;
let $editText;
let $alertPopup;
let $popupInput;
let $acceptBtn;
let $cancelBtn;


const main = () => {
    prepareDOMElement();
    prepareDOMEvents();
    formatDate();
    dayQuotes();
}

const prepareDOMElement = () => {
    $fullDate = document.querySelector('.current-date');
    $greeting = document.querySelector('h2');

    $taskCounter = document.querySelector('.tasks-counter');
    $filterBtnsCollection = document.querySelectorAll('.filter')
    $clearAllBtn = document.querySelector('.clear-all');
    $darkModeBtn = document.querySelector('.dark');
    $lightModeBtn = document.querySelector('.light');

    $alertInfo = document.querySelector('.error-info');
    $ulList = document.querySelector('.todo-list ul');
    $allTasks = document.getElementsByTagName('li');

    $todoinput = document.querySelector('.todo-input');
    $addBtn = document.querySelector('.add-btn');

    $popupWindow = document.querySelector('.popup');
    $popupInput = document.querySelector('.popup-input');
    $alertPopup = document.querySelector('.popup-info');
    $acceptBtn = document.querySelector('.accept');
    $cancelBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $todoinput.addEventListener('keyup', enterCheck);
    $ulList.addEventListener('click', checkClick);
    $acceptBtn.addEventListener('click', changeTask);
    $cancelBtn.addEventListener('click', closePopup);
    $filterBtnsCollection.forEach($filterBtn => {
        $filterBtn.addEventListener('click', filterTasks);
    });
    $clearAllBtn.addEventListener('click', deleteAllTasks);
    $darkModeBtn.addEventListener('click', darkMode);
    $lightModeBtn.addEventListener('click', lightMode);
}

const formatDate = () => {
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let year = today.getFullYear();
    today = day + '.' + month + '.' + year;
    $fullDate.textContent = today;
}

const dayQuotes = () => {
    let day2 = new Date().getDay();
    let titles = ['Leniwej niedzieli ⚾📺👀', 'Znośnego poniedziałku 💤☕😴', 'Spokojnego wtorku 👍✌', 'Połowa za tobą, już środa 📅😋😎🤤', 'Uśmiechu w czwartek 📅🙈', 'Wystrzałowego piątku 🥳😎✌', 'Radosnej soboty 🎉🤘🎈'];
    $greeting.innerHTML = titles[day2];
}

const addNewTask = () => {
    if ($todoinput.value != '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ulList.appendChild($newTask);
        taskContent();
        taskLeft();

        $todoinput.value = '';
        $alertInfo.innerHTML = '';
    } else {
        $alertInfo.innerHTML = 'Wpisz treść zadania!';
        $alertInfo.style.margin = '20px 0';
    }
}


const taskContent = () => {
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    completeBtn.innerHTML = '<i class="far fa-circle"></i>';

    const textArea = document.createElement('p');
    textArea.classList.add('text');
    textArea.textContent = $todoinput.value;

    const toolsArea = document.createElement('div');
    toolsArea.classList.add('tools');

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    editBtn.innerHTML = '<i class="fas fa-edit"></i>'

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'

    $newTask.append(completeBtn, textArea, toolsArea);
    toolsArea.append(editBtn, deleteBtn);
}

const checkClick = e => {
    if (e.target.closest('.complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.closest('i').classList.toggle('fa-check-circle');
        e.target.closest('i').classList.toggle('fa-circle');
    } else if (e.target.closest('.edit')) {
        editTask(e);
    } else if (e.target.closest('.delete')) {
        deleteTask(e);
    }
}

const editTask = e => {
    $editTask = e.target.closest('li').querySelector('.text');
    $popupInput.value = $editTask.textContent;
    $popupWindow.style.display = 'flex';
}

const closePopup = () => {
    $popupWindow.style.display = 'none';
}

const changeTask = () => {
    if ($popupInput.value != '') {
        $editTask.firstChild.textContent = $popupInput.value;
        $popupWindow.style.display = 'none';
        $alertPopup.textContent = '';

    } else {
        $alertPopup.textContent = 'Musisz podać treść zadania!';
    }
}

const deleteTask = e => {
    if (e.target.closest('.delete')) {
        e.target.closest('li').remove();
        $idNumber--;
        taskLeft();
    }

    if ($idNumber === 0) {
        $alertInfo.textContent = 'Chyba odpoczywasz, nie ma dodanych żadnych zadań!';
    }
}

const deleteAllTasks = () => {
    $ulList.innerHTML = '';
    $idNumber = 0;
    taskLeft();
    $alertInfo.textContent = 'Chyba odpoczywasz, nie ma dodanych żadnych zadań!';
}

const taskLeft = () => {
    $taskCounter.textContent = `Liczba zadań na liście: ${$idNumber}`;
}

const filterTasks = e => {
    const todos = $ulList.childNodes;
    todos.forEach(($allTasks) => {
        if ($allTasks.nodeName === "LI") {
            switch (e.target.dataset.filter) {
                case "all":
                    $allTasks.style.display = "flex";
                    break;

                case "completed":
                    if ($allTasks.classList.contains("completed")) {
                        $allTasks.style.display = "flex";
                    } else {
                        $allTasks.style.display = "none";
                    }
                    break;

                case "active":
                    if ($allTasks.classList.contains("completed")) {
                        $allTasks.style.display = "none";
                    } else {
                        $allTasks.style.display = "flex";
                    }
                    break;
            }
        }
    });
}

const darkMode = () => {
    root.style.setProperty('--pure-black-color', '#fff');
    root.style.setProperty('--pure-white-color', '#14161f');
    root.style.setProperty('--white-color', '#000');
    root.style.setProperty('--black-color', '#f9f9f9');
    root.style.setProperty('--border-color', '#303147');
}

const lightMode = () => {
    root.style.setProperty('--pure-black-color', '#000');
    root.style.setProperty('--pure-white-color', '#fff');
    root.style.setProperty('--white-color', '#f9f9f9');
    root.style.setProperty('--black-color', '#14161f');
    root.style.setProperty('--border-color', '#eee');
}

const enterCheck = () => {
    if (event.key === 'Enter') {
        addNewTask();
    }
}

document.addEventListener('DOMContentLoaded', main)