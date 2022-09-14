//helper methods for v2 stuff!

//toggles the class "selected" on a dropdown container
function toggleSelected(divId) {
	//retrieves the dropdown container element
	const dropdown = document.getElementById(divId);
	dropdown.classList.toggle("selected");
}

//code to make draggable windows - taken from w3schools.com & modified! too many things for my brain.
//List of elements to make draggable
const draggables = document.getElementsByClassName("draggable");
//Make the DIV elements draggable:
for (var e of draggables) {
	dragElement(e);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
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
const messageText   = document.getElementById('message-content');

function showMessage(message, timeToShow = 5000) {
	messageContainer.style.display = "flex";
	
	messageText.innerHTML   = message;
	messageContainer.classList.add("selected");
	
	//setTimeout(hideMessage, timeToShow);
}

function hideMessage() {
	//do the same thing as toggleSelected, but make sure it's making it *not* selected
	messageContainer.classList.remove("selected");
	
	//we don't need to set the display to none anymore, hopefully at least
	setTimeout(hideMessage2, 3000);
}

function hideMessage2() {
	messageContainer.style.display = "none";
}

//shows the debug menu
const debugMenu = document.getElementById('debug');

function toggleDebug() {
	if (debugMenu.style.display == "none") {
		show(debugMenu);
	} else {
		hide(debugMenu);
	}
}

//elmntId version of toggleVisibility
function showHide(elmntId) {
	toggleVisibility(document.getElementById(elmntId))
}

function toggleVisibility(elmnt, secondCall = false) {
	//if elmnt is a string, we try to call again thru showHide() assuming it's an ID
	if (typeof elmnt == 'string') {
		showHide(elmnt);
		return;
	}
	
	//elmnt is an element! phew.
	else {
		if (elmnt.style.display == "none") {
			show(elmnt);
		}
		else {
			hide(elmnt);
		}
	}
}

function hide(elmnt) {
	elmnt.style.display = "none";
}

function show(elmnt, d = "flex") {
	elmnt.style.display = d;
}

//base value editing
//TODO: store base values in here
var baseValues = [];
//base values editor
const baseValEditor = {
	editor   : document.getElementById('base-values'),
	header   : document.getElementById('base-values-header'),
	count    : document.getElementById('base-values-count'),
	media    : document.getElementById('base-values-media'),
	coverage : document.getElementById('base-values-coverage'),
	action   : document.getElementById('base-values-action'),
	index    : document.getElementById('base-values-index')
};

//TODO: shows BaseVal editor while making its title change to fit the action being performed
//parameter action: a string. either "edit" or "new"/"create"/"add"
//parameter i: an int, meant to be the BaseVal's index
function openBaseValEditor(action, i = -1) {
	var title = "base value editor";
	var count = 1;
	var media = "flatcolor";
	var coverage = "fullbody";
	
	//calls actionIsEdit() to check for valid edit requests. if it's valid for editing it returns true, otherwise it returns false. it also prints an error when there is an invalid action passed in.
	if (actionIsEdit(action, i)) {
		console.log("opening base value editor: edit");
		
		//set title & set values to the stuff from the object we are editing
		title = "edit base value";
		
		//TODO: get info for these
		count = 1;
		media = "flatcolor";
		coverage = "fullbody";
		
		//TODO: fetch BaseVal's content to display for editing
		
	} else {
		console.log("opening base value editor: add new");
		
		//set title, leave other stuff as default
		title = "add new base value";
	}
	
	//now we are clear to update the editor's into then show the editor
	//edit the innerHTML
	baseValEditor.header.innerHTML = title;
	baseValEditor.count.innerHTML  = count;
	baseValEditor.media.innerHTML  = media;
	baseValEditor.coverage.innerHTML = coverage;
	
	//set the hidden values
	baseValEditor.action.value = action;
	baseValEditor.index.value  = i;
	
	//show the editor
	show(baseValEditor.editor);
	
}

//TODO: Upon confirming edit BaseVal, edit the BaseVal based on index
//paramether value: values to pass into the object
//parameter i: index in the baseValues list
function editBaseVal(value, i) {
	//TODO: construct baseval from values (or pass object as parameter?)
	
	//TODO: find and replace the old baseval with the new one
	
	console.log("edited base val [non-functional]");
}

//TODO: Upon confirming add BaseVal, add the new BaseVal
//paramether value: values to pass into the object
function addBaseVal(value) {
	//TODO: construct baseval from values (or pass object as parameter?)
	
	//TODO: add the new baseval to the end of the list
	
	console.log("added new base val [non-functional]");
}

//checks action! returns true for edit, false for anything else, and prints an error if the action is invalid
//parameter: string action
//returns: bool, based on if action == edit
function actionIsEdit(action, i = -1) {
	//case: edit
	//TODO: add check for invalid index (greater than list size)
	if (action == "edit" && i >= 0) { return true; }
	
	//case: create new
	if (action == "new" || action == "create" || action == "add") { return false; }
	
	//case: invalid action
	console.log("invalid action passed to base value editor. defaulting to adding new value");
	showMessage("invalid action passed to base value editor.<br>defaulting to adding new value");
	return false;
}