function startTimer(){
    console.log('Starting session timer'); // Debug Log

    // Check if timer a;readyh exists to prevent duplicates
    if (document.getElementById('sessionTimer')){
        console.log('Timer already exists, not creating a new one');
        return;
    }

    // Int session timer at zero seconds
    let sessionSeconds = 0;

    // Create timer display element
    const timerElement = document.createElement('div');
    timerElement.id = "sessionTimer";
    timerElement.style.marginTop = "20px";
    timerElement.style.color = "blue";
    timerElement.style.fontSize  = "18px";
    timerElement.style.textAlign = "center";
    document.body.appendChild(timerElement);

    // Update the timer dispaly initally
    updateTimerDisplay(timerElement, sessionSeconds);

    // Update timer every second
    let timerInterval = setInterval(() =>{
        sessionSeconds++;
        updateTimerDisplay(timerElement, sessionSeconds);

        // store current tier in sessionStorage ( automatically cleared when leaving the page) 
        sessionStorage.setItem('timeOnPage', sessionSeconds.toString());

        // Trigger special message for sessions over 5 minutes
        if (sessionSeconds === 300){
            showLongSessionMessage();
        }
    }, 1000);

    // when page is about to unload, stop the timer
    window.addEventListener('beforeunload', () => {
        console.log('Page unloading, stopping timer');
        clearInterval(timerInerval);
    });

    // Helper fnction to format display and time
    function updateTimerDisplay(element, totalSeconds){
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        let timeText = '⌚ Time on page';

        if(hours > 0){
            timeText += `${hours}h `;
        }

        if (hours > 0 || minutes > 0){
            timeText += `${minutes}m `;
        }

        timeText += `${seconds}s`;

        element.textContent = timeText;
    }

    // Show message for users spending a long time on the site
    function showLongSessionMessage(){
        console.log('Showing long session message (5 minutes)');

        // Check if msg already exists to prevent dupes
        if (document.getElementById('longSessionMessage')){
            console.log('Long session message already exists');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.id = "longSessionMessage";
        messageDiv.style.padding = '10px';
        messageDiv.style.margin = '20px 0';
        messageDiv.style.backgroundColor = 'orange';
        messageDiv.style.color = blue;
    }
}
startTimer();