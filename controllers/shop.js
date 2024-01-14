const Product = require("../models/product");

module.exports = {
	getProducts: (req, res) => {
		// Pass function as callback into the fetchAll parameter.
		// Will trigger the parameter function when finish execution
		Product.fetchAll((products) => {
			res.render("shop/product-list", {
				prods: products,
				pageTitle: "All Products",
				path: "/products",
			});
		});
	},

	deleteProduct: (req, res) => {
		const product = new Product("dummy");
		product.delete(Number(req.body.index), (data) => {
			res.redirect("/");
		});
	},

	getIndex: (req, res, next) => {
		Product.fetchAll((products) => {
			res.render("shop/index", {
				prods: products,
				pageTitle: "Shop",
				path: "/",
			});
		});
	},

	getCart: (req, res, next) => {
		res.render("shop/cart", {
			pageTitle: "Your Cart",
			path: "/cart",
		});
	},

	getOrders: (req, res, next) => {
		res.render("shop/orders", {
			pageTitle: "Your Orders",
			path: "/orders",
		});
	},

	getCheckout: (req, res, next) => {
		res.render("shop/checkout", {
			pageTitle: "Checkout",
			path: "/checkout",
		});
	},
};
