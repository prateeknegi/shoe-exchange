Shoes = new Mongo.Collection('shoes');

Meteor.methods({
	addShoeToDonation : function(shoeAttributes){
		check(Meteor.userId(). String);
		check(shoeAttributes, {
			size: String,
			type: String,
			barType: String,
			stilts: Boolean
		});

		var user = Meteor.user();
		console.log(user);
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
	}
});