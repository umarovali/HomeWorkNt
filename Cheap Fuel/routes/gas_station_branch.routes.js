
const {
  createGasStationBranch,
  getGasStationBranches,
  getOneGasStationBranch,
  updateGasStationBranch,
  deleteGasStationBranch,
  findByFilter,
} = require("../controllers/gas_station_branch.controller");

const router = require("express").Router();

router.post("/", createGasStationBranch);
router.get("/", getGasStationBranches);
router.get("/find", findByFilter);
router.get("/:id", getOneGasStationBranch);
router.patch("/:id", updateGasStationBranch);
router.delete("/:id", deleteGasStationBranch);

module.exports = router;
