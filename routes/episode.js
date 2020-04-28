const router = require("express").Router()
const episodeController = require("../controllers/episodeController");
const multer_son=require("../config/multer_son");


router.post("/createEpisode/:idpodcast",multer_son.single("sequence"),episodeController.createEpisode);
router.post("/update/:idepisode",multer_son.single("sequence"),episodeController.updateEpisode);
router.get("/getEpsiode/:idpodcast",episodeController.getEpisodesbyPodcast);
router.delete("/deleteEpisode/:idepisode",episodeController.delete_episode);
router.get("/:idepisode",episodeController.getEpisode);


module.exports=router;