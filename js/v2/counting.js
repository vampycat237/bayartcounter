//fun fact i almost named this object moneymachine
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
			this.stringArray.push(baseValues[i].toString());
		}
		//TODO: count stackable & static bonuses
		
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