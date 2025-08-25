const { Create, GetAll, GetOne, Update, Delete } = require("../controllers/order.controllers");

const router = require("express").Router();

router.post("/", Create);
router.get("/", GetAll);
router.get("/:id", GetOne);
router.patch("/:id", Update);
router.delete("/:id", Delete);

module.exports = router;
