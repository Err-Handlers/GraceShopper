
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




module.exports = {
    getAllPastries,
    createPastries
};
