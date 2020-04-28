const router = require("express").Router();
const videoController = require("../controllers/videoController");
const multer_video = require("../config/multer_video");

router.get("/videos", videoController.getAll);
router.post("/create", multer_video.single("sequence"), videoController.create);
router.patch("/update/:idvideo", multer_video.single("sequence"), videoController.update);
router.delete("/delete/:idvideo", videoController.deleteVideo);
router.get(":idvideo", videoController.getVideo);



module.exports = router;