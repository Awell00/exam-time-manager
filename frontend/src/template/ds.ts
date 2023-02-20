import '../style.css'
import { io } from "socket.io-client"
import { zodFetch, elements, updateClock, selectValue, uri} from '../main'

// Constant that stores the database name
const db = "DS"

// Destructuring elements object to access individual elements
const { add, hours, minutes, subject, allSubject, select, modal, buttonModal, cancel } = elements

// Creating a socket connection to the specified URI
const socket = io(uri)

// Updating the clock every second
setInterval(() => updateClock(0, 0), 1000);

// Adding an event listener to the select element to get its value whenever it changes
select!.onchange = function() {
  // Accessing the text of the selected option
  let select_value = select!.options[select!.selectedIndex].text;

  // Calling the selectValue function with the selected value
  selectValue(select_value)
}

// Fetching data from the database and mapping through the result
zodFetch("GET", db).then(data => {
  data.map((value: { subject: string; clock: string, early: string, _id: string, extra: string }) => {
    // Creating HTML elements
    const div = document.createElement("div")
    const divButton = document.createElement("div")
    div.className = "subjectObject"
    divButton.className = "divButton"
    const stop = document.createElement("button")
    // const start = document.createElement("button")
    // Populating the div with the data
    div.innerHTML = `
      <div class="subject">${value.subject}</div>
      <div class="early">Anticipée: ${value.early}</div>
      <div class="extra">Tiers Temps: ${value.extra}</div>
      <div class="end">Fin: ${value.clock}</div>
    `
    // Adding the div to the allSubject element
    allSubject!.appendChild(div)
    // Populating the stop and start buttons
    stop.innerHTML = "Stop"
    // start.innerHTML = "Start"
    // Adding class names to the buttons
    stop.className = "button"
    // start.className = "button"
    // Adding the buttons to the divButton element
    // divButton.appendChild(start)
    divButton.appendChild(stop)
    // Adding the divButton to the div element
    div.appendChild(divButton)
    // Adding an event listener to the stop button to delete the div and emit an event
    stop.addEventListener('click', async event => {
      event.preventDefault()
      
      // Deleting the div from the database
      fetch(`${uri}${db}/` + value._id, {
        method: 'DELETE'
      })

      // Getting the parent node of the div and finding its index in the children of the parent
      const parentDiv = div!.parentNode;
      const index = Array.from(parentDiv!.children).indexOf(div!);

      // Emitting a "delete div DS" event with the index of the div
      socket.emit('delete div DS', index)
  
    })
  })
})

if (add) {
  // Add click event listener to the add button
  add.addEventListener("click", async event => {
    // Prevent the default behavior of the event
    event.preventDefault();

    // Define an interface for the data object
    interface Data {
      classroom: string,
      subject: string,
      early: string,
      extra: string,
      clock: string
    }

    // Calculate the total number of minutes
    const total = parseInt(hours!.value) * 60 + parseInt(minutes!.value);
  
    // Initialize early hours and minutes to zero
    let earlyHours: number = 0;
    let earlyMinutes: number = 0;
  
    // Determine the early hours and minutes based on the value of hours
    if (parseInt(hours!.value!) <= 1) {
      earlyHours = parseInt(hours!.value);
      earlyMinutes = parseInt(minutes!.value);
    } else if (parseInt(hours!.value!) > 1) {
      earlyHours = Math.floor((total / 3) / 60);
      earlyMinutes = (total / 3) % 60;
    }

    // Get the selected value of the select element
    // @ts-ignore
    let select_value = select.options[select.selectedIndex].text;

    // Create the data object
    let _data: Data = {
      classroom: select_value,
      subject: subject!.value,
      early: updateClock(earlyHours!, earlyMinutes!),
      extra: updateClock(parseInt(hours!.value) + earlyHours!, parseInt(minutes!.value) + earlyMinutes!),
      clock: updateClock(parseInt(hours!.value), parseInt(minutes!.value))
    };

    // Fetch the data from the database
    zodFetch("GET", db).then(data => {
      // Check if the subject already exists in the data
      const result = data.some((value: { subject: string }) => value.subject === _data.subject);

      // Get the number of elements in the data
      const count = Object.keys(data).length;

      // If the subject does not exist and the count is less than 3, post the data to the database
      if (!result && count < 3 && _data.subject !== "") {
        zodFetch("POST", db, _data).then(data => {
          // Emit the clock value to the server
          socket.emit('clock value DS', data);
        });
      }
    });

    // Reset the value of hours, minutes, and subject
    hours!.value = "";
    minutes!.value = "";
    subject!.value = "";

    // Hide the modal
    modal!.style.display = "none";
  });
}

// @ts-ignore
const receive = async (value) => {
  // Create a div element with class 'subjectObject'
  const div = document.createElement("div");
  const divButton = document.createElement("div");
  div.className = "subjectObject";
  divButton.className = "divButton";

  // Create button elements for 'start' and 'stop'
  const stop = document.createElement("button");
  // const start = document.createElement("button");

  // Set the innerHTML of the div element to display subject, early, extra, and clock values
  div.innerHTML = `
    <div class="subject">${value.subject}</div>
    <div class="early">Anticipée: ${value.early}</div>
    <div class="extra">Tiers Temps: ${value.extra}</div>
    <div class="end">Fin: ${value.clock}</div>
  `;

  // Append the div element to the 'allSubject' element
  allSubject!.appendChild(div);

  // Set the innerHTML of the start and stop buttons
  stop.innerHTML = "Stop";
  // start.innerHTML = "Start";

  // Set the className of the buttons
  stop.className = "button";
  // start.className = "button";

  // Append the buttons to the 'divButton' element
  // divButton.appendChild(start);
  divButton.appendChild(stop);

  // Append the 'divButton' element to the div element
  div.appendChild(divButton);

  // Add an event listener to the stop button to delete a record when clicked
  stop.addEventListener('click', async event => {
    event.preventDefault();
    
    // Send a DELETE request to delete the record with the specified _id
    fetch(`${uri}${db}/` + value._id, {
      method: 'DELETE'
    });

    // Get the parent div element and the index of the current div element
    const parentDiv = div!.parentNode;
    const index = Array.from(parentDiv!.children).indexOf(div!);

    // Emit a 'delete div DS' event with the index value
    socket.emit('delete div DS', index);
  });
}

// Listen for the 'clock value DS' event and call the 'receive' function when received
socket.on('clock value DS', receive);

// Listen for the 'delete div DS' event and remove the child element with the specified index
socket.on('delete div DS', (valueId) => {
  if (allSubject!.hasChildNodes()) {
    allSubject!.removeChild(allSubject!.children[valueId]);
  }
});

// Add an event listener to the 'buttonModal' element to display the modal when clicked
buttonModal!.onclick = function() {
  modal!.style.display = "block";
};

// Add an event listener to the 'cancel' element to hide the modal when clicked
cancel!.onclick = function() {
  modal!.style.display = "none";
};

// Add an event listener to the window to hide the modal when clicked outside of it
window.onclick = function(event) {
  if (event.target == modal) {
    modal!.style.display = "none"
  }
}

// Add a touchstart event listener to the window to detect when the user taps outside the modal
window.addEventListener('touchstart', function(event) {
  if (event.target == modal) {
    // Hide the virtual keyboard
    const focusedInputs = Array.from(document.querySelectorAll<HTMLInputElement>("input:focus"))
    for (let i = 0; i < focusedInputs.length; i++) {
      focusedInputs[i].blur();
    }

    // Close the modal
    modal!.style.display = "none";
  }
})


