newCalendarsHandle = Meteor.subscribeWithPagination('newCalendars', 10);
bestCalendarsHandle = Meteor.subscribeWithPagination('bestCalendars', 10);

Deps.autorun(function() {
  Meteor.subscribe('singleCalendar', Session.get('currentCalendarId'));
  
  Meteor.subscribe('comments', Session.get('currentCalendarId'));
})

Meteor.subscribe('notifications');
