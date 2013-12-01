Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes) {
    var user = Meteor.user();
    var calendar = Calendars.findOne(commentAttributes.calendarId);
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to make comments");
      
    if (!commentAttributes.body)
      throw new Meteor.Error(422, 'Please write some content');
      
    if (!commentAttributes.calendarId)
      throw new Meteor.Error(422, 'You must comment on a calendar');
    
    comment = _.extend(_.pick(commentAttributes, 'calendarId', 'body'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });
    
    // update the post with the number of comments
    Calendars.update(comment.calendarId, {$inc: {commentsCount: 1}});
    
    // create the comment, save the id
    comment._id = Comments.insert(comment);
    
    // now create a notification, informing the user that there's been a comment
    createCommentNotification(comment);
    
    return comment._id;
  }
});