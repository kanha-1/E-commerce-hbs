var User = require("../model/user");
var cart = require("../model/cart")
module.exports ={
    user: function (req, res) {
        var hide = false;
           if(!req.session.userId) hide =true;
        res.render("register",{hide:hide});
    },
    register:function (req, res) {
        // console.log(req.body)
        var uname = req.body.name;
        var uemail = req.body.email;
        var upass = req.body.pass;
        //user init
        var newUser = new User({
            name: uname,
            email: uemail,
            password: upass
        });
        //saving  user to DB
        newUser
            .save()
            .then(function (data) {
                res.redirect("/login");
            })
            .catch(function (err) {
                console.log(err.message);
            });
    },
    //log-in
    show:function (req, res) {
        var hide = false;
           if(!req.session.userId) hide =true;
        res.render("login",{hide:hide});
        
    },
    login:function (req, res) {
        //    console.log(req.body)
        var userObj = null;
        var usmail = req.body.email;
        var uspass = req.body.pass;
        var query = User.find({ email: usmail });
        query.exec(function (err, data) {
            if (err) return res.redirect(401, "/login");
    
            data.forEach(function (user) {
                if (user.password === uspass) {
                    id = user._id;
                    req.session.userId = id;
                    return res.redirect("/products");
                } else {
                    return res.redirect("/login");
                }
            });
        });
    },
    //logout
    logout:function (req, res) {
        req.session.destroy();
        return res.redirect("/login");
    },
    thanks:function (req,res) {
        var query = cart.deleteMany({})
        query.exec(function (err,data) {
            res.render('Thankyou')
        })
         
    }
}