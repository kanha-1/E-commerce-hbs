var express = require("express");

require("./db");
var methodoverride = require("method-override");
var products = require("./model/products");
var User = require("./model/user");
var cart = require('./model/cart')
var hbs = require("hbs");
var path = require("path");
var session = require("express-session");
var app = express();
var middlewares = require("./middlewere/middlewere");
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
app.get("/register", function (req, res) {
    var hide = false;
       if(!req.session.userId) hide =true;
    res.render("register",{hide:hide});
});

app.post("/submit", function (req, res) {
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
            // consoconsole.log(data);
            res.redirect("/login");
        })
        .catch(function (err) {
            console.log(err.message);
        });
});

// Login

app.get("/login", function (req, res) {
    var hide = false;
       if(!req.session.userId) hide =true;
    res.render("login",{hide:hide});
    
 
});

app.post("/login", function (req, res) {
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
});
//Product details
app.post('/productdetails',function (req,res) {
    // res.render('productdetails')
    if(req.query.cart){
        var id= req.query.id;
        products.find({_id:id}).exec(function(err,data){
            //  console.log(data)

            var cartdata = new cart({
                image : data[0].image,
                name : data[0].name,
                price : data[0].price,
                catagory : data[0].catagory,
                quantity : 1
            })
            cartdata.save().then(function (cdata) {
                console.log(cdata)
            })
        })
        return res.redirect('/products')
    }
    var id = req.query.id
    // console.log(id)
    var query = products.find({_id:id});
    query.exec(function (err,pdata) {
        // console.log(pdata[0].catagory)
        var queryb = products.find({catagory:pdata[0].catagory}).limit(4)
        queryb.exec(function(err,rdata){
            // console.log(rdata)
            var hide = false;
       if(!req.session.userId) hide =true;
            res.render('productdetails',{
                pdata:pdata,
                rdata:rdata,
                hide:hide
            }) 
        })
        
    })
})

app.get('/cart',middlewares.authenticate,function (req,res) {
    var query = cart.find()
    query.exec(function (err,data) {
        // console.log(data)
       res.render('cart',{
           data:data
       }) 
    })
})

app.get('/Thankyou',middlewares.authenticate,function (req,res) {
    var query = cart.deleteMany({})
    query.exec(function (err,data) {
        res.render('Thankyou')
    })
     
})

app.get("/products", function (req, res) {
    var query = products.find();
    query.exec(function (err, data) {
        if (err) return console.log("unable to fetch products");
        var page = req.query.page;
        var pagearry = []
        var pageCount = 0
        var pageCountArr = []
        if(!page) page=1;
        for(i=(page-1)*12;i<(page*12)&&i<data.length;i++){
            pagearry.push(data[i]);  
        };
       pageCount = Math.ceil(data.length/12)
       for(i=1;i<=pageCount;i++){
           pageCountArr.push(i);
       } ;
       var hide = false;
       if(!req.session.userId) hide =true; 
         res.render("products",{
            data : pagearry,
            pageCount : pageCountArr,
            hide:hide
            })
    });
});


//men route
app.get("/mens", function (req, res) {
    var query = products.find({catagory:'Male'});
    query.exec(function (err, data) {
        if (err) return console.log("unable to fetch products");
        var page = req.query.page;
        var pagearry = []
        var pageCount = 0
        var pageCountArr = []
        if(!page) page=1;
        for(i=(page-1)*12;i<(page*12)&&i<data.length;i++){
            pagearry.push(data[i]);  
        };
       pageCount = Math.ceil(data.length/12)
       for(i=1;i<=pageCount;i++){
           pageCountArr.push(i);
       } ;
       var hide = false;
       if(!req.session.userId) hide =true;
         res.render("mens",{
            data : pagearry,
            pageCount : pageCountArr,
            hide:hide
            })
    });
});

//fem
app.get("/womens", function (req, res) {
    var query = products.find({catagory:'Female'});
    query.exec(function (err, data) {
        if (err) return console.log("unable to fetch products");
        var page = req.query.page;
        var pagearry = []
        var pageCount = 0
        var pageCountArr = []
        if(!page) page=1;
        for(i=(page-1)*12;i<(page*12)&&i<data.length;i++){
            pagearry.push(data[i]);  
        };
       pageCount = Math.ceil(data.length/12)
       for(i=1;i<=pageCount;i++){
           pageCountArr.push(i);
       } ;
       var hide = false;
       if(!req.session.userId) hide =true;
         res.render("womens",{
            data : pagearry,
            pageCount : pageCountArr,
            hide:hide
            })
    });
});

app.get("/kids", function (req, res) {
    var query = products.find({catagory:'kids'});
    query.exec(function (err, data) {
        if (err) return console.log("unable to fetch products");
        var page = req.query.page;
        var pagearry = []
        var pageCount = 0
        var pageCountArr = []
        if(!page) page=1;
        for(i=(page-1)*12;i<(page*12)&&i<data.length;i++){
            pagearry.push(data[i]);  
        };
       pageCount = Math.ceil(data.length/12)
       for(i=1;i<=pageCount;i++){
           pageCountArr.push(i);
       } ;
       var hide = false;
       if(!req.session.userId) hide =true;
         res.render("kids",{
            data : pagearry,
            pageCount : pageCountArr,
            hide:hide
            })
    });
});

//logout
app.delete("/logout", function (req, res) {
    req.session.destroy();
    return res.redirect("/login");
});

//Add products page
app.get("/addproducts", function (req, res) {
    res.render("addproducts");
});

app.post("/add", function (req, res) {
    // console.log(req.body)
    var pname = req.body.name;
    var pprice = req.body.price;
    var pcatagory = req.body.catagory;
    var image = "image";

    var newProducts = new products({
        image: image,
        name: pname,
        price: pprice,
        catagory: pcatagory
    });
    newProducts.save().then(function (data) {
        console.log(data);
        // res.send('Product added successfully')
        res.redirect("/products");
    });
});

app.get("/cart", function (req, res) {
    res.render("cart");
});

app.listen(2000, function () {
    console.log("Hey server is started");
});
