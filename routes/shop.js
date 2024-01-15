const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

// get and post is using 'exact' matching type
router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct);

router.delete("/products/:productId", shopController.deleteProduct);

router.get("/product");

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
