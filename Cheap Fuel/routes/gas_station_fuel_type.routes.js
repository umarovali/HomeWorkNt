const {
  createGasStationFuelType,
  getGasStationFuelTypes,
  getOneGasStationFuelType,
  updateGasStationFuelType,
  deleteGasStationFuelType,
} = require("../controllers/gas_station_fuel_type.controller");

const router = require("express").Router();

router.post("/", createGasStationFuelType);
router.get("/", getGasStationFuelTypes);
router.get("/:id", getOneGasStationFuelType);
router.patch("/:id", updateGasStationFuelType);
router.delete("/:id", deleteGasStationFuelType);

module.exports = router;
