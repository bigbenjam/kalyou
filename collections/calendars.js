Calendars = new Meteor.Collection('calendars');

Calendars.allow({
  update: ownsDocument,
  remove: ownsDocument
});

Calendars.deny({
  update: function(userId, calendar, fieldNames) {
    // may only edit the following fields:
    return (_.without(fieldNames, 'title', 'description', 'bgurl', 'private').length > 0);
  }
});

Meteor.methods({
  calendar: function(calendarAttributes) {
    var user = Meteor.user(),
        calendarWithSameTitle = Calendars.findOne({title: calendarAttributes.title});
    
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to create a new calendar");
    
    // ensure the calendar has a title
    if (!calendarAttributes.title)
      throw new Meteor.Error(422, 'Please fill in a title');
    
    // ensure the calendar has a background img url
    if (!calendarAttributes.bgurl)
      throw new Meteor.Error(422, 'Please fill in a background img url');
    
    // check that there are no previous calendars with the same title
    if (calendarAttributes.title && calendarWithSameTitle) {
      throw new Meteor.Error(422, 'Another calendar already uses this title');
    }
    
    // pick out the whitelisted keys
    var calendar = _.extend(_.pick(calendarAttributes, 'title', 'description', 'bgurl', 'private'), {
      userId: user._id, 
      author: user.username, 
      submitted: new Date().getTime(),
      commentsCount: 0,
      upvoters: [], votes: 0
    });
    
    var calendarId = Calendars.insert(calendar);
    
    return calendarId;
  },
  
  upvote: function(calendarId) {
    var user = Meteor.user();
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to upvote");
    
    Calendars.update({
      _id: calendarId, 
      upvoters: {$ne: user._id}
    }, {
      $addToSet: {upvoters: user._id},
      $inc: {votes: 1}
    });
  }
});