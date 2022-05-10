const knex = require("../db/connection");

async function readCritic(critic_id) { 
  return knex("critics")
    .select("*")
    .where({ critic_id })
    .first(); 
}

// create the nested critics array
async function setCritic(review) { 
  review.critic = await readCritic(review.critic_id); 
  //console.log('format of review',review)
  return review; 
}
  
function list(movieId) {
  
  if (movieId) {
    return knex("reviews")
      .select("*")
      .where({ movie_id: movieId }) 
      .then((reviews) => Promise.all(reviews.map(setCritic)));
  }
  else {
    return knex("reviews")
    .select("*")
  }
}

function update(reviewInfo) {
  
  // update the review and then set critic information
  return knex("reviews")
  .select("*")
  .where({review_id: reviewInfo.review_id})
  .update( reviewInfo, "*" )
  .then((reviews) => read(reviewInfo.review_id))
  .then(setCritic)
  
}

function read(reviewId) {
  return knex("reviews")
    .select("*")
    .where({ review_id: reviewId })
    .first();
}


function destroy(reviewId) {
  return knex("reviews")
  .select("*")
  .where({review_id: reviewId})
  .del()
}


module.exports = {
   list,
   read,
   update,
   delete: destroy,
    
 };