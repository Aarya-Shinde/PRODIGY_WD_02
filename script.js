
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapTimes = [];

function startStop() {
    if (isRunning) {
        clearInterval(timer);
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 100);
    }
    isRunning = !isRunning;
}

function pause() {
    clearInterval(timer);
    isRunning = false;
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapTimes = [];
    updateLapTimes();
}

function lap() {
    if (isRunning) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(formatTime(lapTime));
        updateLapTimes();
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const formattedTime = formatTime(elapsedTime);
    document.getElementById('stopwatch').textContent = formattedTime;
}

function updateLapTimes() {
    const lapTimesElement = document.getElementById('lap-times');
    lapTimesElement.innerHTML = '<h3>Lap Times:</h3>';
    lapTimes.forEach((lap, index) => {
        lapTimesElement.innerHTML += `<p>Lap ${index + 1}: ${lap}</p>`;
    });
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsDisplay = Math.floor((milliseconds % 1000) / 10);

    return `${minutes}:${String(seconds).padStart(2, '0')}:${String(millisecondsDisplay).padStart(2, '0')}`;
}
