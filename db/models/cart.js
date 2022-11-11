

const client = require('../client')

async function createCart ({userId}) {
    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO carts("userId")
            VALUES ($1)
            RETURNING *
        `, [userId])
        return cart
    } catch (error) {
        console.log(error);
    }
}

async function getCartByUserId ({id}) {
    try {
        const { rows: [cart] } = await client.query(`
            SELECT * FROM carts
            WHERE "userId" = $1
        `, [id])
        console.log('cart :>> ', cart);
        return cart;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getCartByUserId,
    createCart
}