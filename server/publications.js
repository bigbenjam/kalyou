Meteor.publish('newCalendars', function(limit) {
  return Calendars.find({private: false}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('bestCalendars', function(limit) {
  return Calendars.find({private: false}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('myCalendars', function(userId) {
  return Calendars.find({userId: userId}, {sort: {submitted: -1}});
});


Meteor.publish('singleCalendar', function(id) {
  return id && Calendars.find(id);
});


Meteor.publish('comments', function(calendarId) {
  return Comments.find({calendarId: calendarId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId});
});