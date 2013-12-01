Meteor.publish('newCalendars', function(limit) {
  return Calendars.find({}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('bestPosts', function(limit) {
  return Calendars.find({}, {sort: {votes: -1, submitted: -1}, limit: limit});
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