const router = require("express").Router()
const ActualiteController = require("../controllers/actualiteController");
const multer_image = require("../config/multer_image");

router.post("/create/:idadmin/:idcategory",multer_image.single('image'),ActualiteController.CreateActualite)
router.patch("/update/:idactualite/:adminid",multer_image.single('image'),ActualiteController.updateActualite);
router.delete("/delete/:idactualite",ActualiteController.deleteActualite);
router.get("/actualites",ActualiteController.getAllActualites);
router.get("/:idactualite",ActualiteController.getActualite);
router.get("/:idcategory/getAllActualitesByCategory",ActualiteController.getActualitesByCategory);



module.exports=router;