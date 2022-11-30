
const client = require('../client');

async function getAllPastries() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM pastries
    `)
    
    return rows
}

async function createPastry({name, description, isGlutenFree, isSweet, imageURL, inventory, priceInCents }) {
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

async function updatePastry({id, ...fields}){
  console.log("fields", fields)
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"= $${index + 1}`
  ).join(', ');

  console.log("dsdfdfsdfdsf", setString)
  const {rows: [pastry]} = await client.query(`
    UPDATE pastries
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
  `, Object.values(fields));

    return pastry;
}

async function deletePastry(id){
  try{
    const { rows: pastry} = await client.query(`
      DELETE FROM pastries
      WHERE id = $1
      RETURNING *;
    `, [id]
  )
    return pastry;
  } catch (error){
    console.log("deleting pastries failed")
  }
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
    getPastryById,
    createPastry,
    updatePastry,
    deletePastry,
};
