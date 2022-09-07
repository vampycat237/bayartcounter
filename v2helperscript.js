//helper methods for v2 stuff!

//toggles the class "selected" on a dropdown container
function toggleSelected(divId) {
	//retrieves the dropdown container element
	const dropdown = document.getElementById(divId);
	dropdown.classList.toggle("selected");
}

//code to make draggable windows - taken from w3schools.com! too many things for my brain.
//Make the DIV element draggagle:
dragElement(document.getElementById("media"));
dragElement(document.getElementById("debug"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//message management
const messageContainer = document.getElementById('message-container');
//const messageBorder = document.getElementById('message-border');
//const messageDiv    = document.getElementById('message');
const messageText   = document.getElementById('message-content');
//const messageButton = document.getElementById('message-button');

function showMessage(message, timeToShow = 5000) {
	messageContainer.style.display = "flex";
	
	messageText.innerHTML   = message;
	//toggleMessageVisibility();
	messageContainer.classList.add("selected");
	
	//setTimeout(hideMessage, timeToShow);
}

function hideMessage() {
	//do the same thing as toggleSelected, but make sure it's making it *not* selected
	messageContainer.classList.remove("selected");
	
	//we don't need to set the display to none anymore, hopefully at least
	setTimeout(hideMessage2, 3000);
}

//helper method to reduce redundancy
/*function toggleMessageVisibility() {
	//old way - fades in and out with transparency
	/*messageBorder.classList.toggle("show");
	messageDiv.classList.toggle("show");
	messageText.classList.toggle("show");
	messageButton.classList.toggle("show");*/
	
	/*//new way - expands down like the dropdowns, using the same code
	toggleSelected('message-container');
}*/

function hideMessage2() {
	messageContainer.style.display = "none";
}

//shows the debug menu
const debugMenu = document.getElementById('debug');

function toggleDebug() {
	if (debugMenu.style.display == "none") {
		showDebug();
	} else {
		hideDebug();
	}
}

function showDebug() {
	debugMenu.style.display = "flex";
}

function hideDebug() {
	debugMenu.style.display = "none";
}