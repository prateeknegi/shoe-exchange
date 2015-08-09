Template.donateShoe.events({
	'submit form': function(e){
		e.preventDefault();
		var shoeDonation = {
			type: $(e.target).find('[name=type]').val(), 
			size: $(e.target).find('[name=size]').val(), 
			barType: $(e.target).find('[name=barType]').val(), 
			stilts: $(e.target).find('[name=stilts]').prop('checked')
		}

		Meteor.call('addShoeToDonation', shoeDonation , function(error, results){
			if(error){
				return Errors.throw(error.reason);
			}

			Router.go('shoeList');
		});
		console.log(shoeDonation);
	}
});