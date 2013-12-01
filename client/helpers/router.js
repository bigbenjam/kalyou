Meteor.Router.add({
  '/': {to: 'newCalendars', as: 'home'},
  '/best': 'bestCalendars',
  '/new': 'newCalendars',
  
  '/calendars/:_id': {
    to: 'calendarPage', 
    and: function(id) { Session.set('currentCalendarId', id); }
  },
  
  '/calendars/:_id/edit': {
    to: 'calendarEdit', 
    and: function(id) { Session.set('currentCalendarId', id); }    
  },
  
  '/create': 'calendarCreate'
});

Meteor.Router.filters({
  'requireLogin': function(page) {
    if (Meteor.user())
      return page;
    else if (Meteor.loggingIn())
      return 'loading';
    else
      return 'accessDenied';
  },
  'clearErrors': function(page) {
    clearErrors();
    return page;
  }
});

Meteor.Router.filter('requireLogin', {only: 'calendarCreate'});
Meteor.Router.filter('clearErrors');
