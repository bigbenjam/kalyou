Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var calendar = {
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val(),
      bgurl: $(e.target).find('[name=bgurl]').val()
    }
    
    Meteor.call('calendar', calendar, function(error, id) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
        
        // if the error is that the post already exists, take us there
        if (error.error === 302)
          Meteor.Router.to('calendarPage', error.details)
      } else {
        Meteor.Router.to('calendarPage', id);
      }
    });
  }
});