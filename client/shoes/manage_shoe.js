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
	}
});

Template.manageShoe.events({
	'click .delete' :  function(e){
		e.preventDefault();

		if(confirm("Are you sure you want to delete donation?")){
			var currentShoeId = this._id;
			Shoes.remove(currentShoeId);
			Router.go('shoeList');
		}
	}
});