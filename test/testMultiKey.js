var MultiKeyStore = require('../lib/MultiKeyStore.js');

keyNames = ['city', 'name'];

var store = new MultiKeyStore(keyNames);

console.log('\n====== add items =======');

var item = {
	name: 'bob'
	, city: 'nyc'
	, data: 'this is bob in nyc'
};
store.addItem(item);

item = {
	name: 'sam'
	, city: 'nyc'
	, data: 'this is sam in nyc'
};
store.addItem(item);


item = {
	name: 'sally'
	, city: 'sf'
	, data: 'this is sally in nyc'
};
store.addItem(item);
store.addItem(item);

item = {
	name: 'sue'
	, city: 'sf'
	, data: 'this is sue in sf'
};
store.addItem(item);


console.log('\n====== walk =======');

var walker = store.getWalker();
var i = 0;
while (item = walker.getNextItem()) {
	console.log(i, item);
	i += 1;
	if (i > 5) {
		process.exit();		
	}
}

console.log('\n====== getItemForKeyValues =======');

var keyValues;
keyValues = {city: 'sf', name: 'sue'};
item = store.getItemForKeyValues(keyValues);
console.log(keyValues, '==>', item);

keyValues = {city: 'nyc', name: 'sam'};
item = store.getItemForKeyValues(keyValues);
console.log(keyValues, '==>', item);

keyValues = {city: 'sf', name: 'sam'};
item = store.getItemForKeyValues(keyValues);
console.log(keyValues, '==>', item);
