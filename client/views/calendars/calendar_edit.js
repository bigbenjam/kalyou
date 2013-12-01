Template.calendarEdit.helpers({
  calendar: function() {
    return Calendars.findOne(Session.get('currentCalendarId'));
  }
});

Template.calendarEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentCalendarId = Session.get('currentCalendarId');
    
    var calendarProperties = {
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val(),
      bgurl: $(e.target).find('[name=bgurl]').val()
    }
    
    Calendars.update(currentCalendarId, {$set: calendarProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Meteor.Router.to('calendarPage', currentCalendarId);
      }
    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this calendar?")) {
      var currentCalendarId = Session.get('currentCalendarId');
      Calendars.remove(currentCalendarId);
      Meteor.Router.to('calendarList');
    }
  }
});
