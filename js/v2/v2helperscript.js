//helper methods for v2 stuff!
//LOADED FIRST after shellcounter

//DECLARING VARIABLES FOR COMMONLY CALLED ELEMENTS:
//debug menu
const debugMenu = document.getElementById('debug');
//messages
const message = {
	container : document.getElementById('message-container'),
	border    : document.getElementById('message-border'),
	content   : document.getElementById('message-content')
};
//info
const info = {
	container: document.getElementById('info'),
	content: document.getElementById('info-content')
};
//base values editor
const baseValEditor = {
	editor: document.getElementById('base-values'),
	header: document.getElementById('base-values-header'),
	count: document.getElementById('base-values-count'),
	media: document.getElementById('base-values-media'),
	coverage: document.getElementById('base-values-coverage'),
	size: document.getElementById('base-values-size'),

	action: document.getElementById('base-values-action'),
	index: document.getElementById('base-values-index'),

	coverageMini: document.getElementById('coverage-mini'),
	sizes: {
		model: document.getElementById('size-model'),
		large: document.getElementById('size-large')
	}
};


/*//checks for a flag every second til it is true
function checkUntil(checkFunc, action, level = 1) {
	console.log(checkFunc());
	if (checkFunc == false && level < 5) {
		setTimeout(checkUntil(checkFunc, action, level++), 500);
		return;
	} else {
		console.log(action);
		action;
		console.log('level: '+level);
		return;
	}
}

//returns whether or not message is hovered, inverted
function checkMsgUnhovered() {
	return !(message.container.matches(':hover') || message.container.matches(':focus'));
}*/

//toggles the class "selected" on a dropdown container
function toggleSelected(divId) {
	//retrieves the dropdown container element
	const dropdown = document.getElementById(divId);
	dropdown.classList.toggle("selected");
}

//message management

function showMessage(msg, timeToShow = 10000) {
	message.content.innerHTML = msg;
	
	show(message.container, 'block');
	
	message.container.classList.add("selected");
	
	//set timeout to automatically hide message
	setTimeout(hideMessage, timeToShow);
}

function hideMessage() {
	//deselect message so it will collapse
	message.container.classList.remove("selected");
	
	//TODO: check for collapse instead of basing this on time
	//checkUntil(checkMsgUnhovered, hide(message.container));
	//console.log(message.border.matches(':hover'));
	setTimeout(hideMessage2, 3000);
}

//idea: make this use an event listener to the height?
function hideMessage2() {
	if (message.container.matches(":focus") || message.container.matches(":hover")) {
		console.log("abandoning hope of closing message automatically");
		return;
	}
	else { 
		console.log("message closed automatically");
		hide(message.container);
	}
}

//elmntId version of toggleVisibility
function showHide(elmntId) {
	toggleVisibility(document.getElementById(elmntId));
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
	elmnt.classList.remove("deselected");
	elmnt.style.display = d;
}

//for dropdowns
function forceClose(elmnt) {
	elmnt.classList.add("deselected");
	//saves the timeout
	setTimeout(function() { hide(elmnt) }, 2000);
}

function forceOpen(elmnt) {
	//console.log("forced open an element");
	elmnt.classList.remove("deselected");
	elmnt.classList.add("selected");
}

function releaseForce(elmnt) {
	elmnt.classList.remove("selected");
	elmnt.classList.remove("deselected");
}