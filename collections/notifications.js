Notifications = new Meteor.Collection('notifications');

Notifications.allow({
  update: ownsDocument
});

createCommentNotification = function(comment) {
  var calendar = Calendars.findOne(comment.calendarId);
  if (comment.userId !== calendar.userId) {
    Notifications.insert({
      userId: calendar.userId,
      calendarId: calendar._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};