const Product = require("../models/product");

module.exports = {
	getAddProduct: (req, res, next) => {
		// Default response header is text/html (set by expressJS)
		// res.sendFile(path.join(rootDir, "views", "add-product.html"));

		res.render("admin/add-product", {
			pageTitle: "Add Product",
			path: "/admin/add-product",
		});
	},

	postAddProduct: (req, res, next) => {
		const title = req.body.title;
		const imageUrl = req.body.imgUrl;
		const price = req.body.price;
		const description = req.body.description;

		const product = new Product(title, imageUrl, description, price);
		product.save();
		res.redirect("/admin/add-product");
	},

	getProducts: (req, res, next) => {
		Product.fetchAll((products) => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
			});
		});
	},
};
