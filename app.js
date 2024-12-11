alert("saytimga xush kelibsiz")

// Task 1: Rangli bloklar o'yini
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A8', '#F7FF33', '#33FFF7', '#F733FF', '#FF8033', '#33FF83'];

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

const blocks = document.querySelectorAll('.block');
const text = document.querySelector('#text');
let moveCount = 0;

blocks.forEach(block => {
    block.addEventListener('click', () => {
        block.style.backgroundColor = getRandomColor();
        moveCount++;
        checkGameStatus();
    });
});

function checkGameStatus() {
    const allColors = [...blocks].map(block => block.style.backgroundColor);
    const firstColor = allColors[0];
    const allSame = allColors.every(color => color === firstColor && color !== '');

    if (allSame) {
        text.innerHTML = `Tabriklaymiz! Siz o'yinni tugatdingiz. Harakatlar soni: ${moveCount}`;
        text.style.color = 'green';
    }
}

// Task 2: Vazifalar ro'yxati
const wrapper = document.querySelector('#wrapper');
const input = document.querySelector('#in');
const addButton = document.querySelector('#btn');

addButton.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (taskText) {
        const taskBlock = document.createElement('div');
        taskBlock.className = 'block';

        const taskTitle = document.createElement('h3');
        taskTitle.className = 'text2';
        taskTitle.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'del';
        deleteButton.textContent = "O'chirish";

        taskBlock.appendChild(taskTitle);
        taskBlock.appendChild(deleteButton);
        wrapper.appendChild(taskBlock);

        input.value = '';

        // O'chirish funksiyasi
        deleteButton.addEventListener('click', () => {
            taskBlock.remove();
        });

        // O'chgan ko'rinish qilish
        taskTitle.addEventListener('click', () => {
            if (taskTitle.style.textDecoration === 'line-through') {
                taskTitle.style.textDecoration = 'none';
                taskTitle.style.color = 'black';
            } else {
                taskTitle.style.textDecoration = 'line-through';
                taskTitle.style.color = 'gray';
            }
        });
    }
});

// Task 3: Vaqtni hisoblash (timer)
let startButton = document.querySelector('#start');
let stopButton = document.querySelector('#stop');
let resetButton = document.querySelector('#reset');
let timerDisplay = document.querySelector('#timerDisplay');

let timer = null;
let isRunning = false;
let hours = 0, minutes = 0, seconds = 0;

function updateTimerDisplay() {
    timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                }
            }
            updateTimerDisplay();
        }, 1000);
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    updateTimerDisplay();
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

// Boshlang'ich holatini yangilash
updateTimerDisplay();
