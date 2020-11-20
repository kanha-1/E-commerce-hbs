var express = require("express");
require("dotenv").config();
require("./db");
var methodoverride = require("method-override");
var hbs = require("hbs");
var path = require("path");
var session = require("express-session");
var app = express();
var middlewares = require("./middlewere/middlewere");
//controller
var userscontrollers = require("./controller/user");
var productcontrollers = require("./controller/products")
//run
app.set("view engine", "hbs");
app.set("view options", { layout: "layout" });
hbs.registerPartials(path.join(__dirname, "views", "partials"));
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(methodoverride("nikloo"));
app.use(
    session({
        secret: "mynameisDOn",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 10 * 60,
            secure: false
        }
    })
);

app.get("/", function (req, res) {
    var hide = false;
       if(!req.session.userId) hide =true;
    res.render("index",{hide:hide});
});

//register
app.get("/register",userscontrollers.user);
app.post("/submit", userscontrollers.register);

// Login
app.get("/login", userscontrollers.show);
app.post("/login", userscontrollers.login);

//Product details
app.post("/add",productcontrollers.add );
app.post('/productdetails',productcontrollers.productsdetails)
app.get("/products", productcontrollers.getproducts);
app.get('/cart',middlewares.authenticate,productcontrollers.cart)
app.get('/Thankyou',middlewares.authenticate,userscontrollers.thanks)


//men route
app.get("/mens", productcontrollers.mens);
//female
app.get("/womens",productcontrollers.womens);
//Kids
app.get("/kids",productcontrollers.kids );

//logout
app.delete("/logout", userscontrollers.logout);

//Add products page
app.get("/addproducts", function (req, res) {
    res.render("addproducts");
});

app.get("/cart", function (req, res) {
    res.render("cart");
});
app.listen(2000, function () {
    console.log("Hey server is started");
});
