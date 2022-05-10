const knex = require("../db/connection");

async function readMovie(theater_id) { 
  return knex("movies_theaters as mt")
    .join("movies as m","mt.movie_id","m.movie_id")
    .select("*")
    .where({ theater_id })
}

// create the nested movies array
async function setMovie(theaters) { 
  theaters.movies = await readMovie(theaters.theater_id); 
  //console.log('format of theaters',theaters)
  return theaters; 
}
  
function list() {

    return knex("theaters")
      .select("*")
      .then((theaters) => Promise.all(theaters.map(setMovie)));
}
  
module.exports = {
   list,
 };