/* SAVE/LOAD FUNCTIONALITY PLANNING/DOCUMENTATION
 
 * COOKIE FORMATTING
	* Standard cookie format: "cookie1=value; cookie2=value;"
		* Cookies can be parsed based on those semicolons (and trim()) and equals signs.
	* Save format: "save0=['unnamed save', <activeBay>, <bayList>]; save1=[...]" (hopefully?)
		* Cookie names are ALWAYS ('save'+index), that index being the index it will be in the list parseCookies returns.
 
 * BACKEND - SAVING
 
 * boolean setCookie(int saveSlot, String saveName = 'unnamed save')
	* Implements SAVING functionality. Checks validity of the stuff to be saved using checkCookieValidity()
	* Parameters:
		* saveSlot - Which "slot" (which cookie, there are a limited amount) to save these settings to.
		* saveName - A friendly name to call this save. Defaults to 'unnamed save'. Helps user know what saves are what, assuming they pass it in.
	* Global variables used:
		* activeBay - Gets saved.
		* bayList   - Gets saved.
	
	* Returns TRUE if cookie was set, FALSE & displays a message to the user if not.
 
 * boolean checkCookieValidity()
	* Ensures we have all information necessary to SAVE the cookie, and that there is room for the cookie. (bayList is not checked however, because every entry gets checked before storage :) )
	* Global variables used:
		* activeBay - Validity is checked.
	* Returns TRUE if cookie is valid, FALSE otherwise.
	
 * boolean checkSaveSlotAvailability(int saveSlot)
	* Checks if saveSlot is occupied - if it is, asks user if they want to override it. (lets them know that the old save will be gone forever.) (uses built-in function confirm(message))
	* Returns TRUE if save slot is *empty*, and FALSE if save slot is occupied.
	
	* Helper methods:
		* getCookie(int saveSlot) - Retrieves the contents of the saveSlot in question
 
 * BACKEND - LOADING (but really just cookie access in general)
 
 * Array getCookie(int saveSlot)
	* Finds the given cookie and returns its content in a usable format.
	* Returns null if cookie is not found.
	* Return format: [activeBay, bayList]
	* Helper methods: 
		* parseCookies() - Converts the cookies into a usable list (essential, since we're finding our save slot based on that list)

 * Array parseCookies()
	* Parses the cookies into a usable list.
	* Depends on the cookie name format (ex: save9) to determine indexes (for save9, the index would be 9) within the cookies list.
	* Loops through the cookies/saves and adds them to an array which is initialized indexes 0-9 as null from the start. A save being "null" is it being empty.
	* Return format: [save1, save2, save3, ..., save10], with each save being an array in format [saveName, saveActiveBay, saveBayList]
	
 * Bayfox parseBayfoxString(String bayStr)
	* Creates a Bayfox object using the string representation of a Bayfox object from the save data.
	* Basically a reverse of toString()
	
 * String getSaveName(int saveSlot)
	* Returns the saveName of the given save slot.
	* Helper methods: 
		* parseCookies() - This method returns parseCookies()[0], as that is the location of saveName.
	
 * HTML DOM - LOADING
 
 * loadCookie()
	* Prompts the user to be sure they want to load (if you haven't saved, you lose your progress) using built-in function confirm(message), then does the backend stuff for loading, then actually updates the visible situation using hideAll() and such, most likely.
 
*/

//saving
function setCookie(saveSlot, saveName = "unnamed save") {
	//TODO
	//* Save format: "save0=['unnamed save', <activeBay>, <bayList>]; save1=[...]" (hopefully?)
		//* Cookie names are ALWAYS ('save'+index), that index being the index it will be in the list parseCookies returns.
	if (checkCookieValidity()) {
		saveSlot = "save" + saveSlot;
		let saveInfo = saveSlot + "=[" + saveName + "," + activeBay + ", [";
		for (let b in bayList) {
			saveInfo += bayList[b].toString() + ",";//currently prints a comma on the last line too
		}
		saveInfo += "];";
		console.log(saveInfo);
		document.cookie = saveInfo + " path=/; SameSite=strict";
		
		return true;
	} else {
		//todo: add alert bit
		return false;
	}
}

function checkCookieValidity() {
	//TODO
	/* Ensures we have all information necessary to SAVE the cookie, and that there is room for the cookie. (bayList is not checked however, because every entry gets checked before storage :) )
	* Global variables used:
		* activeBay - Validity is checked.
	* Returns TRUE if cookie is valid, FALSE otherwise. */
	return true;
	
}

function checkSaveSlotAvailability(saveSlot) {
	//TODO
}

//loading
function getCookie(saveSlot) {
	//TODO
	//aquire the list of cookies from parseCookies()
	let rawCookieArray = parseCookies();
	//and now we look for the one we need. we know the index so we just have to make sure it's not undefined
	if (c >= rawCookieArray.size || rawCookieArray[c].isBlank()) {
		console.log("cookie not found");
		return (null);
	}
	//if that didnt return null we're good! so lets continue!
	let cookie = rawCookieArray[c];
}

function parseCookies() {
	//TODO
	
	/* COOKIE FORMATTING
	* Standard cookie format: "cookie1=value; cookie2=value;"
		* Cookies can be parsed based on those semicolons (and trim()) and equals signs.
	* Save format: "save0=['unnamed save', <activeBay>, [<bayList[0]>, <bayList[1]>,]]" (hopefully?)
		* Cookie names are ALWAYS ('save'+(index)), that index being the index it will be in the list parseCookies returns.
	*/
	//decodes cookies into userful bit
	let decodedCookies = decodeURIComponent(document.cookie);
	//console.log(decodedCookies);
	//split cookies on semicolons, they still need trimming
	let rawCookieArray = decodedCookies.split(';');
	//console.log(rawCookieArray);
	for (let i = 0; i < rawCookieArray.length; i++) {
		rawCookieArray[i] = rawCookieArray[i].trim();
	}
	return rawCookieArray;
	
	//to make this more useful we should really do more than just get the *raw* cookie array.
	//we should subdivide each cookie into its usable parts imo. like. the array of cookies, and those cookies are a list themselves ig.
	for (let c in rawCookieArray) {
		//right now this is a string in the save format discussed above
		//we want to turn it into a list of lists. save name, activeBay, and the baylist
		rawCookieArray[c] = 
	}
	
}

function parseBayfoxString(bayStr) {
	//TODO
	strArray = bayStr.split(' ');
	
	console.log(strArray);
	
}

function getSaveName() {
	//TODO
	//Is this supposed to be standalone or a helper for parseCookies?
}

function loadCookie() {
	//TODO
}