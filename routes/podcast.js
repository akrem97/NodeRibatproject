const router = require("express").Router()
const podcastController = require("../controllers/podcastController");
router.post("/createpodcast",podcastController.createpodcast);
router.patch("/updatepodcast/:idpodcast",podcastController.updatepodcast);
router.delete("/delete/:idpodcast",podcastController.deletePodcast);
router.get("/getPodcastByType",podcastController.getPodcastsByType);
router.get("/getPodcast/:idpodcast",podcastController.getPodcast);
module.exports=router;