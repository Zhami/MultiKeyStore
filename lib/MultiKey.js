

//==============================
// MultiKey
//==============================

function MultiKey (keyNames) {
	//MUST NOT be destructive of the passed in keyNames array!!
	var numKeyNames = keyNames.length;
	var i;
	var subKeyNames = [];

	this.keyName = keyNames[0];

	for (i = 1; i < numKeyNames; i += 1) {
		subKeyNames[i - 1] = keyNames[i];
	}

	this.subKeyNames = subKeyNames;
	this.height = subKeyNames.length;
	this.terminus = (this.height) ? false : true;

	this.entities = {};

//console.log('MultiKey:', '('+this.keyName+')', 'constructor:', this);
}

MultiKey.prototype.addItem = function (item) {
	var keyValue;
	var entity;

//console.log('MultiKey:',  '('+this.keyName+')'  ,'addItem:', item);

	keyValue = item[this.keyName];
	entity = this.entities[keyValue];

//console.log('\t',  '('+this.keyName+')'  ,'keyValue:', keyValue);

	if (this.terminus) {
		if (!entity) {
			entity = item;
		} else {
			entity = [entity, item];
		}
		this.entities[keyValue] = entity;
	} else {
		if (!entity) {
//console.log('\t',  '('+this.keyName+')'  ,'creating new MultiKey:', this.subKeyNames);
			entity = this.entities[keyValue] = new MultiKey(this.subKeyNames);
		}
		entity.addItem(item);
	}

//console.log('\t', '('+this.keyName+')', 'end of additem...');
//console.log('\t\t', 'subKeyNames:', this.subKeyNames, 'entities:\n', this.entities, '\n');
};


MultiKey.prototype.getItemForKeyValues = function (keyValues) {
	//MUST NOT be destructive of the passed in keyValues array!!

	var entity;
	var keyValue = keyValues[this.keyName];

//console.log('MultiKey:getItemForKeyValues:', keyValues, 'keyValue:', keyValue);
//console.log('\t', 'keys of entities:', Object.keys(this.entities));

	entity = this.entities[keyValue];
//console.log('\t', 'entity:', entity);

	if (!entity) {
		return void 0;
	} else if (this.terminus) {
		return entity || void 0;
	} else {
		// entity is another MultiKey instance
		return entity.getItemForKeyValues(keyValues);
	}
};

MultiKey.prototype.getWalker = function () {
	return new MultiKeyWalker(this);
};

//==============================
// MultiKeyWalker
//==============================

function MultiKeyWalker (multiKey) {
	this.multiKey = multiKey;
	this.keyName = multiKey.keyName;
	this.entities = multiKey.entities;
	this.subWalker = void 0;

	this.reset();
}

MultiKeyWalker.prototype.getNextItem = function () {
	var entity = null;

	if (this.subWalker) {
		entity = this.subWalker.getNextItem();
		if (entity) {
			return entity;
		} else {
			// subWalker has reached its end, so free it, and continue walking this set of entities
			this.subWalker = void 0;
		}
	}

	if (this.index < this.numEntities) {
		entityKey = this.entitiesKeys[this.index];
		entity = this.entities[entityKey];
		this.index += 1;
	}

	if (entity instanceof MultiKey) {
		// recursively walk this entity
		this.subWalker = new MultiKeyWalker(entity);
		// start again, now that we have a subWalker
		return this.getNextItem();
	}

	return entity;
};

MultiKeyWalker.prototype.reset = function () {
	this.index = 0;
	this.entitiesKeys = Object.keys(this.entities);
	this.numEntities = this.entitiesKeys.length;
};

//==============================
// exports
//==============================

exports = module.exports = MultiKey;
