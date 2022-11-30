
const client = require('../client');

async function getAllProducts() {
    /* this adapter should fetch a list of users from your db */
    const { rows } = await client.query(`
      SELECT * FROM products
    `)
    
    return rows
}

async function createProduct({name, description, imageURL, inventory, priceInCents }) {
    const { rows: [product] } = await client.query(`
      INSERT INTO products (name, description, "imageURL", inventory, "priceInCents")
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [name, description, imageURL, inventory, priceInCents])

    return product;
}


async function getProductById(id){
  console.log(id);
  try {
    const { rows: [product] } = await client.query(`
      SELECT * FROM products
      WHERE id = $1
    `, [id])
    return product;
  } catch (error) {
    console.log("product not found", error);
  }
}

async function getProductAndOrderProductById(orderId, productId){
  try {
    const { rows: [product] } = await client.query(`
      SELECT products.*, order_products.* FROM products
      JOIN order_products ON products.id = order_products."productId"
      WHERE order_products."orderId" = $1 AND order_products."productId" = $2
    `, [orderId, productId])
    return product;
  } catch (error) {
    console.log("product not found", error);
  }
}
async function updateProduct({id, ...fields}){
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"= $${index + 1}`
  ).join(', ');
  const {rows: [product]} = await client.query(`
    UPDATE products
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
  `, Object.values(fields));

    return product;
}

async function deleteProduct(id){
  try{
    const { rows: product} = await client.query(`
      DELETE FROM products
      WHERE id = $1
      RETURNING *;
    `, [id]
  )
    return product;
  } catch (error){
    console.log("deleting products failed")
  }
}



module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductAndOrderProductById
};
