const router = require("express").Router();

const usersRouter = require("./users.routes");
const districtRouter = require("./district.routes");
const shopRouter = require("./shop.routes");

router.use("/user", usersRouter);
router.use("/district", districtRouter);
router.use("/shop", shopRouter);

module.exports = router;
