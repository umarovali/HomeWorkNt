const router = require("express").Router();

const {
  createAdmin,
  getAdmin,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
} = require("../controllers/admin.controller");

router.post("/", createAdmin);
router.get("/", getAdmin);
router.get("/:id", getOneAdmin);
router.patch("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

module.exports = router;
