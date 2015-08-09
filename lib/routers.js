Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  waitOn: function() {
	return [Meteor.subscribe('shoes')];
  }
});
Router.route('/', {
	name: 'shoeList',
});
Router.route('/donate', {
	name: 'donateShoe'
});

Router.route('/submitRequest/:_id', {
	name: 'shoeRequest',
	data: function() {
		return Shoes.findOne(this.params._id);
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