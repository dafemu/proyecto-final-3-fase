const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // res.render("login-error");
    res.render("login");
  }
};

export default auth;
