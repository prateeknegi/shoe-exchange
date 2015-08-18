Template.manageShoe.helpers({
	requests : function(){
		return Requests.find({}, {sort: {submitted: -1}});
	},
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
	stateClass: function(){
		if(this.state === 'POSTED'){
			return 'panel-green';
		}
		if(this.state === 'PENDING'){
			return 'panel-blue';
		}
		
		return 'panel-grey';
	}, 
	isPending: function(){
		return this.state == 'PENDING';
	}, 
	isClosed: function(){
		return this.state == 'CLOSED';
	}
});

Template.manageShoe.events({
	'click .deleteDonation' :  function(e){
		e.preventDefault();

		if(confirm("Are you sure you want to delete donation?")){
			var currentShoeId = this._id;
			Shoes.remove(currentShoeId);
			Router.go('shoeList');
		}
	},
	'click .closeDonation' :  function(e){
		e.preventDefault();

		if(confirm("Are you sure you want to close donation? Have you mailed the shoes to the address provided below ?")){
			var currentShoeId = this._id;
			Meteor.call('closeDonation', currentShoeId, function(error, result){
				if(error){
					return Errors.throw(error.reason);
				}
				Router.go('shoeList');
			});
		}
	}
});
