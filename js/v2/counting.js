//fun fact i almost named this object moneymachine
const counting = {
	proof : document.getElementById('counting-proof'),
	total : document.getElementById('counting-total'),
	
	totals() {
		//reset total
		userTotal = 0;
		
		//count base values
		for (i = 0; i < baseValues.length; i++) {
			userTotal += baseValues[i].value;
		}
		//TODO: count stackables
		//TODO: count static
		
		this.update();
	},
	
	update() {
		this.total.innerHTML = "total: "+userTotal;
	}
}