const numPhilosophers = 5; // Number of philosophers
const forks = new Array(numPhilosophers).fill(1); // Initialize forks
let mutex = Promise.resolve(); // Initialize mutex as a resolved Promise
var run = true;
// Function to simulate the philosopher's behavior
async function philosopher(index) {
    while (run) {
        console.log(`Philosopher ${index} is thinking...`);

        await think(); // Simulate thinking

        await mutex; // Acquire mutex
        const [leftFork, rightFork] = await Promise.all([
            acquireFork(index),
            acquireFork((index + 1) % numPhilosophers)
        ]); // Acquire left and right forks
        mutex = Promise.resolve(); // Release mutex

        console.log(`Philosopher ${index} is eating...`);
        await eat(); // Simulate eating

        releaseFork(leftFork); // Release left fork
        releaseFork(rightFork); // Release right fork
    }
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
    while (forks[forkIndex] === 0) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait if fork is not available
    }
    forks[forkIndex] = 0; // Set fork as unavailable
    return forkIndex;
}

// Function to release a fork
function releaseFork(forkIndex) {
    forks[forkIndex] = 1; // Set fork as available
}

// Create a philosopher for each index
for (let i = 0; i < numPhilosophers; i++) {
    philosopher(i);
}


