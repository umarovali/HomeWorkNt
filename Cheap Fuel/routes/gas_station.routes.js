const {
  createGasStation,
  getGasStations,
  getOneGasStation,
  updateGasStation,
  deleteGasStation,
  getSearch,
} = require("../controllers/gas_station.controller");

const router = require("express").Router();

router.post("/", createGasStation);
router.get("/", getGasStations);
router.get("/search/:name", getSearch);
router.get("/:id", getOneGasStation);
router.patch("/:id", updateGasStation);
router.delete("/:id", deleteGasStation);

module.exports = router;
