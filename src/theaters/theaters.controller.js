const service = require("./theaters.service.js");

async function list(req, res) {
  const data = await service.list();
  res.json({ data: data });
}

module.exports = {
  list,
};
