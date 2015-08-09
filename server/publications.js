Meteor.publish('shoes', function(){
	return Shoes.find({state : {$ne: 'COMPLETED'}});
});

Meteor.publish('requests', function(shoeId){
	check(shoeId, String);
	return Requests.find({shoeId: shoeId});
});