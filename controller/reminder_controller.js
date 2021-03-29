let database = require("../database").Database;

let remindersController = {
  list: (req, res) => {
    let name =req.user.name 
    res.render("reminder/index", { reminders: database[name].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let name =req.user.name; 
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
    let name =req.user.name 
    let reminder = {
      id: database[name].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      date: req.body.date
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
    let name = req.user.name;
    let reminderToFind = req.params.id;
    let searchResult = database[name].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    let num = database[name].reminders.indexOf(searchResult)
    searchResult.title = req.body.title
    searchResult.description = req.body.description
    searchResult.date = req.body.date

    if (req.body.completed == "true") {
      searchResult.completed = true
    } else if (req.body.completed == "false") {
      searchResult.completed = false
    };

    database[name].reminders[num]=searchResult
    

    res.redirect("/reminder/" + reminderToFind)
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let name = req.user.name;
    let searchResult = database[name].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
      });

      if(searchResult !== -1){
        let result = database[name].reminders.filter(elem => elem !== searchResult)
        database[name].reminders=result
      }
    res.redirect("/reminders");
  },
};



module.exports = remindersController

