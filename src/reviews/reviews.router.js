const router = require("express").Router({ mergeParams: true });
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors")

router
  .route("/")
  .get(cors(), controller.list)
  .all(methodNotAllowed);

router
  .route("/:reviewId")
  .put(cors(), controller.update)
  .delete(cors(), controller.delete)
  .all(methodNotAllowed);

module.exports = router;