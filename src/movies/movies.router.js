const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");
const cors = require("cors")

router
  .route("/")
  .get(cors(), controller.list)
  .all(methodNotAllowed);

router
  .route("/:movieId")
  .get(cors(), controller.read)
  .all(methodNotAllowed);

router.use("/:movieId/reviews", reviewsRouter); 
router.use("/:movieId/theaters", theatersRouter);

module.exports = router;