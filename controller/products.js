var products = require("../model/products");
var cart = require("../model/cart");
module.exports = {
	productsdetails: function (req, res) {
		// res.render('productdetails')
		if (req.query.cart) {
			var id = req.query.id;
			products.find({ _id: id }).exec(function (err, data) {
				//  console.log(data)

				var cartdata = new cart({
					image: data[0].image,
					name: data[0].name,
					price: data[0].price,
					catagory: data[0].catagory,
					quantity: 1,
				});
				cartdata.save().then(function (cdata) {
					console.log(cdata);
				});
			});
			return res.redirect("/products");
		}
		var id = req.query.id;
		// console.log(id)
		var query = products.find({ _id: id });
		query.exec(function (err, pdata) {
			// console.log(pdata[0].catagory)
			var queryb = products.find({ catagory: pdata[0].catagory }).limit(4);
			queryb.exec(function (err, rdata) {
				// console.log(rdata)
				var hide = false;
				if (!req.session.userId) hide = true;
				res.render("productdetails", {
					pdata: pdata,
					rdata: rdata,
					hide: hide,
				});
			});
		});
	},
	getproducts: function (req, res) {
		var query = products.find();
		query.exec(function (err, data) {
			if (err) return console.log("unable to fetch products");
			var page = req.query.page;
			var pagearry = [];
			var pageCount = 0;
			var pageCountArr = [];
			if (!page) page = 1;
			for (i = (page - 1) * 12; i < page * 12 && i < data.length; i++) {
				pagearry.push(data[i]);
			}
			pageCount = Math.ceil(data.length / 12);
			for (i = 1; i <= pageCount; i++) {
				pageCountArr.push(i);
			}
			var hide = false;
			if (!req.session.userId) hide = true;
			res.render("products", {
				data: pagearry,
				pageCount: pageCountArr,
				hide: hide,
			});
		});
	},
	add: function (req, res) {
		// console.log(req.body)
		var pname = req.body.name;
		var pprice = req.body.price;
		var pcatagory = req.body.catagory;
		var image = "image";

		var newProducts = new products({
			image: image,
			name: pname,
			price: pprice,
			catagory: pcatagory,
		});
		newProducts.save().then(function (data) {
			console.log(data);
			// res.send('Product added successfully')
			res.redirect("/products");
		});
	},
	//Catagory Product
	mens: function (req, res) {
		var query = products.find({ catagory: "Male" });
		query.exec(function (err, data) {
			if (err) return console.log("unable to fetch products");
			var page = req.query.page;
			var pagearry = [];
			var pageCount = 0;
			var pageCountArr = [];
			if (!page) page = 1;
			for (i = (page - 1) * 12; i < page * 12 && i < data.length; i++) {
				pagearry.push(data[i]);
			}
			pageCount = Math.ceil(data.length / 12);
			for (i = 1; i <= pageCount; i++) {
				pageCountArr.push(i);
			}
			var hide = false;
			if (!req.session.userId) hide = true;
			res.render("mens", {
				data: pagearry,
				pageCount: pageCountArr,
				hide: hide,
			});
		});
	},
	womens: function (req, res) {
		var query = products.find({ catagory: "Female" });
		query.exec(function (err, data) {
			if (err) return console.log("unable to fetch products");
			var page = req.query.page;
			var pagearry = [];
			var pageCount = 0;
			var pageCountArr = [];
			if (!page) page = 1;
			for (i = (page - 1) * 12; i < page * 12 && i < data.length; i++) {
				pagearry.push(data[i]);
			}
			pageCount = Math.ceil(data.length / 12);
			for (i = 1; i <= pageCount; i++) {
				pageCountArr.push(i);
			}
			var hide = false;
			if (!req.session.userId) hide = true;
			res.render("womens", {
				data: pagearry,
				pageCount: pageCountArr,
				hide: hide,
			});
		});
	},
	kids: function (req, res) {
		var query = products.find({ catagory: "kids" });
		query.exec(function (err, data) {
			if (err) return console.log("unable to fetch products");
			var page = req.query.page;
			var pagearry = [];
			var pageCount = 0;
			var pageCountArr = [];
			if (!page) page = 1;
			for (i = (page - 1) * 12; i < page * 12 && i < data.length; i++) {
				pagearry.push(data[i]);
			}
			pageCount = Math.ceil(data.length / 12);
			for (i = 1; i <= pageCount; i++) {
				pageCountArr.push(i);
			}
			var hide = false;
			if (!req.session.userId) hide = true;
			res.render("kids", {
				data: pagearry,
				pageCount: pageCountArr,
				hide: hide,
			});
		});
	},
	cart: function (req, res) {
		var query = cart.find();
		query.exec(function (err, data) {
			// console.log(data)
			res.render("cart", {
				data: data,
			});
		});
	},
};
