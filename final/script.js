window.onload = function () {
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        document.getElementById("datetime").innerHTML = `${hours}:${minutes}:${seconds}`;
    }

    updateTime(); // Initialize time immediately
    setInterval(updateTime, 1000); // Update every second
};

// Show overlay function
function showOverlay(overlayId) {
    document.getElementById(overlayId).style.display = "block";
}

// Hide overlay function
function hideOverlay(overlayId) {
    document.getElementById(overlayId).style.display = "none";
}

// Toggle start menu
function toggleStartMenu() {
    const startMenu = document.getElementById("start-menu");
    startMenu.style.display = startMenu.style.display === "block" ? "none" : "block";
}

// Hide start menu
function hideStartMenu() {
    document.getElementById("start-menu").style.display = "none";
}

// Show BSOD
function showBSOD() {
    document.getElementById("bsod").style.display = "flex";
    const logOffSound = new Audio('BSOD.mp3');
    logOffSound.play();
}

// Hide BSOD
function hideBSOD() {
    document.getElementById("bsod").style.display = "none";
}

// Show large image and BSOD
function showLargeImageAndBSOD() {
    // Show the large image overlay
    document.getElementById('largeImageOverlay').style.display = 'block';

    // After a brief delay (3 seconds), show the BSOD
    setTimeout(function () {
        document.getElementById('largeImageOverlay').style.display = 'none'; // Hide large image
        showBSOD(); // Show BSOD overlay
    }, 3000); // 3-second delay
}
// Show the log-off confirmation overlay
document.getElementById('logOffButton').addEventListener('click', function () {
    document.getElementById('logOffOverlay').style.display = 'flex';
});

// Handle the "Stay" button to close the overlay
document.getElementById('cancelLogOff').addEventListener('click', function () {
    document.getElementById('logOffOverlay').style.display = 'none';
});

// Handle the "Log Off" button
document.getElementById('confirmLogOff').addEventListener('click', function () {
    // Hide the confirmation overlay
    document.getElementById('logOffOverlay').style.display = 'none';

    // Show the log-off screen
    document.getElementById('logOffScreen').style.display = 'flex';

    // Play the log-off sound
    const logOffSound = new Audio('log-off.mp3');
    logOffSound.play();

    // Optional: Automatically "reset" after some time (e.g., return to task menu)
    setTimeout(function () {
        document.getElementById('logOffScreen').style.display = 'none';
    }, 5000); // 5 seconds
});