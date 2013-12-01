// Fixture data 
if (Calendars.find().count() === 0) {
  var now = new Date().getTime();
  
  // create a user
  var simonId = Meteor.users.insert({
    profile: { name: 'ShuiMing' }
  });
  var simon = Meteor.users.findOne(simonId);
  
  var calId = Calendars.insert({
    title: 'Merry Xmas 2013',
    userId: simon._id,
    author: simon.profile.name,
    description: 'Wishing y\'all a merry 2013 xmas!',
    bgurl: 'http://www.freechristmaswallpapers.net/images/wallpapers/600x470-Merry-Xmas-969396.jpg',
    submitted: now - 7 * 3600 * 1000,
    commentsCount: 2,
    upvoters: [], votes: 0
  });
  
  Comments.insert({
    calendarId: calId,
    userId: simon._id,
    author: simon.profile.name,
    submitted: now - 5 * 3600 * 1000,
    body: 'Really like this one!'
  });
  
  Comments.insert({
    calendarId: calId,
    userId: sacha._id,
    author: sacha.profile.name,
    submitted: now - 3 * 3600 * 1000,
    body: 'For sure :)'
  });
  
  Calendars.insert({
    title: 'The Coke Xmas Truck',
    userId: simon._id,
    author: simon.profile.name,
    description: 'Have a cold one!',
    bgurl: 'http://img.mi9.com/holiday/5025/merry-xmas-and-happy-new-year-christmas-coca-cola_1920x1200_94336.jpg',
    submitted: now - 10 * 3600 * 1000,
    commentsCount: 0,
    upvoters: [], votes: 0
  });
  
  Calendars.insert({
    title: 'Presents & Gifts',
    userId: simon._id,
    author: simon.profile.name,
    description: 'Have a great unwrap this year!',
    bgurl: 'http://www.hdwallpapersview.com/wp-content/uploads/2013/10/31/uyut.jpeg',
    submitted: now - 12 * 3600 * 1000,
    commentsCount: 0,
    upvoters: [], votes: 0
  });
}