//SIDEBAR MANAGER
const sidebar = {
	sections : {
		BV : document.getElementById('sidebar-base-values'),
		lines : document.getElementById('sidebar-lines')
	},
	holders : {
		BV : document.getElementById('base-values-holder')
	},
	ex: {
		focus : document.getElementById('sidebarex-focus')
	}
}

//TODO: update all sidebar section, holder, titlebutton, etc. elements that have update functions
function updateSidebar() {
	updateBVHolder();
}

//TODO: update baseVal holder
/*  BASE-VALUE-ITEM TEMPLATE (i is index, 'blank' would be where toString goes)
	<div class="row button base-value-item" onclick="openBaseValEditor('edit', i)">
		<span id="base-value-item-i">edit blank</span>
		<button class="small red" onclick="removeBaseVal(0)">x</button>
	</div>
*/
function updateBVHolder() {
	const bvContents = [];
	for (i = 0; i < baseValues.length; i++) {
	//this is the template to be filled out with the proper info basically.
		bvContents[i] = [
			'<div class="row button section-item" onclick="openBaseValEditor(\'edit\', '+i+')">',
			'<span id="base-value-item-'+i+'">edit '+baseValues[i].toString()+'</span>',
			'<button class="small red" onclick="removeBaseVal(0)">x</button>',
			'</div>'
		].join(" ");
	}
	
	if (bvContents.length > 0) {
		sidebar.holders.BV.innerHTML = bvContents.join(" ");
	} else {
		sidebar.holders.BV.innerHTML = "";
	}
}

function updateSectionHolder(section, list, func) {
	const sectionContents = [];
	for (i = 0; i < list.length; i++) {
	//this is the template to be filled out with the proper info basically.
		sectionContents[i] = [
			'<div class="row button section-item" onclick="openBaseValEditor(\'edit\', '+i+')">',
			'<span id="base-value-item-'+i+'">edit '+baseValues[i].toString()+'</span>',
			'<button class="small red" onclick="removeBaseVal(0)">x</button>',
			'</div>'
		].join(" ");
	}
	
	if (bvContents.length > 0) {
		section.innerHTML = bvContents.join(" ");
	} else {
		section.innerHTML = "";
	}
}

//TODO
//Updates button title for a section depending on if its draggable window it spawns is shown or not.
//section = the sidebar subsection in question
//window  = the pop-out window this section spawns
function updateButtonTitle(section, window) {
	return;
}