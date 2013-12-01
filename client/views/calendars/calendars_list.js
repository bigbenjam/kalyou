Template.newCalendars.helpers({
  options: function() {
    return {
      sort: {submitted: -1},
      handle: newCalendarsHandle
    }
  }
});

Template.bestCalendars.helpers({
  options: function() {
    return {
      sort: {votes: -1, submitted: -1},
      handle: bestCalendarsHandle
    }
  }
});

Template.calendarsList.helpers({
  calendarsWithRank: function() {
    var i = 0, options = {sort: this.sort, limit: this.handle.limit()};
    return Calendars.find({}, options).map(function(calendar) {
      calendar._rank = i;
      i += 1;
      return calendar;
    });
  },

  calendarsReady: function() {
    return this.handle.ready();
  },
  allCalendarsLoaded: function() {
    return this.handle.ready() &&  
      Calendars.find().count() < this.handle.loaded();
  }
});

Template.calendarsList.events({
  'click .load-more': function(e) {
    e.preventDefault();
    this.handle.loadNextPage();
  }
});
