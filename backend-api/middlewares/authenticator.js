function authenticate(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    const error = new Error("Not Authenticated");
    error.status = 500;
    next(error);
  }
}

module.exports = authenticate;
