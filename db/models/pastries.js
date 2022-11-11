
const client = require('../client');

async function getAllPastries() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM pastries
    `)
    return rows
}

async function createPastries({name, description, isGlutenFree, isSweet, imageURL, inventory, priceInCents }) {

    const { rows: [pastry] } = await client.query(`
      INSERT INTO pastries (name, description, "isGlutenFree", "isSweet", "imageURL", inventory, "priceInCents")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `, [name, description, isGlutenFree, isSweet, imageURL, inventory, priceInCents])
    return pastry;
}

async function getPastryById(id){
  console.log(id);
  try {
    const { rows: [pastry] } = await client.query(`
      SELECT * FROM pastries
      WHERE id = $1
    `, [id])
    console.log(pastry);
    return pastry;
  } catch (error) {
    console.log("pastry not found", error);
  }
}


module.exports = {
    getAllPastries,
    createPastries,
    getPastryById
};
