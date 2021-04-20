// Hexsweeper Timer


export function startTimer(timer, timerElem, delta) {
    // Starts the timer and returns the timerID from setInterval
    return setInterval(function(){updateTimer(timer, timerElem, delta);}, delta);
};


function updateTimer(timer, timerElem, delta) {
    // Updates and rerenders the timer
    timer[0] += delta;
    renderTimer(timer, timerElem);
};


export function renderTimer(timer, timerElem) {
    // Renders the timer value, in seconds, into the timer element
    timerElem.innerHTML = (timer[0] / 1000).toFixed(2) + " s";
};


export function stopTimer(timerID) {
    // Clears the interval, stopping the timer
    clearInterval(timerID);
};