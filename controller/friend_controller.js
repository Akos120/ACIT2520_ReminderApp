let database = require("../database").Database;
let account = require("../database").Account;

let checkfriend=(searched,current)=>{
    let result = current.friends.find(function (user) {
        return user.id == searched.id;
        });
    return result
}


let friendcontroller={
    Show:(req,res)=>{
        // send the current user id
        let user_id = req.user.id;
        // show the current user friend list
        let currentuser = account.find(function (user) {
            return user.id == user_id;
            });
        res.render("Social/friend", {account:currentuser.friends,
                                     error:0})

    },

    add:(req,res)=>{
        // send the email to the client
        let email = req.body.useremail
        // send the current user id
        let user_id = req.user.id;
        // find the current user friend list
        let currentuser = account.find(function (user) {
            return user.id == user_id;
            });
        // check the email exist in the account database or not
        let searchuser = account.find(function (user) {
            return user.email == email;
            });

        //Show the error if add account repeat or same with current user
        //If no error add friend to current friends list and add current user the added user friends list
        if(searchuser == undefined){
            res.render("Social/friend", {account:currentuser.friends,
                                         error:1});
        }else if(searchuser.id == currentuser.id){
            res.render("Social/friend", {account:currentuser.friends,
                                         error:2});
        }else if(checkfriend(searchuser,currentuser) != undefined){
            res.render("Social/friend", {account:currentuser.friends,
                                         error:3});
        }else{
            currentuser.friends.push({id:searchuser.id,name:searchuser.name,email:searchuser.email})
            searchuser.friends.push({id: currentuser.id,name: currentuser.name,email: currentuser.email})
            res.render("Social/friend", {account:currentuser.friends,
                                         error:0})
        }
        console.log('account[0].friends', account[0].friends)
    },

    View:(req,res)=>{
        // get the friend name from url
        let name = req.params.name 

        // adding their reminders to your list
        let user = req.user.name
        
        // send the friend reminders and name to the ejs
        res.render("Social/friend_reminders", { reminders: database[name].reminders,
                                                friendname:name });
    },

    friendRemind: (req, res) => {
        let reminderToFind = req.params.id;
        let name =req.params.name; 
        let searchResult = database[name].reminders.find(function (reminder) {
          return reminder.id == reminderToFind;
        });
        if (searchResult != undefined) {
          res.render("Social/single_friend_reminder", { reminderItem: searchResult });
        } else {
          res.render("Social/friend_reminders", { reminders: database[name].reminders });
        }
      },

    addReminder: (req, res) => {
        let user = req.user.name
        let reminderId = req.body.reminderId
        let reminderName = req.body.reminderName
        let user_id = req.user.id;

        // find the current user friend list
        let currentuser = account.find(function (user) {
            return user.id == user_id;
            });

        let search = database[reminderName].reminders.find(function (reminder) {
        return reminder.id == reminderId;
        });
        database[user].friendReminders.push(search)
        
        res.render("reminder/index", { reminders: database[user].reminders, friendsReminders: database[user].friendReminders, friends: currentuser.friends });
        }
};


module.exports = friendcontroller