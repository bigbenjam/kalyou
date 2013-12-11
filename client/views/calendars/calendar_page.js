Template.calendarPage.helpers({
  currentCalendar: function() {
    return Calendars.findOne(Session.get('currentCalendarId'));
  },
  comments: function() {
    return Comments.find({calendarId: this._id});
  }
});

Template.calendarPage.rendered = function () {
        $.pirobox_ext({
          attribute: 'data-pirobox',
          piro_speed : 700,
          bg_alpha : 0.5,
          piro_scroll : true //pirobox always positioned at the center of the page
        });
      }