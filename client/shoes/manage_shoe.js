Template.manageShoe.helpers({
	requests : function(){
		return Requests.find({}, {sort: {submitted: -1}});
	},
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
	}
});