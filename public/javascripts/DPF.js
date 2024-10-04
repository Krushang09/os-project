const numPhilosophers = 5; // Number of philosophers
const forks = new Array(numPhilosophers).fill(1); // Initialize forks
let mutex = Promise.resolve(); // Initialize mutex as a resolved Promise
let run = false;

function state() {
    run = !run;
    const data = run ? 'STOP' : 'START';
    document.getElementById('statebtn').innerHTML = data;

    if (run) {
        for (let i = 0; i < numPhilosophers; i++) {
            philosopher(i);
        }
    }
}

// Function to simulate the philosopher's behavior
async function philosopher(index) {
    while (run) {
        console.log(`Philosopher ${index} is thinking...`);
        updateUI(index, `Philosopher ${index + 1} is thinking...`);
        await think(); // Simulate thinking

        const [leftFork, rightFork] = await Promise.all([
            acquireFork(index),
            acquireFork((index + 1) % numPhilosophers)
        ]); // Acquire left and right forks

        console.log(`Philosopher ${index} is eating...`);
        updateUI(index, `Philosopher ${index + 1} is eating...`);

        await eat(); // Simulate eating

        releaseFork(leftFork); // Release left fork
        releaseFork(rightFork); // Release right fork
    }
    const data = `Philosopher ${index + 1}`;
    updateUI(index, data);
}

// Function to simulate thinking
function think() {
    return new Promise(resolve => {
        setTimeout(resolve, Math.random() * 1000);
    });
}

// Function to simulate eating
function eat() {
    return new Promise(resolve => {
        setTimeout(resolve, Math.random() * 1000);
    });
}

// Function to acquire a fork
async function acquireFork(forkIndex) {
    await mutex; // Acquire mutex
    while (forks[forkIndex] === 0) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait if fork is not available
    }
    forks[forkIndex] = 0; // Set fork as unavailable
    mutex = Promise.resolve(); // Release mutex
    return forkIndex;
}

// Function to release a fork
function releaseFork(forkIndex) {
    forks[forkIndex] = 1; // Set fork as available
}

// Function to update UI
function updateUI(index, data) {
    document.getElementById(index.toString()).innerHTML = data;
}