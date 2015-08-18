Template.registerHelper('formatDate', function(date) {
  return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
});