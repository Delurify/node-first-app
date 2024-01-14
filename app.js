const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const notFoundController = require("./controllers/not-found");

const app = express();

app.set("view engine", "ejs");

// Since we place the html in the 'views' folder, express can search for html files implicitly.
// But if we call the views as something else, we'll need to use the code below
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// The routes in admin.js will be /admin/add-product or something.
// The "/admin" will be automatically appended before looking through the routes
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);
app.use(notFoundController.notFound);

app.listen(3000);

/*
// only 'use' will have 'includes' type of matching
app.use("/", (req, res, next) => {
	console.log("In another middleware");

	// Default response header is text/html (set by expressJS)
	res.send("<h1>Hello from express</h1>");
});
*/
