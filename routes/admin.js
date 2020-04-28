const router = require("express").Router()
const AdminController = require("../controllers/adminController");

router.post("/signup", AdminController.signup);
router.post("/login", AdminController.login);
router.post("/update/:id", AdminController.updateInfo);

module.exports = router;