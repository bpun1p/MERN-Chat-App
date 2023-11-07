const Visitor = require('../models/visitorModel');

const visitorTracker = async (email, next) => {
  //get the current date mm/dd/yy
  const today = new Date();
  const todayDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getYear()}`

  const firstVisitorEntryOfDay = {
    date: todayDate,
    visitorCount: 1,
    users: [email]
  }
  //check if the current date is found in the db
  const visitorEntry = await Visitor.findOne({ date: todayDate });
  //if found; grab the count amount and +1
  if (visitorEntry) {
    const updatedUsers = visitorEntry.users.includes(email) ? visitorEntry.users : [...visitorEntry.users, email];

    await Visitor.updateOne({
      date: todayDate,
      $set: { 
        visitorCount: visitorEntry.visitorCount + 1,
        users: updatedUsers 
      }
    })
  //if not found: create a new doc
  } else if (!visitorEntry) {
    await Visitor.create(firstVisitorEntryOfDay)
  }
  next();
};

module.exports = visitorTracker;