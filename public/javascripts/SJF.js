let processes = [];
let arrivalTimes = [];
let burstTimes = [];

// Retrieve the data
function getData() {
    const pro_cess = document.getElementById("process");
    const arrival_time = document.getElementById("arrival_time");
    const burst_time = document.getElementById("burst_time");

    const process = parseInt(pro_cess.value);
    const arrivalTime = parseInt(arrival_time.value);
    const burstTime = parseInt(burst_time.value);

    if (!isNaN(process) && !isNaN(arrivalTime) && !isNaN(burstTime)) {
        processes.push(process);
        arrivalTimes.push(arrivalTime);
        burstTimes.push(burstTime);

        pro_cess.value = '';
        arrival_time.value = '';
        burst_time.value = '';
        console.log("Process : ", process);
        console.log("Arrival Time : ", arrivalTime);
        console.log("Burst Time : ", burstTime);
    } else {
        console.log("Enter valid Number.");
    }
}

const completion_time = [];
const turnaround_time = [];
const waiting_time = [];
const SJI = [];
const currentTime = [];

function SJF() {
    const n = arrivalTimes.length;
    // const remaining_time = burstTimes.slice();
    const executed = new Array(n).fill(false);
    let current_time = 0;
    let completed = 0;
    

    while (completed < n) {
        let min_burst_time = Infinity;
        let shortest_job_index = -1;

        // Find the shortest job that has arrived
        for (let i = 0; i < n; i++) {
            if (!executed[i] && arrivalTimes[i] <= current_time && burstTimes[i] < min_burst_time) {
                min_burst_time = burstTimes[i];
                shortest_job_index = i;
            }
        }

        // If no job is found, move to the next time unit
        if (shortest_job_index === -1) {
            current_time++;
            continue;
        }

        // executionLog.push({ index: shortest_job_index, time: current_time });
        SJI.push(shortest_job_index);
        currentTime.push(current_time);

        for (let i = 0; i < n; i++) {
            console.log(SJI[i]);
        }


        for (let i = 0; i < n; i++) {
            console.log(currentTime[i]);
        }

        // Execute the shortest job
        completion_time[shortest_job_index] = current_time + burstTimes[shortest_job_index];
        turnaround_time[shortest_job_index] = completion_time[shortest_job_index] - arrivalTimes[shortest_job_index];
        waiting_time[shortest_job_index] = turnaround_time[shortest_job_index] - burstTimes[shortest_job_index];
        executed[shortest_job_index] = true;
        completed++;
        current_time = completion_time[shortest_job_index]; // Move time to when the job finishes
    }

    // Output results to console
    console.log("Process\tArrival Time\tCT\tTAT\tWT\t");
    for (let i = 0; i < n; i++) {
        console.log(`${i + 1}\t${arrivalTimes[i]}\t${completion_time[i]}\t${turnaround_time[i]}\t${waiting_time[i]}`);
    }

    // Calculate and display average waiting time and average turnaround time
    let total_waiting_time = waiting_time.reduce((acc, wt) => acc + wt, 0);
    let total_turnaround_time = turnaround_time.reduce((acc, tat) => acc + tat, 0);
    let avg_waiting_time = total_waiting_time / n;
    let avg_turnaround_time = total_turnaround_time / n;

    document.getElementById("avgWaitingTime").innerHTML = `Average Waiting Time : ${avg_waiting_time}`;
    document.getElementById("avgTurnaroundTime").innerHTML = `Average Turnaround Time : ${avg_turnaround_time}`;

    // Display the data in the table
    displayData();

    

    displayGanttChart();
    
   
}

function displayData() {
    const tbody = document.getElementById('numberBody');
    if (tbody) {
        tbody.innerHTML = '';
        for (let i = 0; i < processes.length; i++) {
            const row = `<tr>
                            <td >${processes[i]}</td>
                            <td>${arrivalTimes[i]}</td>
                            <td>${burstTimes[i]}</td>
                            <td>${completion_time[i]}</td>
                            <td>${turnaround_time[i]}</td>
                            <td>${waiting_time[i]}</td>
                        </tr>`;
            tbody.innerHTML += row;
        }
    } else {
        console.log("Element with ID 'numberBody' not found.");
    }
}

// const last = completion_time[n-1];
// console.log(last);

let new_completion_time = [];

function displayGanttChart(){
    const n = arrivalTimes.length;
    new_completion_time = completion_time.sort(function (a, b) { return a - b });
    
    const tbody = document.getElementById('gantt_chart');
    if (tbody) {
        tbody.innerHTML = '';

        // Construct the entire row HTML string
        let row = `<tr class'f'>`;
        for (let i = 0; i < SJI.length; i++) {
            row += `<th>${SJI[i] + 1}</th>`;
        }
         

        let row2 = `<tr class='g'>`;
        // Assuming another array is available named SJI2

        for (let i = 0; i < n; i++) {
            row2 += `<td >${currentTime[i]}</td>`;
        }
       
        row2 += `<td >${new_completion_time[n-1]}</td>`;
        row2 += `</tr>`;

        // Append the row to the table
        tbody.innerHTML = row + row2;
        
    } else {
        console.log("Element with ID 'gantt_chart' not found.");
    }
}