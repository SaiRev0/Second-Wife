const User = require("../models/user");
const sessionStorage = require("node-sessionstorage");

module.exports.renderRegister = (req, res) => {
  res.render("user/register");
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, phoneNumber, address, username, password } = req.body.User;
    const user = new User({ email, phoneNumber, address, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Lets have a treat!");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("user/login");
};

module.exports.login = async (req, res) => {
  let findUser = await User.find({ username: req.body.username });
  let curAddress = await findUser[0].address;
  sessionStorage.setItem("address", curAddress);
  req.flash("success", "Welcome Back!");
  const redirectUrl = req.session.returnTo || "/";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};
