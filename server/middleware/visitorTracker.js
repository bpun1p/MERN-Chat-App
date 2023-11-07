const Visitor = require('../models/visitorModel');

const visitorTracker = async (email, next) => {
  //get the today dates
  const today = new Date();
  const todayFullDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();
  const todayYear = today.getFullYear();

  const firstVisitorEntryOfDay = {
    fullDate: todayFullDate,
    month: todayMonth,
    day: todayDate,
    year: todayYear,
    visitorCount: 1,
    users: [email]
  };
  //check if the current date is found in the db
  const visitorEntry = await Visitor.findOne({ fullDate: todayFullDate });
  //if found; grab the count amount and +1
  if (visitorEntry) {
    const updatedUsers = visitorEntry.users.includes(email) ? visitorEntry.users : [...visitorEntry.users, email];
    await Visitor.updateOne({
      fullDate: todayFullDate,
      month: todayMonth,
      day: todayDate,
      year: todayYear,
      $set: {
        visitorCount: visitorEntry.visitorCount + 1,
        users: updatedUsers
      }
    });
  //if not found: create a new doc
  } else if (!visitorEntry) {
    await Visitor.create(firstVisitorEntryOfDay);
  }
};

module.exports = visitorTracker;