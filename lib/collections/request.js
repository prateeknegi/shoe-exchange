Requests = new Mongo.Collection('requests');

Meteor.methods({
	shoeRequestInsert: function(shoeRequestAttributes){
		check(Meteor.userId(), String);
		check(shoeRequestAttributes, {
			shoeId: String, 
			addressLine1: String,
			addressLine2: String, 
			city: String,
			postalState: String, 
			country: String,
			zipcode: String, 
			message: String
		});

		var user = Meteor.user();
		var shoeRequest = _.extend(shoeRequestAttributes, {
			requesterId: user._id, 
			requestedBy: user.username, 
			submited: new Date(),
			state: 'REQUESTED',
		});

		var shoeRequestId = Requests.insert(shoeRequest);	
		return {
			_id : shoeRequestId
		}
	}
});

/*
requesterId: user2_id,
		requestedBy: user2.profile.name,
		addressLine1: '5753 Running Fox Ln',
		addressLine2: '',
		city: 'Mason',
		state: 'Ohio',
		country: 'USA',
		zipcode: '45040',
		message: 'I would really appreciate if you consider me as the benefactor of your donation',
		submitted: new Date(now - 6 * 3600 * 1000),
		state: 'REQUESTED'
		*/
