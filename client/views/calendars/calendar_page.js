Template.postCalendar.helpers({
  currentCalendar: function() {
    return Calendars.findOne(Session.get('currentCalendarId'));
  },
  comments: function() {
    return Comments.find({calendarId: this._id});
  }
});