const {
  createFuelType,
  getFuelType,
  getOneFuelType,
  updateFuelType,
  deleteFuelType,
  findByName,
  search,
  searchMin
} = require("../controllers/fuel_types.controller");

const router = require("express").Router();

router.post("/", createFuelType);
router.get("/", getFuelType);
router.get("/find", findByName);
router.get("/search/:name", search);
router.get("/search_min/:name", searchMin);
router.get("/:id", getOneFuelType);
router.patch("/:id", updateFuelType);
router.delete("/:id", deleteFuelType);

module.exports = router;
