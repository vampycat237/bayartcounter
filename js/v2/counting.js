//fun fact i almost named this object moneymachine

/* FOR DEVELOPERS:
 * This is the brain behind your whole tool, and probably the most important script here.
 * Make sure that if your categories and such are different, you loop through them appropriately, or they will
 * be skipped when counting.
 * 
 * Your #1 priority is to have ACCURATE TOTALS.
 * Your #2 priority is to have ACCURATE PROOF of your counting.
 * Your #3 priority is to be able to actually count everything available for scoring in your art redeeming system.
 * 
 * Try to avoid comprimising #1 and #2 in releases.
 */

const counting = {
	proof : document.getElementById('counting-proof'),
	total : document.getElementById('counting-total'),
	
	stringArray : [],
	
	totals() {
		//reset total & user's stringArray
		userTotal = 0;
		this.stringArray = [];
		
		//count base values
		for (i = 0; i < baseValues.length; i++) {
			var tmp = baseValues[i].value
			userTotal += tmp;
			//TODO: combine duplicate values before counting
			this.stringArray.push(baseValues[i].countingString());
		}
		//TODO: count stackable & static bonuses
		//count background
		if (background.value > 0) {
			userTotal += background.value;
			this.stringArray.push(background.countingString());
		}

		this.update();
	},
	
	assembleProof() {
		return this.stringArray.join(" + ") + " = " + userTotal;
	},
	
	update() {
		this.total.innerHTML = "total: "+userTotal;
		this.proof.innerHTML = "counting: "+this.assembleProof();
	}
}