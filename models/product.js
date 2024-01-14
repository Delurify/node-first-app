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
	constructor(title, imageUrl, description, price) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	save() {
		getProductsFromFile((products) => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				if (err) console.log(err);
			});
		});
	}

	delete(index, callback) {
		getProductsFromFile((products) => {
			products.splice(index, 1);
			fs.writeFile(p, JSON.stringify(products), (err) => {
				if (err) {
					return console.log(err);
				}
				callback("done");
			});
		});
	}

	static fetchAll(callback) {
		getProductsFromFile(callback);
	}
};
