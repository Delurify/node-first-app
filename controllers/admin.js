const Product = require("../models/product");

module.exports = {
	getAddProduct: (req, res, next) => {
		// Default response header is text/html (set by expressJS)
		// res.sendFile(path.join(rootDir, "views", "add-product.html"));

		res.render("admin/edit-product", {
			pageTitle: "Add Product",
			path: "/admin/add-product",
			editing: false,
		});
	},

	postAddProduct: (req, res, next) => {
		const title = req.body.title;
		const imageUrl = req.body.imgUrl;
		const price = req.body.price;
		const description = req.body.description;

		const product = new Product(null, title, imageUrl, description, price);
		product.save();
		res.redirect("/admin/edit-product");
	},

	getEditProduct: (req, res, next) => {
		// Default response header is text/html (set by expressJS)
		const editMode = req.query.edit;
		if (!editMode) return res.redirect("/");

		const prodId = req.params.productId;
		Product.findById(prodId, (product) => {
			if (!product) {
				return res.redirect("/");
			}
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product: product,
			});
		});
	},

	postEditProduct: (req, res, next) => {
		console.log("here");
		const prodId = req.body.productId;
		const updatedTitle = req.body.title;
		const updatedPrice = req.body.price;
		const updatedImageUrl = req.body.imgUrl;
		const updatedDesc = req.body.description;
		const updatedProduct = new Product(
			prodId,
			updatedTitle,
			updatedImageUrl,
			updatedDesc,
			updatedPrice
		);
		updatedProduct.save();
		res.redirect("/admin/products");
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
