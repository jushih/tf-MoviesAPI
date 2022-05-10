const service = require("./reviews.service.js");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await service.read(reviewId);

  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function list(req, res) {
  // req.params.movieId to GET what param is passed to /movies/:movieId/reviews
  const data = await service.list(req.params.movieId);

  res.json({ data: data });
}

async function update(req, res) {

  const reviewInfo = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  const data = await service.update(reviewInfo);

  res.json({ data });
}

async function destroy(req, res) {
  const data = await service.delete(res.locals.review.review_id);

  res.status(204).json({ data });
}

module.exports = {
  list,
  update: [reviewExists, update],
  delete: [reviewExists, destroy],
};
