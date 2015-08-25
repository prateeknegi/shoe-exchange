Shoes = new Mongo.Collection('shoes');

Shoes.allow({
	remove: function(userId, shoe) {
		return ownsDonation(userId, shoe);
	}
});

Meteor.methods({
	addShoeToDonation : function(shoeAttributes){
		check(Meteor.userId(). String);
		check(shoeAttributes, {
			size: String,
			type: String,
			barType: String,
			toeStilts: Boolean,
			pfs: Boolean
		});

		var user = Meteor.user();
		var username = (!!user.username) ? user.username : user.profile.name;
		var shoe = _.extend(shoeAttributes, {
			ownerId : user._id,
			owner : username,
			submitted : new Date(),
			state: 'POSTED',
			requestCount: 0
		});

		var shoeId = Shoes.insert(shoe);

		return {
			_id: shoeId
		}
	}, 

	closeDonation: function(shoeId){
		check(Meteor.userId(). String);
		var shoe = Shoes.findOne(shoeId);
		if(!shoe){
			throw new Meteor.Error('invalidRequest', 'No such shoe donation exits');
		}
		throwErrorIfNotOwnerOfDonation(shoe);
		Shoes.update(shoe._id, {$set: {state : 'CLOSED'}});			
	}
});


var throwErrorIfNotOwnerOfDonation = function(shoe){
	var currentUserId = Meteor.user()._id;
	if(! ownsDonation(currentUserId,shoe)){
		throw new Meteor.Error('invalidRequest', 'Current user cannot update this request');
	}
}; 

ownsDonation = function(userId, shoe){
	return shoe && shoe.ownerId === userId;
}