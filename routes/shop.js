const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

// get and post is using 'exact' matching type
router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.post("/products", shopController.deleteProduct);

router.get("/cart", shopController.getCart);

router.get("/orders", shopController.getOrders);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
