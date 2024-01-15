const Product = require("../models/product");
const Cart = require("../models/cart");

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

	getProduct: (req, res) => {
		const prodId = req.params.productId;
		console.log(
			Product.findById(prodId, (product) => {
				// shope/product-details is not link but file location
				res.render("shop/product-detail", {
					product: product,
					pageTitle: product.title,
					path: "/products",
				});
			})
		);
	},

	deleteProduct: (req, res) => {
		const product = new Product("dummy");
		product.delete(req.params.productId, (data) => {
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

	postCart: (req, res, next) => {
		const prodId = req.body.productId;
		Product.findById(prodId, (product) => {
			Cart.addProduct(prodId, product.price);
		});
		res.redirect("/cart");
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
