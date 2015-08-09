Template.shoeItem.helpers({
	submittedText : function(){
		return this.submitted.toString();
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
	}
});

// Template.shoeItem.events({
// 	'click .request': function(e){
// 		e.preventDefault();

// 		var currentShoeId = this;

// 		Router.go('shoeRequest', this);
// 	}
// });
