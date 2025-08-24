const {
  Register,
  Login,
  SendOTP,
  VerifyOTP,
  GetAll,
  GetOne,
  Update,
  Delete,
} = require("../controllers/users.controllers");

const router = require("express").Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/sent-otp", SendOTP);
router.post("/verify-otp", VerifyOTP);
router.get("/", GetAll);
router.get("/:id", GetOne);
router.patch("/:id", Update);
router.delete("/:id", Delete);

module.exports = router;
