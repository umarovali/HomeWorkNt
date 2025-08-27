const {
  findShop_by_tool_name,
  findUsers_by_max_rent_price,
  findUsers_by_district_by_date_by_tool,
} = require("../controllers/search.controllers");

const router = require("express").Router();

router.post("/find-shop", findShop_by_tool_name);
router.post("/find-rent", findUsers_by_max_rent_price);
router.post("/find-date", findUsers_by_district_by_date_by_tool);

module.exports = router;
