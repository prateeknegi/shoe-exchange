Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});
Router.route('/', {
	name: 'shoeList',
	waitOn: function() {
		return [Meteor.subscribe('shoes')];
	}
});
Router.route('/donate', {
	name: 'donateShoe'
});

Router.route('/submitRequest/:_id', {
	name: 'shoeRequest',
	data: function() {
		console.log('ID--' + this.params._id);
		var shoe = Shoes.findOne(this.params._id);
		console.log(shoe);
		return shoe;
	}
});

var requireLogin = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('loginRequired');
		}
	} else {
		this.next();
	}
}

Router.onBeforeAction(requireLogin, {
	only: 'donateShoe'
});
Router.onBeforeAction(requireLogin, {
	only: 'shoeRequest'
});