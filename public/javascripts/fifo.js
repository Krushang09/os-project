var numbersInput;
var Frames;
var numbersArray;

function processForm(event) {
    event.preventDefault(); // Prevent form submission

    numbersInput = document.getElementById('numberInput').value;
    Frames = parseInt(document.getElementById('headPositionInput').value);

    numbersArray = numbersInput.split(' '); // Split input by spaces to get an array of numbers

    // Logging numbers and head position to the console
    console.log("Page Reference Sequence:");
    console.log(numbersArray);

    console.log("Frames :");
    console.log(Frames);

    main();
}

function main() {
    let pageFaults = 0;
    let m, n, s, pages;
    pages = numbersArray.length;
    console.log("Incoming\tFrame 1\tFrame 2\tFrame 3");
    let temp = new Array(Frames).fill(-1);
    for (m = 0; m < pages; m++) {
        s = 0;
        for (n = 0; n < Frames; n++) {
            if (numbersArray[m] == temp[n]) { // Changed comparison operator to ==
                s++;
                pageFaults--; // Decrement pageFaults if page is already in frame
            }
        }
        pageFaults++;
        if ((pageFaults <= Frames) && (s === 0)) {
            temp[pageFaults - 1] = numbersArray[m]; // Fixed index assignment
        } else if (s === 0) {
            temp[(pageFaults - 1) % Frames] = numbersArray[m]; // Fixed index assignment
        }
        displayTable(numbersArray[m], temp, m === 0); // Call displayTable function for each page reference
    }
    console.log("\nTotal Page Faults:\t" + pageFaults);
}

function displayTable(incoming, frames, isFirstRow) {
    let tableBody = document.getElementById("numberBody");
    let row = "";
    if (isFirstRow) { // Add the "Incoming" header only for the first row
        row += "<tr>";
        row += `<td>Incoming</td>`;
        for (let i = 0; i < frames.length; i++) {
            row += `<td>Frame ${i + 1}</td>`;
        }
        row += "</tr>";
    }

    let dataRow = "<tr>";
    dataRow += `<td>${incoming}</td>`;
    for (let i = 0; i < frames.length; i++) {
        if (frames[i] !== -1)
            dataRow += `<td>${frames[i]}</td>`;
        else
            dataRow += "<td>-</td>";
    }
    dataRow += "</tr>";

    if (!tableBody.innerHTML.trim()) {
        tableBody.innerHTML += row;
    }
    tableBody.innerHTML += dataRow;
}
