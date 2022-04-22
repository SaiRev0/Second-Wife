if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const ExpressError = require("./utils/ExpressError");
const foods = require("./models/foodItem");
const passport = require("passport");
const User = require("./models/user");
const { isLoggedIn } = require("./middleware");
const LocalStrategy = require("passport-local");
const userRoutes = require("./routes/users");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/second-wife";

const MongoDBStore = require("connect-mongo")(session);

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Mongo Is Running");
  })
  .catch((err) => {
    console.log("Mongo Error");
  });

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const secret = process.env.SECRET || "thisshouldbeabettersecret!";

const store = new MongoDBStore({
  url: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", userRoutes);

app.get("/", isLoggedIn, async (req, res) => {
  const desert = await foods.find({ category: "desert" });
  const biryani = await foods.find({ category: "biryani" });
  const chinese = await foods.find({ category: "chinese" });
  const maggi = await foods.find({ category: "maggi" });
  const paneer = await foods.find({ category: "paneer" });
  const dosa = await foods.find({ category: "dosa" });
  const special = await foods.find({ category: "special" });
  const chicken = await foods.find({ category: "chicken" });
  const vegetable = await foods.find({ category: "vegetable" });
  const southIndian = await foods.find({ category: "south indian" });
  res.render("home", {
    biryani,
    paneer,
    chicken,
    vegetable,
    chinese,
    southIndian,
    desert,
    maggi,
    dosa,
    special,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/checkout", (req, res) => {
  res.render("checkout");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log("Server Started");
});
