

// function processForm(event) {
//     event.preventDefault(); // Prevent form submission

//     var numbersInput = document.getElementById('numberInput').value;
//     var headPositionInput = parseInt(document.getElementById('headPositionInput').value);

//     var numbersArray = numbersInput.split(' '); // Split input by spaces to get an array of numbers

//     // Logging numbers and head position to the console
//     console.log("Request Sequence:");
//     for (let i = 0; i <= numbersArray.length; i++) {
//         console.log(numbersArray[i]);
//     }

//     console.log("Initial Head Position:");
//     console.log(headPositionInput);

//     CLOOK(numbersArray, headPositionInput);
// }

// // Function to perform C-LOOK on the request
// // array starting from the given head
// function CLOOK(arr, head) {
//     let seek_count = 0;
//     let distance, cur_track;
//     let left = [];
//     let right = [];
//     let seek_sequence = [];

//     // Tracks on the left of the
//     // head will be serviced when
//     // once the head comes back
//     // to the beginning (left end)
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] < head)
//             left.push(arr[i]);
//         if (arr[i] > head)
//             right.push(arr[i]);
//     }

//     // Sorting left and right arrays
//     left.sort((a, b) => a - b);
//     right.sort((a, b) => a - b);

//     // First service the requests
//     // on the right side of the
//     // head
//     for (let i = 0; i < right.length; i++) {
//         cur_track = right[i];

//         // Appending current track to seek sequence
//         seek_sequence.push(cur_track);

//         // Calculate absolute distance
//         distance = Math.abs(cur_track - head);

//         // Increase the total count
//         seek_count += distance;

//         // Accessed track is now new head
//         head = cur_track;
//     }

//     // Once reached the right end
//     // jump to the last track that
//     // is needed to be serviced in
//     // left direction
//     seek_count += Math.abs(head - left[0]);
//     head = left[0];

//     // Now service the requests again
//     // which are left
//     for (let i = 0; i < left.length; i++) {
//         cur_track = left[i];

//         // Appending current track to seek sequence
//         seek_sequence.push(cur_track);

//         // Calculate absolute distance
//         distance = Math.abs(cur_track - head);

//         // Increase the total count
//         seek_count += distance;

//         // Accessed track is now the new head
//         head = cur_track;

        
//     }

//     console.log("Total number of seek operations = " + seek_count);
//     console.log("Seek Sequence is: ");
//     console.log(seek_sequence.join('\n'));

//     const tbody = document.getElementById("gantt_chart");
//         if (tbody) {
//             let row = `<tr class'f'>`;
//             for (let i = 0; i < seek_sequence.length; i++) {
//                 row += `<th>${seek_sequence[i]}</th>`;
//             }
//             row += '</tr>';
//             tbody.innerHTML = row;
//         }
//         else {
//             console.log("Element with ID 'gantt_chart' not found.");
//         }

//     drawChart();

// }

// function drawChart() {
//     var data = new google.visualization.DataTable();
//     data.addColumn('number', 'Track');
//     data.addColumn('number', 'Head Position');

//     // Calculate head movement and populate data
//     var head_position = headPositionInput;
//     var head_movement = 0;
//     var seek_sequence_with_head = [headPositionInput, ...seek_sequence];
//     for (let i = 0; i < seek_sequence_with_head.length; i++) {
//         data.addRow([i, head_position]);
//         head_movement += Math.abs(seek_sequence_with_head[i + 1] - seek_sequence_with_head[i]);
//         head_position = seek_sequence_with_head[i + 1];
//     }

//     var options = {
//         title: 'C-LOOK Disk Scheduling',
//         curveType: 'function',
//         legend: { position: 'bottom' }
//     };

//     var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

//     chart.draw(data, options);

//     console.log("Total head movement: " + head_movement);
// }
var headPositionInput;
google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => {
            console.log("Google Charts loaded successfully!");
        });
        
        function processForm(event) {
    event.preventDefault(); // Prevent form submission

    var numbersInput = document.getElementById('numberInput').value;
    headPositionInput = parseInt(document.getElementById('headPositionInput').value);

    var numbersArray = numbersInput.split(' '); // Split input by spaces to get an array of numbers

    // Logging numbers and head position to the console
    console.log("Request Sequence:");
    for (let i = 0; i < numbersArray.length; i++) {
        console.log(numbersArray[i]);
    }

    console.log("Initial Head Position:");
    console.log(headPositionInput);

    CLOOK(numbersArray, headPositionInput);
}

function CLOOK(arr, head) {
    let seek_count = 0;
    let distance, cur_track;
    let left = [];
    let right = [];
    let seek_sequence = [];

    // Tracks on the left of the
    // head will be serviced when
    // once the head comes back
    // to the beginning (left end)
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < head)
            left.push(arr[i]);
        if (arr[i] > head)
            right.push(arr[i]);
    }

    // Sorting left and right arrays
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    // First service the requests
    // on the right side of the
    // head
    for (let i = 0; i < right.length; i++) {
        cur_track = right[i];

        // Appending current track to seek sequence
        seek_sequence.push(cur_track);

        // Calculate absolute distance
        distance = Math.abs(cur_track - head);

        // Increase the total count
        seek_count += distance;

        // Accessed track is now new head
        head = cur_track;
    }

    // Once reached the right end
    // jump to the last track that
    // is needed to be serviced in
    // left direction
    seek_count += Math.abs(head - left[0]);
    head = left[0];

    // Now service the requests again
    // which are left
    for (let i = 0; i < left.length; i++) {
        cur_track = left[i];

        // Appending current track to seek sequence
        seek_sequence.push(cur_track);

        // Calculate absolute distance
        distance = Math.abs(cur_track - head);

        // Increase the total count
        seek_count += distance;

        // Accessed track is now the new head
        head = cur_track;
    }
    document.getElementById("seek_operations").innerHTML = `Total number of seek operations : ${seek_count}`;
    console.log("Total number of seek operations = " + seek_count);
    console.log("Seek Sequence is: ");
    console.log(seek_sequence.join('\n'));

    const tbody = document.getElementById("gantt_chart");
    
    if (tbody) {
        let row = `<tr class'f'>`;
        for (let i = 0; i < seek_sequence.length; i++) {
            row += `<th>${seek_sequence[i]}</th>`;
        }
        row += '</tr>';
        tbody.innerHTML = row;
    } else {
        console.log("Element with ID 'gantt_chart' not found.");
    }

    drawChart(seek_sequence, headPositionInput);
}

function drawChart(seek_sequence, initial_head) {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Track');
    data.addColumn('number', 'Head Position');

    // Calculate head movement and populate data
    var head_position = initial_head;
    var head_movement = 0;
    var seek_sequence_with_head = [initial_head, ...seek_sequence];
    for (let i = 0; i < seek_sequence_with_head.length; i++) {
        data.addRow([i, parseFloat(head_position)]);
        head_movement += Math.abs(seek_sequence_with_head[i + 1] - seek_sequence_with_head[i]);
        head_position = seek_sequence_with_head[i + 1];
    }

    var options = {
        title: 'C-LOOK Disk Scheduling',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);

    console.log("Total head movement: " + head_movement);
}






