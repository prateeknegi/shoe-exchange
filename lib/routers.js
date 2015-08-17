Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  // waitOn: function() {
  // 	return [ Meteor.subscribe('shoes') ];
  // }
});

Router.route('/', {
	name: 'shoeList',
	waitOn: function() {
		if(!!Meteor.user()){
			return [ 
				Meteor.subscribe('shoes'), 
				Meteor.subscribe('requestsByUser', Meteor.user()._id)
			];
		} 
	}
});

Router.route('/donate', {
	name: 'donateShoe'
});

Router.route('/manageDonation/:_id', {
	name: 'manageShoe',
	data: function() {
		return Shoes.findOne(this.params._id);
	},
	waitOn: function() {
		return [ 
			Meteor.subscribe('shoeByUserId', this.params._id, Meteor.user()._id), 
			Meteor.subscribe('requestsByShoe', this.params._id)
		];
  	}
});

Router.route('/submitRequest/:_id', {
	name: 'shoeRequest',
	data: function() {
		return Shoes.findOne(this.params._id);
	}, 
	waitOn: function() {
		return [ 
			Meteor.subscribe('shoe', this.params._id), 
			Meteor.subscribe('userRequest', this.params._id, Meteor.user()._id)
		];
  	}
});

var requireLoginForDonation = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('loginRequiredForDonation');
		}
	} else {
		this.next();
	}
};

var requireLoginForRequest = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('loginRequiredForRequest');
		}
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireLoginForDonation, {
	only: 'donateShoe'
});
Router.onBeforeAction(requireLoginForDonation, {
	only: 'manageShoe'
});
Router.onBeforeAction(
	function(){
		var shoe = this.data();
		if(!!shoe) {
			this.next();
		} else {
			this.render('notAllowed');
		}
	}, 
	{ only: 'manageShoe'}
);
Router.onBeforeAction(requireLoginForRequest, {
	only: 'shoeRequest'
});