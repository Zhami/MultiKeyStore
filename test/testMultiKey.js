var MultiKeyStore = require('..');

var i;
var item;
var keyNames;
var keyValues;
var result;
var store;
var walker;

console.log('====== create store =======');

keyNames = ['city', 'name'];
store = new MultiKeyStore(keyNames);

console.log('====== add items =======');

item = {
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

walker = store.getWalker();
i = 0;
while (item = walker.getNextItem()) {
	console.log(i, item);
	i += 1;
	if (i > 5) {
		process.exit();		
	}
}

console.log('\n====== getItemForKeyValues =======');

keyValues = {city: 'sf', name: 'sue'};
item = store.getItemForKeyValues(keyValues);
console.log(keyValues, '==>', item);

keyValues = {city: 'nyc', name: 'sam'};
item = store.getItemForKeyValues(keyValues);
console.log(keyValues, '==>', item);

keyValues = {city: 'sf', name: 'sam'};
item = store.getItemForKeyValues(keyValues);
console.log(keyValues, '==>', item);

console.log('\n====== removeItemWithKeyValues =======');

keyValues = {city: 'sf', name: 'sam'};
result = store.removeItemWithKeyValues(keyValues);
console.log('delete', keyValues, '==>', result);

keyValues = {city: 'sf', name: 'sue'};
result = store.removeItemWithKeyValues(keyValues);
console.log('delete', keyValues, '==>', result);

keyValues = {city: 'sf', name: 'sue'};
item = store.getItemForKeyValues(keyValues);
console.log('get', keyValues, '==>', item);

keyValues = {city: 'nyc', name: 'sam'};
result = store.removeItemWithKeyValues(keyValues);
console.log('delete', keyValues, '==>', result);

keyValues = {city: 'nyc', name: 'bob'};
result = store.removeItemWithKeyValues(keyValues);
console.log('delete', keyValues, '==>', result);

console.log('\n====== walk =======');

walker.reset();
i = 0;
while (item = walker.getNextItem()) {
	console.log(i, item);
	i += 1;
	if (i > 5) {
		process.exit();		
	}
}
