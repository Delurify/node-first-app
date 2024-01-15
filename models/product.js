const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "products.json");
const getProductsFromFile = (callback) => {
	fs.readFile(p, (err, fileContent) => {
		if (err) return callback([]);

		callback(JSON.parse(fileContent));
	});
};

module.exports = class Product {
	constructor(id, title, imageUrl, description, price) {
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		getProductsFromFile((products) => {
			if (this.id) {
				const existingPoroductIndex = products.findIndex(
					(p) => p.id === this.id
				);
				const updatedProducts = [...products];
				updatedProducts[existingPoroductIndex] = this;
				fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
					if (err) console.log(`product.js-save: ${err}`);
				});
			} else {
				this.id = Math.floor(Math.random() * 10001).toString();
				products.push(this);
				fs.writeFile(p, JSON.stringify(products), (err) => {
					if (err) console.log(`product.js-save: ${err}`);
				});
			}
		});
	}

	delete(productId, callback) {
		getProductsFromFile((products) => {
			products.splice(productId, 1);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				if (err) {
					return console.log(`product.js - delete: ${err}`);
				}
			});
		});
	}

	static fetchAll(callback) {
		getProductsFromFile(callback);
	}

	static findById(productId, callback) {
		getProductsFromFile((products) => {
			const product = products.find((p) => p.id === productId);
			callback(product);
		});
	}
};
