
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

async function updatePastries({id, ...fields}){
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"= ${index + 1}`
  ).join(', ');

  const {row: [pastry]} = await client.query(`
    UPDATE pastries
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
  `, Object.values(fields));

    return pastry;
}

async function deletePastries({id}){
  try{
    const { rows: [pastries]} = await client.query(`
      DELETE FROM pastries
      WHERE id = $1
      RETURNING *
    `, [id]
  )
    return pastries;
  } catch (error){
    console.log("deleting patries failed")
  }
}

module.exports = {
    getAllPastries,
    createPastries,
    updatePastries,
    deletePastries
};
