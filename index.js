const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const passport = require("./middleware/passport");
const { ensureAuthenticated, forwardAuthenticated } = require("./middleware/checkAuth");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(ejsLayouts);

app.set("view engine", "ejs");
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Routes start here
app.use((req, res, next) => {
  // console.log(`User details are: `);
  // console.log(req.user);

  // console.log("Entire session object:");
  // console.log(req.session);

  // console.log(`Session details are: `);
  // let x=Object.keys(req.sessionStore.sessions)
  // console.log(x);
  // Object.keys()


  // console.log(req.sessionStore.sessions)
  next();
});


app.get("/reminders",ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", reminderController.create);

// Implement this yourself
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.

app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login",  authController.loginSubmit);
app.get("/logout", (req,res)=>{
  req.logout();
  res.redirect("/login")
})


app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
