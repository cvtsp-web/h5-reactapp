export default function classNames() {
	var classes = [];
	for(var i = 0,arg; arg = arguments[i++];) {
		if(!arg) continue;
		if(typeof arg === 'string' || typeof arg === 'number') {
			classes.push();
		}else if(Array.isArray(arg)) {
			classes.push(classNames.apply(null, arg));
		}else if(typeof arg === 'object') {
			for(var key in arg) {
				if(arg.hasOwnProperty(key) && arg[key]) {
					classes.push(key);
				}
			}
		}
	}
	return classes.join(' ');
}
