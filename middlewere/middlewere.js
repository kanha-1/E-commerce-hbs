module.exports = {
    authenticate: function(req, res, next) {
      if (!req.session.userId) return res.redirect("/login");
      next();
    }
  };
  