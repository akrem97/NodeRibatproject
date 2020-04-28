const router = require("express").Router()
const commentController = require("../controllers/commentController");
router.get("/allComments",commentController.showComments);
router.get("/comments/:idactualite",commentController.showCommentsByActualite)
router.post("/createComment/:idactualite",commentController.createComment);
module.exports=router;