// Function to initiate snowfall
function initiateSnowfall() {
    const snowflakeContainer = document.querySelector(".snowflake-container");

    for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement("div");
        snowflake.classList.add("snowflake");
        snowflake.style.left = Math.random() * window.innerWidth + "px";
        snowflake.style.top = Math.random() * window.innerHeight + "px"; // Randomize vertical position
        snowflakeContainer.appendChild(snowflake);
    }
}

// Function to animate snowflakes
function animateSnowflakes() {
    const snowflakes = document.querySelectorAll(".snowflake");
    snowflakes.forEach((snowflake) => {
        snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
        snowflake.style.animationDelay = Math.random() * -2 + "s";
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = Math.random() * 10 + 10 + "px";
        snowflake.style.transform = "translateY(" + window.innerHeight + "px) translateX(-50%)"; // Start from top of window
    });
}

// Call the function to initiate snowfall
initiateSnowfall();

// Call the function to animate snowflakes
animateSnowflakes();


