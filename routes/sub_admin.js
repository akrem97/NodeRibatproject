const router = require("express").Router();
const Sub_adminController = require("../controllers/sub_adminController");


router.post("/signup",Sub_adminController.create_SubAdmin);
router.patch("/update/:id_subadmin",Sub_adminController.updateInfo);
router.get("/sub_admins",Sub_adminController.getAll_sub_admins);
router.delete("/delete/:id_subadmin",Sub_adminController.deleteAdmin);
router.post("/login",Sub_adminController.login_subAdmin);
router.get("/:id_subadmin",Sub_adminController.getSub_Admin);









module.exports=router;