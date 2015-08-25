var shoeItemHelper = {
	ownDonation: function(){
		return this.ownerId === Meteor.userId();
	}, 
	isAlreadyRequestedByUser: function(){
		if(!!Meteor.user()) {
			var request = Requests.findOne({shoeId: this._id});
			return (!!request && !!request.shoeId);
		}
		return false;
	}
};

Template.shoeItem.events({
	'click .delete' :  function(e){
		e.preventDefault();

		if(confirm("Are you sure you want to delete donation?")){
			var currentShoeId = this._id;
			Shoes.remove(currentShoeId);
			Router.go('shoeList');
		}
	}
});

Template.shoeItem.helpers(shoeItemHelper);
Template.requestShoeItem.helpers(shoeItemHelper);

