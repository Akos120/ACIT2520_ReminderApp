let database = require("../database").Database;

let remindersController = {
  list: (req, res) => {
    let name =req.user.name //Benny 
    res.render("reminder/index", { reminders: database[name].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let name =req.user.name; //Benny 
    let searchResult = database[name].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[name].reminders });
    }
  },

  create: (req, res) => {
    let name =req.user.name //Benny 
    let reminder = {
      id: database[name].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[name].reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let name =req.user.name //Benny 
    let searchResult = database[name].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
  },

  delete: (req, res) => {
    // Implement this code
  },
};

module.exports = remindersController;
