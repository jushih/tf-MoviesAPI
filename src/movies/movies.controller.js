const service = require("./movies.service.js");

async function movieExists(req, res, next) {
  const { movieId } = req.params;

  const movie = await service.read(movieId);

  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res) {
  const data = await service.list(req.query.is_showing);
  res.json({ data: data });
}

async function read(req, res) {
  res.json({ data: res.locals.movie });
}

module.exports = {
  list,
  read: [movieExists, read],
};
