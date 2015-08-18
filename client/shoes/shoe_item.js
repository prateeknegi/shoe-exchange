var shoeItemHelper = {
	stiltsIcon: function(){
		if(this.stilts){
			return 'glyphicon glyphicon-ok text-success';
		} else {
			return 'glyphicon glyphicon-remove text-error';
		}
	},
	barTypeText: function(){
		if(this.barType === 'None'){
			return 'No';
		}
		return this.barType;
	},
	ownDonation: function(){
		return this.ownerId === Meteor.userId();
	}, 
	stateClass: function(){
		if(this.state === 'POSTED'){
			return 'panel-green';
		}
		if(this.state === 'PENDING'){
			return 'panel-blue';
		}
		
		return 'panel-grey';
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

