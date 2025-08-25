const router = require("express").Router();

const usersRouter = require("./users.routes");
const districtRouter = require("./district.routes");
const shopRouter = require("./shop.routes");
const toolRouter = require("./tools.routes");
const shopToolRouter = require("./shop_tools.routes");
const orderRouter = require("./order.routes");

router.use("/user", usersRouter);
router.use("/district", districtRouter);
router.use("/shop", shopRouter);
router.use("/tool", toolRouter);
router.use("/shop-tool", shopToolRouter);
router.use("/order", orderRouter);

module.exports = router;
