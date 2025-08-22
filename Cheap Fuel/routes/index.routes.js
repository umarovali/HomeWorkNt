const router = require("express").Router();

const fuelTypeRouter = require("./fuel_types.routes");
const gasStationRouter = require("./gas_station.routes");
const gasStationBranchRouter = require("./gas_station_branch.routes");
const gasStationFuelTypeRouter = require("./gas_station_fuel_type.routes");

router.use("/fuel_types", fuelTypeRouter);
router.use("/gas_stations", gasStationRouter);
router.use("/branches", gasStationBranchRouter);
router.use("/station_fuel_types", gasStationFuelTypeRouter);

module.exports = router;
